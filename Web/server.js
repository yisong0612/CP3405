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


function clamp(n, min, max) {
  const v = Number(n);
  if (!Number.isFinite(v)) return min;
  return Math.min(max, Math.max(min, v));
}

function mean(arr) {
  const nums = (arr || []).filter((v) => Number.isFinite(v));
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function sampleStd(arr) {
  const nums = (arr || []).filter((v) => Number.isFinite(v));
  if (nums.length < 2) return 0;
  const m = mean(nums);
  const variance = nums.reduce((acc, v) => acc + (v - m) * (v - m), 0) / (nums.length - 1);
  return Math.sqrt(Math.max(variance, 0));
}

function pctChange(base, latest) {
  const b = Number(base);
  const l = Number(latest);
  if (!Number.isFinite(b) || !Number.isFinite(l) || b === 0) return 0;
  return ((l - b) / b) * 100;
}

function movingAverage(values, n) {
  const nums = (values || []).filter((v) => Number.isFinite(v));
  const out = [];
  for (let i = 0; i < nums.length; i++) {
    if (i + 1 < n) continue;
    const window = nums.slice(i - n + 1, i + 1);
    out.push(mean(window));
  }
  return out;
}

function slopeLast(values, k = 5) {
  const nums = (values || []).filter((v) => Number.isFinite(v)).slice(-k);
  if (nums.length < 2) return 0;
  const x = nums.map((_, i) => i);
  const xm = mean(x);
  const ym = mean(nums);
  let num = 0;
  let den = 0;
  for (let i = 0; i < nums.length; i++) {
    num += (x[i] - xm) * (nums[i] - ym);
    den += (x[i] - xm) * (x[i] - xm);
  }
  return den ? num / den : 0;
}

function buildHistorySummary(series) {
  const points = Array.isArray(series) ? series : [];
  const closes = points.map((p) => Number(p.close)).filter((v) => Number.isFinite(v));
  if (!closes.length) {
    throw new Error("History series is empty");
  }

  return {
    startPrice: Number(closes[0].toFixed(2)),
    endPrice: Number(closes[closes.length - 1].toFixed(2)),
    averagePrice: Number(mean(closes).toFixed(2)),
    highestPrice: Number(Math.max(...closes).toFixed(2)),
    lowestPrice: Number(Math.min(...closes).toFixed(2)),
    priceChangePct: Number(pctChange(closes[0], closes[closes.length - 1]).toFixed(2)),
    totalDataDays: closes.length,
  };
}

function buildRecentSample(series, limit = 10) {
  return (series || []).slice(-limit).map((p) => ({
    date: String(p.t || "").slice(0, 10),
    close: Number(Number(p.close || 0).toFixed(2)),
  }));
}

function buildForecastFromHistory(closes, forecastDays, summary) {
  const prices = (closes || []).filter((v) => Number.isFinite(v));
  if (prices.length < 10) {
    return {
      method: "rule-based web adaptation",
      analysis: "Insufficient historical data, so the trend is not stable enough for a stronger view.",
      forecast: `Expected to move sideways over the next ${forecastDays} days because the sample size is limited.`,
      confidence: "Low",
      keyFactors: [
        "Limited data sample",
        "Short price history",
        "Volatility uncertainty",
      ],
    };
  }

  const returns = [];
  for (let i = 1; i < prices.length; i++) {
    if (prices[i - 1] !== 0) returns.push(prices[i] / prices[i - 1] - 1);
  }

  const vol = sampleStd(returns);
  const shortMa = movingAverage(prices, 5);
  const longMa = movingAverage(prices, 20);
  const sSlope = slopeLast(shortMa, 6);
  const lSlope = slopeLast(longMa, 6);

  let score = 0;
  score += sSlope > 0 ? 1 : sSlope < 0 ? -1 : 0;
  score += lSlope > 0 ? 0.7 : lSlope < 0 ? -0.7 : 0;

  const pct = Number(summary.priceChangePct || 0);
  score += pct > 0 ? 0.3 : pct < 0 ? -0.3 : 0;

  const highVol = vol >= 0.02;
  const direction = score >= 1 ? "Bullish" : score <= -1 ? "Bearish" : "Sideways";

  let confidence = "Medium";
  if (direction === "Sideways" && highVol) confidence = "Medium";
  else if (Math.abs(score) >= 1.7 && !highVol) confidence = "Medium";
  else if (Math.abs(score) >= 1.7 && highVol) confidence = "Medium";
  else confidence = highVol ? "Low" : "Medium";

  const analysis = `Short-term MA slope is ${sSlope > 0 ? "upward" : sSlope < 0 ? "downward" : "flat"}, medium-term MA slope is ${lSlope > 0 ? "upward" : lSlope < 0 ? "downward" : "flat"}; daily volatility is about ${(vol * 100).toFixed(2)}%.`;
  const forecast = `Expected to be ${direction} over the next ${forecastDays} days because MA slope and range price change signals are ${score >= 0 ? "mostly supportive" : "mostly weak"}, ${highVol ? "but volatility remains high" : "and volatility is relatively controlled"}.`;

  return {
    method: "rule-based web adaptation",
    analysis,
    forecast,
    confidence,
    keyFactors: [
      "MA trends (5/20 day)",
      "Range price change",
      "Return volatility",
      "Market sentiment",
      "Macroeconomic events",
    ].slice(0, 5),
  };
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



app.get("/api/forecast", async (req, res) => {
  const ticker = cleanTicker(req.query.t);
  const range = String(req.query.range || "1M").toUpperCase();
  const forecastDays = clamp(Number(req.query.days || 7), 1, 60);

  if (!ticker) {
    return errJson(res, 400, "Missing ticker. Use /api/forecast?t=AAPL&range=1M&days=7");
  }

  try {
    const hist = await getHistoryUnified(ticker, range);
    const closes = (hist.series || []).map((p) => Number(p.close)).filter((v) => Number.isFinite(v));
    const summary = buildHistorySummary(hist.series || []);
    const forecast = buildForecastFromHistory(closes, forecastDays, summary);

    okJson(res, {
      ticker,
      range,
      forecastDays,
      generatedAt: nowISO(),
      status: "ok",
      source: "Integrated from second project",
      dateRange: `${String(hist.series?.[0]?.t || "").slice(0, 10)} to ${String(hist.series?.[hist.series.length - 1]?.t || "").slice(0, 10)}`,
      historicalSummary: summary,
      recentSample: buildRecentSample(hist.series || [], 10),
      ...forecast,
    });
  } catch (e) {
    errJson(res, 502, "Failed to generate forecast", {
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
  console.log(`Forecast: http://localhost:${PORT}/api/forecast?t=AAPL&range=1M&days=7`);

  if (!FINNHUB_API_KEY) {
    console.log("NOTE: FINNHUB_API_KEY not set. Using Yahoo fallback (best-effort).");
  }
});