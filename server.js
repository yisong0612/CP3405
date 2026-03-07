// ============================
// server.js — AI Stock Risk UI (CommonJS / require)
// ============================

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// serve static files in current folder
app.use(express.static(path.join(__dirname)));

// render / railway / other hosts need process.env.PORT
const PORT = Number(process.env.PORT || 5173);
const HOST = "0.0.0.0";

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY || "";

// small cache
const cache = new Map();

function cacheGet(key) {
  const hit = cache.get(key);
  if (!hit) return null;
  if (Date.now() > hit.exp) {
    cache.delete(key);
    return null;
  }
  return hit.data;
}

function cacheSet(key, data, ttlMs) {
  cache.set(key, { exp: Date.now() + ttlMs, data });
}

function cleanTicker(t) {
  return String(t || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9.\-]/g, "");
}

function nowISO() {
  return new Date().toISOString();
}

function okJson(res, obj) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).send(JSON.stringify(obj));
}

function errJson(res, code, message, extra = {}) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(code).send(JSON.stringify({ error: message, ...extra }));
}

function rangeToDays(range) {
  if (range === "1M") return 30;
  if (range === "3M") return 90;
  if (range === "6M") return 180;
  if (range === "1Y") return 365;
  return 365 * 3;
}

function rangeToYahoo(range) {
  if (range === "1M") return { range: "1mo", interval: "1d" };
  if (range === "3M") return { range: "3mo", interval: "1d" };
  if (range === "6M") return { range: "6mo", interval: "1d" };
  if (range === "1Y") return { range: "1y", interval: "1d" };
  return { range: "3y", interval: "1d" };
}

// Node 18+ has fetch
if (typeof fetch !== "function") {
  console.error("ERROR: Node.js 18+ is required (global fetch not found).");
  process.exit(1);
}

// ---- Finnhub ----
async function finnhubHistory(ticker, range) {
  const days = rangeToDays(range);
  const to = Math.floor(Date.now() / 1000);
  const from = to - days * 24 * 3600;

  const url = `https://finnhub.io/api/v1/stock/candle?symbol=${encodeURIComponent(
    ticker
  )}&resolution=D&from=${from}&to=${to}&token=${encodeURIComponent(
    FINNHUB_API_KEY
  )}`;

  const r = await fetch(url);
  if (!r.ok) throw new Error(`Finnhub history HTTP ${r.status}`);

  const j = await r.json();
  if (!j || j.s !== "ok" || !Array.isArray(j.c) || j.c.length < 2) {
    throw new Error("Finnhub history empty");
  }

  const series = j.c.map((close, i) => ({
    t: new Date((j.t?.[i] || 0) * 1000).toISOString(),
    close,
  }));

  return {
    ticker,
    provider: "finnhub",
    range,
    points: series.length,
    series,
    ts: nowISO(),
  };
}

// ---- Yahoo fallback ----
async function yahooChart(ticker, range) {
  const { range: r, interval } = rangeToYahoo(range);

  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
    ticker
  )}?range=${encodeURIComponent(r)}&interval=${encodeURIComponent(interval)}`;

  const resp = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (AIStockRiskDemo/1.0)",
      Accept: "application/json",
    },
  });

  if (!resp.ok) throw new Error(`Yahoo chart HTTP ${resp.status}`);

  const j = await resp.json();
  const result = j?.chart?.result?.[0];
  const meta = result?.meta;
  const closes =
    result?.indicators?.quote?.[0]?.close ||
    result?.indicators?.adjclose?.[0]?.adjclose;
  const timestamps = result?.timestamp;

  if (!meta || !Array.isArray(closes) || closes.length < 2) {
    throw new Error("Yahoo chart empty");
  }

  const series = [];
  for (let i = 0; i < closes.length; i++) {
    const c = closes[i];
    const t = timestamps?.[i];
    if (typeof c === "number" && typeof t === "number") {
      series.push({
        t: new Date(t * 1000).toISOString(),
        close: c,
      });
    }
  }

  if (series.length < 2) throw new Error("Yahoo series too short");

  return {
    ticker,
    provider: "yahoo",
    range,
    points: series.length,
    series,
    ts: nowISO(),
  };
}

// ---- Unified history ----
async function getHistoryUnified(ticker, range) {
  const r = ["1M", "3M", "6M", "1Y", "3Y"].includes(range) ? range : "1M";
  const key = `hist:${ticker}:${r}:${FINNHUB_API_KEY ? "finnhub" : "auto"}`;
  const cached = cacheGet(key);
  if (cached) return cached;

  let data = null;
  let lastErr = null;

  if (FINNHUB_API_KEY) {
    try {
      data = await finnhubHistory(ticker, r);
    } catch (e) {
      lastErr = e;
    }
  }

  if (!data) {
    try {
      data = await yahooChart(ticker, r);
    } catch (e) {
      lastErr = e;
    }
  }

  if (!data) throw lastErr || new Error("No provider");

  cacheSet(key, data, 60_000);
  return data;
}

// ---- Routes ----
app.get("/api/health", (req, res) => {
  okJson(res, {
    ok: true,
    ts: nowISO(),
    finnhubConfigured: Boolean(FINNHUB_API_KEY),
  });
});

app.get("/api/history", async (req, res) => {
  const ticker = cleanTicker(req.query.t);
  const range = String(req.query.range || "1M").toUpperCase();

  if (!ticker) {
    return errJson(
      res,
      400,
      "Missing ticker. Use /api/history?t=AAPL&range=1M"
    );
  }

  try {
    const h = await getHistoryUnified(ticker, range);
    okJson(res, h);
  } catch (e) {
    errJson(res, 502, "Failed to fetch history", {
      detail: String(e?.message || e),
    });
  }
});

// SPA fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, HOST, () => {
  console.log(`AI Stock Risk UI running on ${HOST}:${PORT}`);
  console.log(`Local:  http://localhost:${PORT}`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
  console.log(`Hist:   http://localhost:${PORT}/api/history?t=AAPL&range=1M`);

  if (!FINNHUB_API_KEY) {
    console.log("NOTE: FINNHUB_API_KEY not set. Using Yahoo fallback (best-effort).");
  }
});