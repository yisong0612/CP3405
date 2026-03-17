// =====================
// AI Stock Risk UI Demo
// app.js (FULL VERSION)
// =====================

// ----- In-memory stock data -----
const STOCKS = {
  AAPL: { ticker: "AAPL", name: "Apple Inc.", level: "HIGH", score: 78, conf: 82, d7: +6 },
  TSLA: { ticker: "TSLA", name: "Tesla, Inc.", level: "MEDIUM", score: 62, conf: 69, d7: -3 },
  NVDA: { ticker: "NVDA", name: "NVIDIA Corp.", level: "HIGH", score: 85, conf: 79, d7: +9 },
  AMZN: { ticker: "AMZN", name: "Amazon.com, Inc.", level: "LOW", score: 34, conf: 74, d7: +1 },
};

let selectedTicker = "AAPL";
let watchlist = ["AAPL", "TSLA", "NVDA", "AMZN"];
let compareList = ["AAPL", "TSLA"];

// ----- S2 right panel demo data (NO BLANKS) -----
const S2_RIGHT = {
  AAPL: {
    breakdown: { market: 28, drawdown: 26, vol: 22, liq: 24 },
    metrics: { vol20: 22, vol60: 19, mdd6m: -12, beta: 1.08, volChg: "↑" },
    rules: { high: 12, medLo: 6, medHi: 12, low: 6 },
  },
  TSLA: {
    breakdown: { market: 34, drawdown: 30, vol: 26, liq: 10 },
    metrics: { vol20: 58, vol60: 47, mdd6m: -24, beta: 1.85, volChg: "↓" },
    rules: { high: 12, medLo: 6, medHi: 12, low: 6 },
  },
  NVDA: {
    breakdown: { market: 35, drawdown: 30, vol: 25, liq: 10 },
    metrics: { vol20: 48, vol60: 39, mdd6m: -28, beta: 1.62, volChg: "↑" },
    rules: { high: 12, medLo: 6, medHi: 12, low: 6 },
  },
  AMZN: {
    breakdown: { market: 22, drawdown: 18, vol: 20, liq: 40 },
    metrics: { vol20: 18, vol60: 16, mdd6m: -9, beta: 0.96, volChg: "↑" },
    rules: { high: 12, medLo: 6, medHi: 12, low: 6 },
  },
};

// ----- Helpers -----
function levelToBadgeClass(level) {
  if (level === "HIGH") return "high";
  if (level === "MEDIUM") return "medium";
  return "low";
}
function levelToTextEN(level) {
  if (level === "HIGH") return "High";
  if (level === "MEDIUM") return "Medium";
  return "Low";
}
function fmt7d(n) {
  return `${n >= 0 ? "+" : ""}${n}`;
}
function ensureUnique(arr) {
  return [...new Set(arr)];
}
function pct(n) {
  return `${Math.round(n)}%`;
}

// ----- Fill S2 right panel (no blanks) -----
function fillS2RightPanel(ticker) {
  const d = S2_RIGHT[ticker] || S2_RIGHT.AAPL;

  // Breakdown
  const rbMarket = document.getElementById("rbMarket");
  const rbDrawdown = document.getElementById("rbDrawdown");
  const rbVol = document.getElementById("rbVol");
  const rbLiq = document.getElementById("rbLiq");

  if (rbMarket) rbMarket.textContent = pct(d.breakdown.market);
  if (rbDrawdown) rbDrawdown.textContent = pct(d.breakdown.drawdown);
  if (rbVol) rbVol.textContent = pct(d.breakdown.vol);
  if (rbLiq) rbLiq.textContent = pct(d.breakdown.liq);

  // Metrics
  const mVol20 = document.getElementById("mVol20");
  const mVol60 = document.getElementById("mVol60");
  const mMDD6m = document.getElementById("mMDD6m");
  const mBeta = document.getElementById("mBeta");
  const mVolChg = document.getElementById("mVolChg");

  if (mVol20) mVol20.textContent = pct(d.metrics.vol20);
  if (mVol60) mVol60.textContent = pct(d.metrics.vol60);
  if (mMDD6m) mMDD6m.textContent = `${d.metrics.mdd6m}%`; // keep negative sign
  if (mBeta) mBeta.textContent = String(d.metrics.beta);
  if (mVolChg) mVolChg.textContent = d.metrics.volChg;

  // Rules
  const rHigh = document.getElementById("rHigh");
  const rMedLo = document.getElementById("rMedLo");
  const rMedHi = document.getElementById("rMedHi");
  const rLow = document.getElementById("rLow");

  if (rHigh) rHigh.textContent = `${d.rules.high}%`;
  if (rMedLo) rMedLo.textContent = `${d.rules.medLo}%`;
  if (rMedHi) rMedHi.textContent = `${d.rules.medHi}%`;
  if (rLow) rLow.textContent = `${d.rules.low}%`;
}

// ----- Core UI update -----
function setSelected(ticker) {
  if (!STOCKS[ticker]) return;
  selectedTicker = ticker;

  const s = STOCKS[ticker];

  // S1 KPIs
  const kpiLevel = document.getElementById("kpiLevel");
  if (kpiLevel) {
    kpiLevel.className = `kpi-value badge ${levelToBadgeClass(s.level)}`;
    kpiLevel.textContent = levelToTextEN(s.level);
  }

  const kpiScore = document.getElementById("kpiScore");
  if (kpiScore) kpiScore.textContent = String(s.score);

  const kpiConf = document.getElementById("kpiConf");
  if (kpiConf) kpiConf.textContent = `${s.conf}%`;

  const s1Selected = document.getElementById("s1Selected");
  if (s1Selected) s1Selected.textContent = `${s.ticker} — ${s.name}`;

  const s1Badge = document.getElementById("s1Badge");
  if (s1Badge) {
    s1Badge.className = `badge ${levelToBadgeClass(s.level)}`;
    s1Badge.textContent = levelToTextEN(s.level);
  }

  // explanation
  const explain =
    s.level === "HIGH"
      ? "Volatility is rising and drawdown is widening, so risk is upgraded."
      : s.level === "MEDIUM"
      ? "Risk is moderate with mixed signals in volatility and drawdown."
      : "Risk is lower with more stable price movement recently.";

  const s1Explain = document.getElementById("s1Explain");
  if (s1Explain) s1Explain.textContent = explain;

  // S2 header + output
  const s2HeaderStock = document.getElementById("s2HeaderStock");
  if (s2HeaderStock) s2HeaderStock.textContent = `${s.ticker} — ${s.name}`;

  const s2Level = document.getElementById("s2Level");
  if (s2Level) {
    s2Level.className = `v badge ${levelToBadgeClass(s.level)}`;
    s2Level.textContent = levelToTextEN(s.level);
  }

  const s2Score = document.getElementById("s2Score");
  if (s2Score) s2Score.textContent = String(s.score);

  const s2Conf = document.getElementById("s2Conf");
  if (s2Conf) s2Conf.textContent = `${s.conf}%`;

  const meaning =
    s.level === "HIGH"
      ? "This stock shows higher downside risk in the next period."
      : s.level === "MEDIUM"
      ? "This stock shows moderate risk with mixed short-term signals."
      : "This stock shows lower risk based on recent stability.";

  const s2Meaning = document.getElementById("s2Meaning");
  if (s2Meaning) s2Meaning.textContent = meaning;

  // Fill right side numbers (NO BLANKS)
  fillS2RightPanel(ticker);
}

// ----- Navigation -----
function switchView(viewName) {
  document.querySelectorAll(".tab").forEach((t) => {
    t.classList.toggle("active", t.dataset.view === viewName);
  });

  document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
  const el = document.getElementById(`view-${viewName}`);
  if (el) el.classList.add("active");

  if (viewName === "watchlist") renderWatchlist();
  if (viewName === "compare") renderCompare();
  if (viewName === "reports") initReportsDropdown();
}

// ----- Watchlist -----
function renderWatchlist() {
  const grid = document.getElementById("watchlistGrid");
  if (!grid) return;

  const q = (document.getElementById("wlSearch")?.value || "").trim().toLowerCase();
  const risk = document.getElementById("wlRiskSelect")?.value || "ALL";

  const items = watchlist
    .map((t) => STOCKS[t])
    .filter(Boolean)
    .filter((s) => {
      const hit = `${s.ticker} ${s.name}`.toLowerCase().includes(q);
      const riskOk = risk === "ALL" || risk === s.level;
      return hit && riskOk;
    });

  grid.innerHTML = "";

  items.forEach((s) => {
    const card = document.createElement("div");
    card.className = "wcard";

    card.innerHTML = `
      <div class="w-top">
        <div>
          <div class="w-name">${s.ticker}</div>
          <div class="w-sub">${s.name}</div>
        </div>
        <div class="badge ${levelToBadgeClass(s.level)}">${levelToTextEN(s.level)}</div>
      </div>

      <div class="w-mid">
        <div><span class="muted">Score:</span> <b>${s.score}</b></div>
        <div><span class="muted">7D:</span> <b>${fmt7d(s.d7)}</b></div>
      </div>

      <div class="w-actions">
        <button class="btn primary" data-action="details" data-ticker="${s.ticker}">View Details</button>
        <button class="btn" data-action="remove" data-ticker="${s.ticker}">Remove</button>
      </div>
    `;

    grid.appendChild(card);
  });

  grid.querySelectorAll("button[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      const ticker = btn.dataset.ticker;

      if (action === "details") {
        setSelected(ticker);
        switchView("detail");
      }
      if (action === "remove") {
        watchlist = watchlist.filter((t) => t !== ticker);
        renderWatchlist();
      }
    });
  });
}

// ----- Compare -----
function renderCompare() {
  const box = document.getElementById("compareTable");
  if (!box) return;

  compareList = ensureUnique(compareList).filter((t) => STOCKS[t]);

  if (compareList.length === 0) {
    box.innerHTML = `<div class="muted">No stocks selected.</div>`;
    return;
  }

  const rows = compareList
    .map((t) => {
      const s = STOCKS[t];
      return `
        <div class="trow">
          <div class="cell"><b>${s.ticker}</b><div class="muted">${s.name}</div></div>
          <div class="cell"><span class="badge ${levelToBadgeClass(s.level)}">${levelToTextEN(s.level)}</span></div>
          <div class="cell">Score: <b>${s.score}</b></div>
          <div class="cell">Conf: <b>${s.conf}%</b></div>
          <div class="cell">7D: <b>${fmt7d(s.d7)}</b></div>
          <div class="cell"><button class="btn primary cmpDetails" data-ticker="${s.ticker}">View Details</button></div>
        </div>
      `;
    })
    .join("");

  box.innerHTML = `
    <div class="thead">
      <div class="cell">Stock</div>
      <div class="cell">Risk</div>
      <div class="cell">Score</div>
      <div class="cell">Confidence</div>
      <div class="cell">7D</div>
      <div class="cell">Action</div>
    </div>
    ${rows}
  `;

  box.querySelectorAll(".cmpDetails").forEach((btn) => {
    btn.addEventListener("click", () => {
      const ticker = btn.dataset.ticker;
      setSelected(ticker);
      switchView("detail");
    });
  });
}

// ----- Reports -----
function initReportsDropdown() {
  const sel = document.getElementById("repTicker");
  if (!sel) return;

  sel.innerHTML = Object.keys(STOCKS)
    .map((t) => `<option value="${t}">${t} — ${STOCKS[t].name}</option>`)
    .join("");

  sel.value = selectedTicker || "AAPL";
}

function buildReportPreview(ticker) {
  const s = STOCKS[ticker];
  const ck = (id) => document.getElementById(id)?.checked;

  const parts = [];

  if (ck("repCkSummary")) {
    parts.push(`<div class="pblock"><b>1) Executive summary</b><ul>
      <li>Risk Level: ${levelToTextEN(s.level)}</li>
      <li>Risk Score: ${s.score} / 100</li>
      <li>Confidence: ${s.conf}%</li>
    </ul></div>`);
  }

  if (ck("repCkDrivers")) {
    parts.push(`<div class="pblock"><b>2) Drivers (Top 6)</b>
      <div class="muted">Volatility / Drawdown / Down days / Beta / Liquidity / Sentiment</div>
    </div>`);
  }

  if (ck("repCkMetrics")) {
    parts.push(`<div class="pblock"><b>3) Metrics & Rules</b>
      <div class="muted">20D vol, 60D vol, 6M MDD, Beta, Volume change + label thresholds</div>
    </div>`);
  }

  if (ck("repCkCharts")) {
    parts.push(`<div class="pblock"><b>4) Charts</b>
      <div class="muted">Price / Rolling Volatility / Rolling Drawdown (placeholders)</div>
    </div>`);
  }

  if (ck("repCkDisclaimer")) {
    parts.push(`<div class="pblock"><b>5) Disclaimer</b>
      <div class="muted">For educational use only. Not financial advice.</div>
    </div>`);
  }

  return `
    <div class="pblock"><b>Report for:</b> ${s.ticker} — ${s.name}</div>
    ${parts.join("")}
  `;
}

// ----- Bind events AFTER DOM is ready -----
window.addEventListener("DOMContentLoaded", () => {
  // Tabs
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      switchView(tab.dataset.view);
    });
  });

  // S1 search
  document.getElementById("s1SearchBtn")?.addEventListener("click", () => {
    const q = (document.getElementById("s1Search")?.value || "").trim().toUpperCase();
    if (STOCKS[q]) setSelected(q);
  });
  document.getElementById("s1Search")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") document.getElementById("s1SearchBtn")?.click();
  });

  // S1 buttons
  document.getElementById("btnViewDetails")?.addEventListener("click", () => {
    switchView("detail");
  });
  document.getElementById("btnReport")?.addEventListener("click", () => {
    switchView("reports");
    initReportsDropdown();
  });

  // S2 buttons
  document.getElementById("btnBackToS1")?.addEventListener("click", () => {
    switchView("dashboard");
  });
  document.getElementById("btnAddToWatchlist")?.addEventListener("click", () => {
    if (!watchlist.includes(selectedTicker)) watchlist.unshift(selectedTicker);
    switchView("watchlist");
  });

  // Watchlist filters
  document.getElementById("wlSearch")?.addEventListener("input", renderWatchlist);
  document.getElementById("wlRiskSelect")?.addEventListener("change", renderWatchlist);
  document.getElementById("wlFilterBtn")?.addEventListener("click", () => {
    const sel = document.getElementById("wlRiskSelect");
    if (!sel) return;
    const order = ["ALL", "HIGH", "MEDIUM", "LOW"];
    sel.value = order[(order.indexOf(sel.value) + 1) % order.length];
    renderWatchlist();
  });

  // Compare actions
  document.getElementById("cmpAddBtn")?.addEventListener("click", () => {
    const v = (document.getElementById("cmpInput")?.value || "").trim().toUpperCase();
    if (v && STOCKS[v]) {
      compareList.push(v);
      document.getElementById("cmpInput").value = "";
      renderCompare();
    }
  });
  document.getElementById("cmpGenBtn")?.addEventListener("click", renderCompare);

  // Reports actions
  document.getElementById("repGenBtn")?.addEventListener("click", () => {
    const ticker = document.getElementById("repTicker")?.value || "AAPL";
    const preview = document.getElementById("reportPreview");
    if (preview) preview.innerHTML = buildReportPreview(ticker);
  });
  document.getElementById("repExportBtn")?.addEventListener("click", () => {
    alert("Prototype: Export PDF is a placeholder in this UI demo.");
  });

  // Settings actions
  document.getElementById("setSaveBtn")?.addEventListener("click", () => {
    alert("Settings saved (prototype).");
  });
  document.getElementById("setRefreshBtn")?.addEventListener("click", () => {
    const el = document.getElementById("setSync");
    if (el) el.textContent = new Date().toLocaleString();
    alert("Data refreshed (prototype).");
  });

  // Init
  setSelected(selectedTicker);
  renderWatchlist();
});