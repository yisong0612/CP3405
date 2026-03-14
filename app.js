// =====================
// AI Stock Risk UI Demo
// app.js
// =====================

const I18N = {
  en: {
    app_title: "AI Stock Risk",
    app_sub: "UI Prototype (S1 / S2 / Watchlist)",
    tab_dashboard: "Dashboard",
    tab_watchlist: "Watchlist",
    tab_compare: "Compare",
    tab_reports: "Reports",
    tab_settings: "Settings",

    s1_title: "S1 — Stock Risk Dashboard",
    s1_placeholder: "Enter ticker (e.g., AAPL, MSFT, 300750.SZ, 600519.SS)",
    btn_predict: "Predict Risk",
    kpi_level: "Risk Level",
    kpi_score: "Risk Score (0–100)",
    kpi_conf: "Confidence (%)",
    kpi_update: "Last Update",
    s1_summary: "Risk Summary",
    s1_selected: "Selected stock",
    s1_7d: "7D change:",
    btn_view_details: "View Details",
    btn_generate_report: "Generate Report",
    s1_chart_title: "Risk Score Trend",
    chart_note: "The line updates with prediction and selected time range.",
    range_label: "Range:",

    s2_title: "S2 — Risk Score & Drivers",
    btn_back: "Back",
    btn_add_watchlist: "Add to Watchlist",
    time_range: "Time range:",
    s2_output: "Risk Output",
    kpi_score_short: "Risk Score",
    kpi_conf_short: "Confidence",
    s2_7d: "7D change",
    s2_drivers: "Key Drivers",
    s2_driver_hint: "These drivers explain why the label changes.",
    s2_breakdown_rules: "Breakdown & Rules",
    s2_breakdown: "Risk Breakdown",
    bd_market: "Market",
    bd_drawdown: "Drawdown",
    bd_vol: "Volatility",
    bd_liq: "Liquidity",
    s2_metrics: "Key Metrics",
    metric_volchg: "Volume change",
    s2_rules: "Risk Label Rules",
    rule_high: "High",
    rule_medium: "Medium",
    rule_low: "Low",
    rule_high_text: "forward 30D drawdown",
    s2_chart_title: "Risk Score Trend",

    wl_title: "Watchlist & Risk Monitoring",
    wl_placeholder: "Search ticker/company",
    btn_filter_risk: "Filter by Risk",
    opt_all: "All",
    opt_high: "High",
    opt_medium: "Medium",
    opt_low: "Low",
    flow: "Flow:",
    wl_flow_note: "S2 → Add to Watchlist → Watchlist → View Details → S2",
    btn_remove: "Remove",

    cmp_title: "Compare",
    cmp_placeholder: "Add ticker (e.g., AAPL, 300750.SZ)",
    btn_add_stock: "Add Stock",
    btn_gen_compare: "Generate Comparison",
    cmp_table: "Comparison Table",
    cmp_note: "Click View Details to open S2.",
    cmp_chart: "Charts",
    cmp_chart_note: "Ranking and trend update automatically.",
    cmp_rank_title: "Risk score ranking",
    cmp_trend_title: "Risk trend",
    axis_time: "Time",
    axis_risk_score: "Risk Score",

    rep_title: "Reports",
    btn_gen_report: "Generate Report",
    btn_export_pdf: "Export PDF",
    rep_include: "Include sections",
    rep_summary: "Risk summary",
    rep_drivers: "Drivers (Top 6)",
    rep_metrics: "Metrics & Rules",
    rep_charts: "Charts",
    rep_disclaimer: "Disclaimer",
    rep_note: "Select sections, generate the report, then click Export PDF to open your browser's Save as PDF dialog.",
    rep_preview: "Report Preview",
    rep_preview_hint: "Click Generate Report to preview.",
    rep_exec: "Executive summary",
    rep_rec: "Suggested action",
    rep_report_for: "Report for:",
    rep_notes: "Report Notes",
    rep_quick: "Quick Summary",
    rep_layout: "Layout Purpose",
    rep_layout_text: "This layout fills the right side and makes the page look more complete and system-like.",
    rep_chart_caption: "Price trend & forecast chart",

    set_title: "Settings",
    btn_save: "Save Changes",
    set_display: "Display",
    set_theme: "Theme",
    theme_dark: "Dark",
    theme_light: "Light",
    set_lang: "Language",
    set_lang_note: "Switch language instantly for UI text.",
    set_alerts: "Alerts",
    alerts_enable: "Enable alerts",
    alerts_score: "Notify if Risk Score >",
    alerts_high: "Notify if Risk Level = High",
    alerts_note: "Used for watchlist filtering and monitoring.",
    set_data: "Data & Update",
    set_source: "Data source",
    source_price: "Price only",
    source_news: "Price + News (optional)",
    set_freq: "Update frequency",
    freq_daily: "Daily",
    freq_weekly: "Weekly",
    set_sync: "Last sync",
    btn_refresh: "Refresh Data",

    level_high: "High",
    level_medium: "Medium",
    level_low: "Low",
    latest: "Latest:",
    start: "Start",
    end: "End",
    middle: "Middle"
  },

  zh: {
    app_title: "AI股票风险",
    app_sub: "UI原型（S1 / S2 / 观察列表）",
    tab_dashboard: "仪表盘",
    tab_watchlist: "观察名单",
    tab_compare: "比较",
    tab_reports: "报告",
    tab_settings: "背景设定",

    s1_title: "S1 — 风险总览仪表盘",
    s1_placeholder: "输入股票代码（例如：AAPL、MSFT、300750.SZ、600519.SS）",
    btn_predict: "AI预测",
    kpi_level: "风险等级",
    kpi_score: "风险评分（0–100）",
    kpi_conf: "置信度（%）",
    kpi_update: "更新时间",
    s1_summary: "风险摘要",
    s1_selected: "当前股票",
    s1_7d: "7天变化：",
    btn_view_details: "查看详情",
    btn_generate_report: "生成报告",
    s1_chart_title: "风险评分趋势",
    chart_note: "折线会随预测结果和选择的时间范围实时变化。",
    range_label: "范围：",

    s2_title: "S2 — 风险解释（评分与驱动因素）",
    btn_back: "返回",
    btn_add_watchlist: "加入观察",
    time_range: "时间范围：",
    s2_output: "风险输出",
    kpi_score_short: "风险评分",
    kpi_conf_short: "置信度",
    s2_7d: "7天变化",
    s2_drivers: "主要原因（Drivers）",
    s2_driver_hint: "这些原因用于解释风险标签为什么变化。",
    s2_breakdown_rules: "拆解与规则",
    s2_breakdown: "风险拆解",
    bd_market: "市场",
    bd_drawdown: "回撤",
    bd_vol: "波动",
    bd_liq: "流动性",
    s2_metrics: "关键指标",
    metric_volchg: "成交量变化",
    s2_rules: "风险等级规则",
    rule_high: "高",
    rule_medium: "中",
    rule_low: "低",
    rule_high_text: "未来30天回撤",
    s2_chart_title: "风险评分趋势",

    wl_title: "观察列表 & 风险监控",
    wl_placeholder: "搜索 股票代码/公司名",
    btn_filter_risk: "按风险筛选",
    opt_all: "全部",
    opt_high: "高",
    opt_medium: "中",
    opt_low: "低",
    flow: "流程：",
    wl_flow_note: "S2 → 加入观察 → 观察名单 → 查看详情 → S2",
    btn_remove: "移除",

    cmp_title: "比较",
    cmp_placeholder: "添加股票代码（例如：AAPL、300750.SZ）",
    btn_add_stock: "添加",
    btn_gen_compare: "生成对比",
    cmp_table: "对比表",
    cmp_note: "点击“查看详情”打开 S2。",
    cmp_chart: "图表",
    cmp_chart_note: "排名和趋势会自动更新。",
    cmp_rank_title: "风险评分排名",
    cmp_trend_title: "风险趋势",
    axis_time: "时间",
    axis_risk_score: "风险评分",

    rep_title: "报告",
    btn_gen_report: "生成报告",
    btn_export_pdf: "导出PDF",
    rep_include: "包含部分",
    rep_summary: "风险总结",
    rep_drivers: "驱动因素（前六项）",
    rep_metrics: "指标与规则",
    rep_charts: "图表",
    rep_disclaimer: "免责声明",
    rep_note: "先勾选部分并生成报告，再点导出PDF，会打开浏览器的另存为 PDF 对话框。",
    rep_preview: "报告预览",
    rep_preview_hint: "点击“生成报告”以预览。",
    rep_exec: "执行摘要",
    rep_rec: "建议操作",
    rep_report_for: "报告对象：",
    rep_notes: "报告说明",
    rep_quick: "快速摘要",
    rep_layout: "布局目的",
    rep_layout_text: "这样可以让右侧不再留白，同时让报告界面更完整、更像正式系统。",
    rep_chart_caption: "价格趋势与预测图",

    set_title: "背景设定",
    btn_save: "保存更改",
    set_display: "展示",
    set_theme: "主题",
    theme_dark: "黑暗",
    theme_light: "明亮",
    set_lang: "语言",
    set_lang_note: "点击即可切换界面语言。",
    set_alerts: "提醒",
    alerts_enable: "启用提醒",
    alerts_score: "当风险评分 >",
    alerts_high: "当风险等级 = 高时提醒",
    alerts_note: "用于观察列表的筛选与监控。",
    set_data: "数据与更新",
    set_source: "数据来源",
    source_price: "仅价格",
    source_news: "价格 + 新闻（可选）",
    set_freq: "更新频率",
    freq_daily: "每日",
    freq_weekly: "每周",
    set_sync: "最后同步",
    btn_refresh: "刷新数据",

    level_high: "高",
    level_medium: "中",
    level_low: "低",
    latest: "最新：",
    start: "开始",
    end: "结束",
    middle: "中间"
  }
};


Object.assign(I18N.en, {
  fc_title: "AI Forecast",
  fc_days: "Forecast Days",
  fc_generate: "Generate Forecast",
  fc_export: "Export CSV",
  fc_hint: "Forecast combines the second file's trend summary, direction, confidence, and key factors.",
  fc_analysis: "Trend Analysis",
  fc_outlook: "Forecast Outlook",
  fc_conf: "Confidence",
  fc_method: "Method",
  fc_factors: "Key Factors",
  fc_hist_title: "Historical Summary",
  fc_loading: "Generating forecast...",
  fc_error: "Forecast failed. Please try another ticker.",
  fc_export_done: "Forecast CSV downloaded.",
  fc_export_empty: "Generate a forecast first.",
  fc_summary_start: "Start Price",
  fc_summary_end: "End Price",
  fc_summary_avg: "Average Price",
  fc_summary_high: "Highest Price",
  fc_summary_low: "Lowest Price",
  fc_summary_change: "Price Change",
  fc_summary_days: "Total Data Days",
  fc_conf_high: "High",
  fc_conf_medium: "Medium",
  fc_conf_low: "Low",
  rep_status: "Status Snapshot",
  rep_signal: "Signal Snapshot",
  rep_data_mode_status: "Data mode",
  rep_freq_status: "Update frequency",
  rep_alerts_status: "Alerts",
  rep_alert_state: "Alert state",
  rep_sync_status: "Last sync",
  rep_threshold_status: "Alert threshold",
  rep_sections_status: "Included sections",
  rep_on: "On",
  rep_off: "Off",
  rep_triggered: "Triggered",
  rep_clear: "Clear",
  rep_signal_price: "Price-only mode keeps the explanation focused on chart trend, volatility, drawdown, and volume behavior.",
  rep_signal_news: "News mode adds a lightweight sentiment layer on top of price behavior.",
  rep_headline_1: "Short-term flow stayed selective around the ticker.",
  rep_headline_2: "Traders are watching volume confirmation before adding exposure.",
  rep_headline_3: "Recent discussion stayed focused on near-term catalysts and risk control.",
  rep_sent_pos: "Supportive",
  rep_sent_neu: "Neutral",
  rep_sent_neg: "Cautious",
  set_status_ready: "Current mode: {mode} · Refresh: {freq} · Alerts: {alerts}",
  set_status_saved: "Settings now affect reports, dashboard text, watchlist alerts, and auto-refresh speed."
});

Object.assign(I18N.zh, {
  fc_title: "AI 预测",
  fc_days: "预测天数",
  fc_generate: "生成预测",
  fc_export: "导出 CSV",
  fc_hint: "这里整合了第二个文件的趋势总结、方向判断、置信度和关键因素。",
  fc_analysis: "趋势分析",
  fc_outlook: "预测结果",
  fc_conf: "置信度",
  fc_method: "方法",
  fc_factors: "关键因素",
  fc_hist_title: "历史摘要",
  fc_loading: "正在生成预测...",
  fc_error: "预测失败，请尝试其他股票代码。",
  fc_export_done: "预测 CSV 已下载。",
  fc_export_empty: "请先生成预测。",
  fc_summary_start: "起始价格",
  fc_summary_end: "结束价格",
  fc_summary_avg: "平均价格",
  fc_summary_high: "最高价格",
  fc_summary_low: "最低价格",
  fc_summary_change: "价格变动",
  fc_summary_days: "数据天数",
  fc_conf_high: "高",
  fc_conf_medium: "中",
  fc_conf_low: "低",
  rep_status: "状态摘要",
  rep_signal: "信号摘要",
  rep_data_mode_status: "数据模式",
  rep_freq_status: "更新频率",
  rep_alerts_status: "提醒状态",
  rep_alert_state: "触发情况",
  rep_sync_status: "最后同步",
  rep_threshold_status: "提醒阈值",
  rep_sections_status: "已包含部分",
  rep_on: "开启",
  rep_off: "关闭",
  rep_triggered: "已触发",
  rep_clear: "正常",
  rep_signal_price: "仅价格模式会把解释集中在价格走势、波动、回撤和成交量行为上。",
  rep_signal_news: "新闻模式会在价格行为之外，再加入一个轻量情绪判断层。",
  rep_headline_1: "短线资金对该股票仍然偏选择性参与。",
  rep_headline_2: "交易者更关注成交量是否继续配合当前走势。",
  rep_headline_3: "近期讨论重点仍集中在短期催化与风险控制。",
  rep_sent_pos: "偏正面",
  rep_sent_neu: "中性",
  rep_sent_neg: "偏谨慎",
  set_status_ready: "当前模式：{mode} · 刷新：{freq} · 提醒：{alerts}",
  set_status_saved: "这些设置现在会影响报告右侧内容、首页摘要、观察名单提醒和自动刷新速度。"
});

let currentLang = "en";
let currentRange = "1M";
let autoRefreshTimer = null;
let searchPreviewTimer = null;
let selectedTicker = "AAPL";
let currentForecastDays = 7;
let lastForecastResult = null;
let lastFetchedHistoryMeta = null;
const FORCE_LOCAL_DEMO_HISTORY = true;
let watchlist = [];
let compareList = [];
const DEFAULT_UI_SETTINGS = {
  theme: "dark",
  lang: "en",
  alertsOn: true,
  scoreTh: 70,
  highOn: true,
  dataSource: "price",
  updateFreq: "daily"
};
const DEFAULT_WATCHLIST = [];
const DEFAULT_COMPARE_LIST = [];
let uiSettings = { ...DEFAULT_UI_SETTINGS };

const STOCKS = {
  AAPL: { ticker: "AAPL", name: "Apple Inc.", level: "LOW", score: 35, conf: 76, d7: -7 },
  TSLA: { ticker: "TSLA", name: "Tesla, Inc.", level: "MEDIUM", score: 62, conf: 69, d7: -3 },
  NVDA: { ticker: "NVDA", name: "NVIDIA Corp.", level: "HIGH", score: 85, conf: 79, d7: 9 },
  AMZN: { ticker: "AMZN", name: "Amazon.com, Inc.", level: "LOW", score: 34, conf: 74, d7: 1 },
  MSFT: { ticker: "MSFT", name: "Microsoft Corp.", level: "LOW", score: 34, conf: 78, d7: 2 },
  META: { ticker: "META", name: "Meta Platforms", level: "MEDIUM", score: 48, conf: 74, d7: 1 },
  GOOGL: { ticker: "GOOGL", name: "Alphabet Inc.", level: "LOW", score: 33, conf: 77, d7: 1 },

  "300750.SZ": { ticker: "300750.SZ", name: "CATL", level: "LOW", score: 35, conf: 76, d7: -7 },
  "002594.SZ": { ticker: "002594.SZ", name: "BYD", level: "LOW", score: 35, conf: 76, d7: -7 },
  "000001.SZ": { ticker: "000001.SZ", name: "Ping An Bank", level: "LOW", score: 35, conf: 76, d7: -7 },
  "600519.SS": { ticker: "600519.SS", name: "Kweichow Moutai", level: "LOW", score: 35, conf: 76, d7: -7 },
  "601318.SS": { ticker: "601318.SS", name: "Ping An Insurance", level: "LOW", score: 35, conf: 76, d7: -7 },
  "600036.SS": { ticker: "600036.SS", name: "China Merchants Bank", level: "LOW", score: 35, conf: 76, d7: -7 }
};

function tickerBaseName(ticker) {
  return String(ticker || "").trim().toUpperCase().replace(/[.\-].*$/, "");
}

function getTickerProfile(ticker) {
  const clean = String(ticker || "DEMO").trim().toUpperCase() || "DEMO";
  const seed = hashTickerSeed(`profile:${clean}`);
  const suffix = clean.includes('.SZ') || clean.includes('.SS') ? 'CN' : 'US';
  const baseMap = {
    AAPL: 180,
    MSFT: 420,
    NVDA: 920,
    TSLA: 210,
    AMZN: 175,
    META: 485,
    GOOGL: 170,
    DEMO: 120,
  };
  const baseKey = tickerBaseName(clean);
  const basePrice = baseMap[baseKey] || (suffix === 'CN' ? 95 + (seed % 180) : 70 + (seed % 260));
  const trendTilt = (((seed >> 4) % 200) - 100) / 100;
  const volTilt = 0.007 + (((seed >> 9) % 11) / 1000);
  const curvePhase = (seed % 360) * Math.PI / 180;
  const sectorWave = 0.004 + (((seed >> 14) % 10) / 1500);
  return { clean, seed, suffix, basePrice, trendTilt, volTilt, curvePhase, sectorWave };
}

function getRangeConfig(range) {
  if (range === '1M') return { points: 26, dayStep: 1, trendScale: 0.55, noiseScale: 1.05, cycle1: 6, cycle2: 11, shockScale: 0.014 };
  if (range === '3M') return { points: 46, dayStep: 2, trendScale: 0.85, noiseScale: 0.95, cycle1: 10, cycle2: 18, shockScale: 0.017 };
  if (range === '6M') return { points: 68, dayStep: 3, trendScale: 1.05, noiseScale: 0.9, cycle1: 14, cycle2: 22, shockScale: 0.02 };
  if (range === '1Y') return { points: 96, dayStep: 4, trendScale: 1.2, noiseScale: 0.84, cycle1: 16, cycle2: 28, shockScale: 0.024 };
  return { points: 132, dayStep: 8, trendScale: 1.45, noiseScale: 0.78, cycle1: 20, cycle2: 36, shockScale: 0.028 };
}

function buildShockMap(points, seed, scale) {
  const shockMap = new Map();
  const shockCount = 2 + (seed % 2);
  for (let i = 0; i < shockCount; i++) {
    const pos = Math.max(3, Math.min(points - 4, Math.floor(((seed >> (i * 3 + 2)) % (points - 6)) + 3)));
    const sign = ((seed >> (i * 5 + 1)) & 1) ? 1 : -1;
    const amp = scale * (0.7 + (((seed >> (i * 7 + 4)) % 7) / 10));
    shockMap.set(pos, (shockMap.get(pos) || 0) + sign * amp);
  }
  return shockMap;
}

function buildPreviewTickerLabel(ticker, range) {
  const up = String(ticker || selectedTicker || 'AAPL').toUpperCase();
  if (currentLang === 'zh') return `${up} 历史走势 + 预测（${range}）`;
  return `${up} history + forecast (${range})`;
}

function t(key) {
  return I18N[currentLang][key] || key;
}

function clamp(n, min, max) {
  const v = Number(n);
  if (!Number.isFinite(v)) return min;
  return Math.min(max, Math.max(min, v));
}

function avg(arr) {
  const nums = (arr || []).filter(v => Number.isFinite(v));
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function pctChange(base, latest) {
  const b = Number(base);
  const l = Number(latest);
  if (!Number.isFinite(b) || !Number.isFinite(l) || b === 0) return 0;
  return ((l - b) / b) * 100;
}

function varianceSample(arr) {
  const nums = (arr || []).filter(v => Number.isFinite(v));
  if (nums.length < 2) return 0;
  const mean = avg(nums);
  return nums.reduce((acc, v) => acc + (v - mean) * (v - mean), 0) / (nums.length - 1);
}

function sampleStd(arr) {
  return Math.sqrt(Math.max(varianceSample(arr), 0));
}

function annualizedVolPct(returns) {
  const nums = (returns || []).filter(v => Number.isFinite(v));
  if (nums.length < 2) return 0;
  return Math.sqrt(Math.max(varianceSample(nums), 0)) * Math.sqrt(252) * 100;
}

function calcMaxDrawdownPct(closes) {
  const nums = (closes || []).filter(v => Number.isFinite(v));
  if (!nums.length) return 0;

  let peak = nums[0];
  let mdd = 0;

  for (const p of nums) {
    if (p > peak) peak = p;
    const dd = ((p / peak) - 1) * 100;
    if (dd < mdd) mdd = dd;
  }

  return Number(mdd.toFixed(1));
}

function normalizeBreakdown(raw) {
  const data = {
    market: Math.max(1, Number(raw.market) || 1),
    drawdown: Math.max(1, Number(raw.drawdown) || 1),
    vol: Math.max(1, Number(raw.vol) || 1),
    liq: Math.max(1, Number(raw.liq) || 1)
  };

  const total = data.market + data.drawdown + data.vol + data.liq;
  const out = {
    market: Math.round((data.market / total) * 100),
    drawdown: Math.round((data.drawdown / total) * 100),
    vol: Math.round((data.vol / total) * 100),
    liq: Math.round((data.liq / total) * 100)
  };

  const sum = out.market + out.drawdown + out.vol + out.liq;
  if (sum !== 100) {
    const keys = Object.keys(out).sort((a, b) => out[b] - out[a]);
    out[keys[0]] += (100 - sum);
  }
  return out;
}

function ensureUnique(arr) {
  return [...new Set(arr)];
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function fmtDateShort(iso) {
  if (!iso) return "";
  return String(iso).slice(0, 10);
}

function fmt7d(n) {
  return `${n >= 0 ? "+" : ""}${n}`;
}

function fmtSignedPct(n, digits = 1) {
  const v = Number(n) || 0;
  return `${v >= 0 ? "+" : ""}${v.toFixed(digits)}%`;
}

function safeText(v, fallback = "-") {
  if (v === null || v === undefined || v === "") return fallback;
  return String(v);
}

function levelToBadgeClass(level) {
  if (level === "HIGH") return "high";
  if (level === "MEDIUM") return "medium";
  return "low";
}

function levelToText(level) {
  return level === "HIGH"
    ? t("level_high")
    : level === "MEDIUM"
    ? t("level_medium")
    : t("level_low");
}

function deriveLevelFromScore(score) {
  return score >= 70 ? "HIGH" : score >= 40 ? "MEDIUM" : "LOW";
}

function setNumColor(el, n) {
  if (!el) return;
  el.classList.remove("pos", "neg", "neu");
  if (n > 0) el.classList.add("pos");
  else if (n < 0) el.classList.add("neg");
  else el.classList.add("neu");
}

function applyTheme(theme) {
  document.body.classList.remove("light-theme", "dark-theme");
  document.body.classList.add(theme === "light" ? "light-theme" : "dark-theme");
  localStorage.setItem("theme", theme);
}

function loadUISettings() {
  try {
    const raw = JSON.parse(localStorage.getItem("uiSettings") || "null");
    if (raw && typeof raw === "object") {
      return {
        ...DEFAULT_UI_SETTINGS,
        ...raw,
        alertsOn: raw.alertsOn !== false,
        highOn: raw.highOn !== false,
        scoreTh: clamp(Number(raw.scoreTh ?? DEFAULT_UI_SETTINGS.scoreTh), 1, 100)
      };
    }
  } catch (e) {
    console.warn("Failed to load uiSettings:", e);
  }
  return { ...DEFAULT_UI_SETTINGS };
}

function persistUISettings() {
  localStorage.setItem("uiSettings", JSON.stringify(uiSettings));
}

function loadArrayStorage(key, fallback) {
  try {
    const raw = JSON.parse(localStorage.getItem(key) || "null");
    if (Array.isArray(raw)) {
      return ensureUnique(raw.map(v => String(v || "").trim().toUpperCase()).filter(Boolean));
    }
  } catch (e) {
    console.warn(`Failed to load ${key}:`, e);
  }
  return [...fallback];
}

function persistArrayStorage(key, list) {
  localStorage.setItem(key, JSON.stringify(ensureUnique((list || []).map(v => String(v || "").trim().toUpperCase()).filter(Boolean))));
}

const LEGACY_DEFAULT_WATCHLIST = ["AAPL", "300750.SZ", "600519.SS", "TSLA", "NVDA"];
const LEGACY_DEFAULT_COMPARE_LIST = ["AAPL", "300750.SZ", "600519.SS"];

function resetLegacyListIfNeeded(key, legacy) {
  try {
    const raw = JSON.parse(localStorage.getItem(key) || "null");
    if (
      Array.isArray(raw) &&
      raw.length === legacy.length &&
      raw.every((v, i) => String(v || "").trim().toUpperCase() === legacy[i])
    ) {
      localStorage.setItem(key, JSON.stringify([]));
    }
  } catch (e) {
    console.warn(`Failed to reset legacy ${key}:`, e);
  }
}

function removeLegacyDefaultCollections() {
  resetLegacyListIfNeeded("watchlist", LEGACY_DEFAULT_WATCHLIST);
  resetLegacyListIfNeeded("compareList", LEGACY_DEFAULT_COMPARE_LIST);
}

function ensureStockEntry(ticker) {
  const cleanTicker = String(ticker || "").trim().toUpperCase();
  if (!cleanTicker) return null;
  if (STOCKS[cleanTicker]) return STOCKS[cleanTicker];

  const profile = getTickerProfile(cleanTicker);
  const seededScore = clamp(Math.round(18 + ((profile.seed >> 3) % 68)), 8, 92);
  const seededD7 = Number((((((profile.seed >> 7) % 140) - 70) / 10)).toFixed(1));
  const seededConf = clamp(Math.round(62 + ((profile.seed >> 11) % 24)), 58, 92);
  const seededLevel = deriveLevelFromScore(seededScore);

  STOCKS[cleanTicker] = {
    ticker: cleanTicker,
    name: cleanTicker,
    level: seededLevel,
    score: seededScore,
    conf: seededConf,
    d7: seededD7,
  };

  return STOCKS[cleanTicker];
}

function loadAppState() {
  try {
    const raw = JSON.parse(localStorage.getItem("appState") || "null");
    if (raw && typeof raw === "object") {
      return {
        selectedTicker: String(raw.selectedTicker || selectedTicker || "AAPL").trim().toUpperCase() || "AAPL",
        currentRange: ["1M","3M","6M","1Y","3Y"].includes(raw.currentRange) ? raw.currentRange : currentRange,
        currentForecastDays: clamp(Number(raw.currentForecastDays || currentForecastDays || 7), 1, 60)
      };
    }
  } catch (e) {
    console.warn("Failed to load appState:", e);
  }
  return {
    selectedTicker: selectedTicker || "AAPL",
    currentRange,
    currentForecastDays
  };
}

function persistAppState() {
  localStorage.setItem("appState", JSON.stringify({
    selectedTicker,
    currentRange,
    currentForecastDays
  }));
}

function persistCollections() {
  persistArrayStorage("watchlist", watchlist);
  persistArrayStorage("compareList", compareList);
  persistAppState();
}

function collectUISettingsFromDom() {
  return {
    theme: document.getElementById("setTheme")?.value || uiSettings.theme,
    lang: document.getElementById("setLang")?.value || uiSettings.lang,
    alertsOn: !!document.getElementById("setAlertsOn")?.checked,
    scoreTh: clamp(Number(document.getElementById("setScoreTh")?.value || uiSettings.scoreTh), 1, 100),
    highOn: !!document.getElementById("setHighOn")?.checked,
    dataSource: document.getElementById("setData")?.value || uiSettings.dataSource,
    updateFreq: document.getElementById("setFreq")?.value || uiSettings.updateFreq,
  };
}

function syncSettingsForm() {
  const theme = document.getElementById("setTheme");
  if (theme) theme.value = uiSettings.theme;
  const lang = document.getElementById("setLang");
  if (lang) lang.value = uiSettings.lang;
  const alertsOn = document.getElementById("setAlertsOn");
  if (alertsOn) alertsOn.checked = !!uiSettings.alertsOn;
  const scoreTh = document.getElementById("setScoreTh");
  if (scoreTh) scoreTh.value = String(uiSettings.scoreTh);
  const highOn = document.getElementById("setHighOn");
  if (highOn) highOn.checked = !!uiSettings.highOn;
  const data = document.getElementById("setData");
  if (data) data.value = uiSettings.dataSource;
  const freq = document.getElementById("setFreq");
  if (freq) freq.value = uiSettings.updateFreq;
}

function getDataSourceLabel() {
  return uiSettings.dataSource === "price_news" ? t("source_news") : t("source_price");
}

function getUpdateFrequencyLabel() {
  return uiSettings.updateFreq === "weekly" ? t("freq_weekly") : t("freq_daily");
}

function getAutoRefreshMs() {
  return uiSettings.updateFreq === "weekly" ? 30000 : 12000;
}

function getIncludedReportSections() {
  const list = [];
  if (document.getElementById("repCkSummary")?.checked) list.push(t("rep_summary"));
  if (document.getElementById("repCkDrivers")?.checked) list.push(t("rep_drivers"));
  if (document.getElementById("repCkMetrics")?.checked) list.push(t("rep_metrics"));
  if (document.getElementById("repCkCharts")?.checked) list.push(t("rep_charts"));
  if (document.getElementById("repCkDisclaimer")?.checked) list.push(t("rep_disclaimer"));
  return list;
}

function getAlertStateForPrediction(pred) {
  const enabled = !!uiSettings.alertsOn;
  const highHit = !!uiSettings.highOn && String(pred?.level || "") === "HIGH";
  const scoreHit = Number(pred?.score || 0) >= Number(uiSettings.scoreTh || 70);
  const triggered = enabled && (highHit || scoreHit);
  let reason = currentLang === "zh" ? "未触发" : "No alert";
  if (triggered) {
    reason = highHit
      ? (currentLang === "zh" ? "达到高风险等级" : "Risk level reached High")
      : (currentLang === "zh" ? `评分达到阈值 ${uiSettings.scoreTh}` : `Risk score reached ${uiSettings.scoreTh}`);
  }
  return { enabled, triggered, reason };
}

function buildNewsInsightPack(ticker, pred) {
  const seed = hashTickerSeed(`news:${ticker}:${currentRange}:${uiSettings.dataSource}`);
  const moodScore = ((seed % 9) - 4) + (Number(pred?.d7 || 0) > 0 ? 1 : Number(pred?.d7 || 0) < 0 ? -1 : 0);
  const sentimentKey = moodScore >= 2 ? "pos" : moodScore <= -2 ? "neg" : "neu";
  const sentiment = sentimentKey === "pos" ? t("rep_sent_pos") : sentimentKey === "neg" ? t("rep_sent_neg") : t("rep_sent_neu");
  const headlines = [t("rep_headline_1"), t("rep_headline_2"), t("rep_headline_3")].map((line, idx) => {
    const variants = [
      currentLang === "zh" ? `${line}（信号 ${idx + 1}）` : `${line} (signal ${idx + 1})`,
      currentLang === "zh" ? `${line}（近端观察）` : `${line} (near-term view)`,
      currentLang === "zh" ? `${line}（风控角度）` : `${line} (risk view)`
    ];
    return variants[(seed + idx) % variants.length];
  });
  const summary = sentimentKey === "pos"
    ? (currentLang === "zh" ? "情绪面对短线表现略有支撑。" : "Sentiment adds a mild supportive tilt to the short-term setup.")
    : sentimentKey === "neg"
    ? (currentLang === "zh" ? "情绪面偏谨慎，需要继续观察确认。" : "Sentiment is cautious, so further confirmation is still needed.")
    : (currentLang === "zh" ? "情绪面中性，当前仍以价格信号为主。" : "Sentiment is neutral, so price action still carries more weight.");
  return { sentimentKey, sentiment, headlines, summary };
}

function applySettingsContextToPrediction(pred) {
  const newsPack = buildNewsInsightPack(pred.ticker, pred);
  pred.settingContext = {
    dataSource: uiSettings.dataSource,
    updateFreq: uiSettings.updateFreq,
    alertState: getAlertStateForPrediction(pred),
    newsPack
  };

  if (uiSettings.dataSource === "price_news") {
    const extraDriver = currentLang === "zh"
      ? `新闻情绪：${newsPack.sentiment}`
      : `News sentiment: ${newsPack.sentiment}`;
    pred.drivers = [extraDriver, ...(pred.drivers || [])].slice(0, 6);
    pred.advice = `${pred.advice} ${newsPack.summary}`.trim();
    pred.conf = clamp(Number(pred.conf || 0) + (newsPack.sentimentKey === "pos" ? 2 : newsPack.sentimentKey === "neg" ? -1 : 1), 35, 96);
  }

  return pred;
}

function fillTemplate(str, data) {
  return String(str || "").replace(/\{(\w+)\}/g, (_, key) => safeText(data[key], ""));
}

function updateSettingsLiveStatus() {
  const box = document.getElementById("settingsLiveStatus");
  if (!box) return;
  const alertsLabel = uiSettings.alertsOn ? t("rep_on") : t("rep_off");
  box.className = "footnote settings-live-status";
  box.innerHTML = `${escapeHtml(fillTemplate(t("set_status_ready"), { mode: getDataSourceLabel(), freq: getUpdateFrequencyLabel(), alerts: alertsLabel }))}<br>${escapeHtml(t("set_status_saved"))}`;
}

async function rerenderGeneratedReportIfNeeded() {
  const reportPreview = document.getElementById("reportPreview");
  if (reportPreview?.dataset.generated === "1") {
    const ticker = document.getElementById("repTicker")?.value || selectedTicker;
    const repRange = document.getElementById("repRange")?.value || currentRange;
    reportPreview.innerHTML = await buildReportPreview(ticker, repRange);
  }
}

async function applyRuntimeSettings(options = {}) {
  uiSettings = { ...uiSettings, ...collectUISettingsFromDom() };
  persistUISettings();
  applyTheme(uiSettings.theme);
  updateSettingsLiveStatus();
  startAutoRefresh();

  if (options.refresh !== false) {
    const pred = await predictRiskOnline(selectedTicker, currentRange);
    applyPrediction(pred);
    await requestAndRenderForecast(selectedTicker, currentRange, currentForecastDays);
    await rerenderGeneratedReportIfNeeded();
  }
}

function getCompareXLabels(range) {
  if (currentLang === "zh") {
    if (range === "1M") return { start: "1个月前", mid: "中间", end: "现在" };
    if (range === "3M") return { start: "3个月前", mid: "中间", end: "现在" };
    if (range === "6M") return { start: "6个月前", mid: "中间", end: "现在" };
    if (range === "1Y") return { start: "1年前", mid: "中间", end: "现在" };
    if (range === "3Y") return { start: "3年前", mid: "中间", end: "现在" };
    return { start: "开始", mid: "中间", end: "结束" };
  }

  if (range === "1M") return { start: "1M Ago", mid: "Middle", end: "Now" };
  if (range === "3M") return { start: "3M Ago", mid: "Middle", end: "Now" };
  if (range === "6M") return { start: "6M Ago", mid: "Middle", end: "Now" };
  if (range === "1Y") return { start: "1Y Ago", mid: "Middle", end: "Now" };
  if (range === "3Y") return { start: "3Y Ago", mid: "Middle", end: "Now" };
  return { start: "Start", mid: "Middle", end: "End" };
}

function buildCompareSeries(stock) {
  const base = Number(stock.score) || 0;
  const d7 = Number(stock.d7) || 0;
  const series = [
    Math.max(0, base - 8),
    Math.max(0, base - 5),
    Math.max(0, base - 2),
    Math.max(0, Math.min(100, base + Math.round(d7 / 2))),
    Math.max(0, Math.min(100, base))
  ];
  return series.map(v => Math.max(0, Math.min(100, v)));
}

function buildDefaultMetricsFromSeed(score, d7) {
  const s = Number(score) || 35;
  const d = Number(d7) || 0;

  const vol20 = clamp(18 + s * 0.45, 16, 68);
  const vol60 = clamp(vol20 - 4 + (d < 0 ? 1.5 : -0.5), 14, 64);
  const mdd6m = -clamp(5 + s * 0.27, 5, 35);
  const beta = clamp(0.72 + s / 62, 0.70, 2.10);
  const volChgPct = clamp(d * 2.2, -60, 60);
  const negDays20 = clamp(Math.round(6 + s / 8), 4, 15);
  const momentum20 = clamp(d * 1.8, -25, 25);

  return {
    vol20: Number(vol20.toFixed(1)),
    vol60: Number(vol60.toFixed(1)),
    mdd6m: Number(mdd6m.toFixed(1)),
    beta: Number(beta.toFixed(2)),
    volChgPct: Number(volChgPct.toFixed(1)),
    negDays20,
    momentum20: Number(momentum20.toFixed(1)),
    breakdown: normalizeBreakdown({
      market: beta * 22,
      drawdown: Math.abs(mdd6m) * 2.2,
      vol: vol20 * 1.45,
      liq: Math.abs(volChgPct) * 0.9 + 8
    })
  };
}

function buildDynamicAnalyticsFromHistory(series, fallbackD7 = 0) {
  const points = Array.isArray(series) ? series : [];
  const closes = points.map(p => Number(p.close)).filter(v => Number.isFinite(v));
  const volumes = points.map(p => Number(p.volume ?? p.v)).filter(v => Number.isFinite(v));

  const returns = [];
  for (let i = 1; i < closes.length; i++) {
    const prev = closes[i - 1];
    const now = closes[i];
    if (Number.isFinite(prev) && Number.isFinite(now) && prev !== 0) {
      returns.push((now / prev) - 1);
    }
  }

  const ret20 = returns.slice(-20);
  const ret60 = returns.slice(-60);

  const vol20 = annualizedVolPct(ret20);
  const vol60 = annualizedVolPct(ret60);
  const mdd6m = calcMaxDrawdownPct(closes.slice(-126));
  const negDays20 = ret20.filter(r => r < 0).length;

  const momentum20 = closes.length >= 21
    ? pctChange(closes[closes.length - 21], closes[closes.length - 1])
    : Number(fallbackD7) || 0;

  let volChgPct = clamp((Number(fallbackD7) || 0) * 2, -60, 60);
  if (volumes.length >= 20) {
    const prev10 = avg(volumes.slice(-20, -10));
    const last10 = avg(volumes.slice(-10));
    if (Number.isFinite(prev10) && Number.isFinite(last10) && prev10 !== 0) {
      volChgPct = pctChange(prev10, last10);
    }
  }

  const beta = clamp(0.65 + (vol60 / 35), 0.65, 2.20);

  return {
    vol20: Number(vol20.toFixed(1)),
    vol60: Number(vol60.toFixed(1)),
    mdd6m: Number(mdd6m.toFixed(1)),
    beta: Number(beta.toFixed(2)),
    volChgPct: Number(volChgPct.toFixed(1)),
    negDays20,
    momentum20: Number(momentum20.toFixed(1)),
    breakdown: normalizeBreakdown({
      market: (((beta - 0.65) / 1.55) * 100) + (momentum20 < 0 ? Math.min(16, Math.abs(momentum20) * 0.8) : 0),
      drawdown: (Math.abs(mdd6m) / 30) * 100,
      vol: (((vol20 * 0.6) + (vol60 * 0.4)) / 50) * 100,
      liq: (Math.abs(volChgPct) / 100) * 60 + 6
    })
  };
}

function computeConfidenceFromHistory(len, metrics) {
  let conf = 66;
  if (len >= 20) conf += 4;
  if (len >= 60) conf += 4;
  if (len >= 120) conf += 4;
  if ((metrics?.vol20 || 0) <= 35) conf += 3;
  if ((metrics?.vol20 || 0) >= 55) conf -= 3;
  if (Math.abs(metrics?.mdd6m || 0) >= 25) conf -= 2;
  return Math.round(clamp(conf, 60, 92));
}

function buildDriversFromMetrics(metrics, level) {
  const vol20 = Number(metrics?.vol20 || 0);
  const vol60 = Number(metrics?.vol60 || 0);
  const mdd6m = Number(metrics?.mdd6m || 0);
  const beta = Number(metrics?.beta || 1);
  const negDays20 = Number(metrics?.negDays20 || 0);
  const volChgPct = Number(metrics?.volChgPct || 0);
  const momentum20 = Number(metrics?.momentum20 || 0);

  if (currentLang === "zh") {
    return [
      `近20日年化波动率约 ${Math.round(vol20)}%，${vol20 > vol60 ? "短期波动高于中期。" : "短期波动低于或接近中期。"}`,
      `近6个月最大回撤约 ${mdd6m.toFixed(1)}%，${Math.abs(mdd6m) > 25 ? "回撤压力较高。" : Math.abs(mdd6m) > 12 ? "回撤压力中等。" : "回撤压力较低。"}`,
      `最近20个交易日中有 ${negDays20} 天为负收益，${negDays20 > 11 ? "短期情绪偏弱。" : negDays20 > 8 ? "短期信号较混合。" : "短期表现较稳。"}`,
      `Beta 约为 ${beta.toFixed(2)}，${beta > 1.4 ? "对大盘更敏感。" : beta > 1.0 ? "对大盘敏感度中等。" : "对大盘敏感度较低。"}`,
      `近10日成交量较前10日${volChgPct >= 0 ? "增加" : "减少"} ${Math.abs(volChgPct).toFixed(0)}%，${Math.abs(volChgPct) > 25 ? "流动性变化较明显。" : "流动性相对平稳。"}`,
      `近20日价格动量为 ${fmtSignedPct(momentum20, 1)}，${level === "HIGH" ? "风险信号偏高。" : level === "MEDIUM" ? "风险信号中性。" : "风险信号偏低。"}`
    ];
  }

  return [
    `20D annualized volatility is about ${Math.round(vol20)}%, ${vol20 > vol60 ? "higher than 60D." : "below or close to 60D."}`,
    `6M max drawdown is about ${mdd6m.toFixed(1)}%, ${Math.abs(mdd6m) > 25 ? "showing elevated drawdown pressure." : Math.abs(mdd6m) > 12 ? "showing moderate drawdown pressure." : "showing limited drawdown pressure."}`,
    `There were ${negDays20} negative-return days in the last 20 sessions, ${negDays20 > 11 ? "suggesting weaker short-term sentiment." : negDays20 > 8 ? "showing mixed short-term signals." : "showing steadier short-term behavior."}`,
    `Beta is around ${beta.toFixed(2)}, ${beta > 1.4 ? "indicating higher market sensitivity." : beta > 1.0 ? "indicating moderate market sensitivity." : "indicating lower market sensitivity."}`,
    `Volume ${volChgPct >= 0 ? "increased" : "decreased"} by ${Math.abs(volChgPct).toFixed(0)}% versus the prior 10 sessions, ${Math.abs(volChgPct) > 25 ? "so liquidity changed clearly." : "so liquidity stayed relatively stable."}`,
    `20D price momentum is ${fmtSignedPct(momentum20, 1)}, ${level === "HIGH" ? "supporting a higher risk reading." : level === "MEDIUM" ? "keeping the signal mixed." : "supporting a lower risk reading."}`
  ];
}

function buildActionAdvice(pred) {
  const vol20 = Number(pred?.metrics?.vol20 || 0);
  const mdd6m = Number(pred?.metrics?.mdd6m || 0);
  const momentum20 = Number(pred?.metrics?.momentum20 || 0);
  const volChg = Number(pred?.metrics?.volChgPct || 0);

  if (currentLang === "zh") {
    if (pred.level === "HIGH") {
      if (momentum20 < 0) {
        return "建议谨慎观望，短期不宜追高；优先关注波动和回撤是否收敛。";
      }
      return "风险较高，建议控制仓位，并观察成交量与回撤是否继续扩大。";
    }

    if (pred.level === "MEDIUM") {
      if (vol20 > 45 || Math.abs(mdd6m) > 18) {
        return "建议继续观察，重点留意回撤是否扩大，以及短期波动是否继续上升。";
      }
      return "风险中等，可结合趋势和基本面再判断，不建议仅凭单一信号操作。";
    }

    if (momentum20 >= 0 && volChg >= 0) {
      return "整体风险偏低，走势相对稳定，可继续跟踪量能与趋势确认。";
    }

    if (momentum20 < 0) {
      return "整体风险偏低，但近期动量转弱，建议轻仓观察并留意支撑位。";
    }

    return "整体风险偏低，可继续观察价格与成交量是否维持稳定。";
  }

  if (pred.level === "HIGH") {
    if (momentum20 < 0) {
      return "Stay cautious and avoid chasing in the short term; watch whether volatility and drawdown start to ease.";
    }
    return "Risk is elevated, so position control is recommended while watching volume and drawdown closely.";
  }

  if (pred.level === "MEDIUM") {
    if (vol20 > 45 || Math.abs(mdd6m) > 18) {
      return "Keep monitoring the stock and focus on whether drawdown widens and short-term volatility keeps rising.";
    }
    return "Risk is moderate, so combine this signal with trend and fundamentals before making a decision.";
  }

  if (momentum20 >= 0 && volChg >= 0) {
    return "Overall risk is lower and the trend looks steadier; keep tracking volume and trend confirmation.";
  }

  if (momentum20 < 0) {
    return "Overall risk is lower, but momentum has weakened recently, so a light and watchful approach is better.";
  }

  return "Overall risk is lower; keep watching whether price and volume remain stable.";
}

function buildSummaryText(pred) {
  const advice = buildActionAdvice(pred);
  const vol20 = Number(pred?.metrics?.vol20 || 0);
  const mdd6m = Number(pred?.metrics?.mdd6m || 0);
  const modeNote = uiSettings.dataSource === "price_news"
    ? (currentLang === "zh" ? ` 当前已启用“${getDataSourceLabel()}”模式，说明中会额外参考情绪信号。` : ` ${getDataSourceLabel()} mode is enabled, so the explanation also references a light sentiment signal.`)
    : (currentLang === "zh" ? ` 当前使用“${getDataSourceLabel()}”模式，解释主要基于价格、波动与成交量。` : ` ${getDataSourceLabel()} mode is active, so the explanation stays focused on price, volatility, and volume.`);

  if (currentLang === "zh") {
    const base = pred.level === "HIGH"
      ? `短期风险较高（20日波动约 ${Math.round(vol20)}%，6个月回撤约 ${mdd6m.toFixed(1)}%）。`
      : pred.level === "MEDIUM"
      ? `短期风险中等（波动与回撤信号较混合，20日波动约 ${Math.round(vol20)}%）。`
      : `短期风险较低（近阶段相对稳定，20日波动约 ${Math.round(vol20)}%，回撤约 ${mdd6m.toFixed(1)}%）。`;

    return `${base}${advice}${modeNote}`;
  }

  const base = pred.level === "HIGH"
    ? `Higher short-term risk (20D vol about ${Math.round(vol20)}%, 6M drawdown about ${mdd6m.toFixed(1)}%).`
    : pred.level === "MEDIUM"
    ? `Moderate short-term risk with mixed volatility and drawdown signals (20D vol about ${Math.round(vol20)}%).`
    : `Lower short-term risk with relatively steadier recent behavior (20D vol about ${Math.round(vol20)}%, drawdown about ${mdd6m.toFixed(1)}%).`;

  return `${base} ${advice}${modeNote}`;
}



function forecastConfidenceLabel(conf) {
  if (conf === "High") return t("fc_conf_high");
  if (conf === "Medium") return t("fc_conf_medium");
  if (conf === "Low") return t("fc_conf_low");
  return safeText(conf);
}

function forecastConfidenceBadgeClass(conf) {
  if (conf === "High") return "high";
  if (conf === "Medium") return "medium";
  return "low";
}

function forecastSummaryEntries(summary = {}) {
  return [
    [t("fc_summary_start"), safeText(summary.startPrice)],
    [t("fc_summary_end"), safeText(summary.endPrice)],
    [t("fc_summary_avg"), safeText(summary.averagePrice)],
    [t("fc_summary_high"), safeText(summary.highestPrice)],
    [t("fc_summary_low"), safeText(summary.lowestPrice)],
    [t("fc_summary_change"), `${Number(summary.priceChangePct || 0) >= 0 ? "+" : ""}${safeText(summary.priceChangePct)}%`],
    [t("fc_summary_days"), safeText(summary.totalDataDays)],
  ];
}

function hashTickerSeed(input) {
  const s = String(input || "DEMO");
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededRandom(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function offlinePointCount(range) {
  return getRangeConfig(range).points;
}

function getTickerArchetype(profile) {
  const base = tickerBaseName(profile.clean);
  const preset = {
    AAPL: "steady-down",
    MSFT: "steady-up",
    NVDA: "strong-up",
    TSLA: "volatile-swing",
    AMZN: "rebound",
    META: "range-bound",
    GOOGL: "soft-down",
    "300750": "rebound",
    "600519": "range-bound",
    "002594": "strong-up",
    BABA: "soft-down",
    JPM: "steady-up",
    AMD: "volatile-swing"
  };
  return preset[base] || ["strong-up", "steady-up", "steady-down", "volatile-swing", "rebound", "range-bound", "soft-down"][profile.seed % 7];
}

function getTickerPatternConfig(profile) {
  const base = tickerBaseName(profile.clean);
  const presets = {
    AAPL: { driftBias: -0.0015, waveBoost: 0.95, shockBoost: 0.75, livePulse: 0.0018 },
    TSLA: { driftBias: 0.0006, waveBoost: 1.65, shockBoost: 1.9, livePulse: 0.0048 },
    NVDA: { driftBias: 0.0038, waveBoost: 1.25, shockBoost: 1.1, livePulse: 0.0032 },
    MSFT: { driftBias: 0.0018, waveBoost: 0.85, shockBoost: 0.65, livePulse: 0.0015 },
    AMZN: { driftBias: 0.0007, waveBoost: 1.15, shockBoost: 1.0, livePulse: 0.0022 },
    META: { driftBias: 0.0002, waveBoost: 1.05, shockBoost: 0.85, livePulse: 0.0020 },
    GOOGL: { driftBias: -0.0008, waveBoost: 0.9, shockBoost: 0.7, livePulse: 0.0017 },
    "300750": { driftBias: 0.0020, waveBoost: 1.35, shockBoost: 1.35, livePulse: 0.0030 },
    "600519": { driftBias: 0.0004, waveBoost: 0.75, shockBoost: 0.55, livePulse: 0.0012 },
    "002594": { driftBias: 0.0027, waveBoost: 1.2, shockBoost: 1.05, livePulse: 0.0028 }
  };
  return presets[base] || {
    driftBias: (((profile.seed >> 11) % 11) - 5) / 3000,
    waveBoost: 0.8 + ((profile.seed >> 15) % 9) / 10,
    shockBoost: 0.7 + ((profile.seed >> 19) % 8) / 10,
    livePulse: 0.0015 + ((profile.seed >> 23) % 10) / 5000
  };
}

function generateOfflineHistory(ticker, range) {
  const profile = getTickerProfile(ticker);
  const cfg = getRangeConfig(range);
  const pattern = getTickerPatternConfig(profile);
  const rand = seededRandom(hashTickerSeed(`${profile.clean}:${range}:history:v4`));
  const shockMap = buildShockMap(cfg.points, profile.seed ^ hashTickerSeed(`${range}:detail`), cfg.shockScale * pattern.shockBoost);
  const end = new Date();
  const series = [];
  const archetype = getTickerArchetype(profile);

  let price = profile.basePrice * (1 + (((profile.seed >> 20) % 9) - 4) / 100);

  const trendByType = {
    "strong-up": 0.0058,
    "steady-up": 0.0036,
    "steady-down": -0.0036,
    "soft-down": -0.0021,
    "rebound": 0.0007,
    "range-bound": 0.0001,
    "volatile-swing": 0.0003,
  };
  const waveByType = {
    "strong-up": 0.010,
    "steady-up": 0.008,
    "steady-down": 0.008,
    "soft-down": 0.007,
    "rebound": 0.011,
    "range-bound": 0.012,
    "volatile-swing": 0.018,
  };

  for (let i = 0; i < cfg.points; i++) {
    const progress = i / Math.max(1, cfg.points - 1);
    let regimeTrend = trendByType[archetype] * cfg.trendScale + pattern.driftBias;

    if (archetype === "rebound") {
      regimeTrend = (progress < 0.42 ? -0.0048 : 0.0066) * cfg.trendScale + pattern.driftBias;
    } else if (archetype === "range-bound") {
      regimeTrend = Math.sin(progress * Math.PI * 2.4 + profile.curvePhase) * 0.0010 + pattern.driftBias * 0.3;
    } else if (archetype === "volatile-swing") {
      regimeTrend = Math.sin(progress * Math.PI * 3.6 + profile.curvePhase) * 0.0033 + pattern.driftBias * 0.5;
    }

    const waveAmp = waveByType[archetype] * pattern.waveBoost * (0.72 + cfg.noiseScale * 0.34);
    const cycleA = Math.sin(progress * Math.PI * (1.4 + ((profile.seed >> 6) % 4)) + profile.curvePhase) * waveAmp;
    const cycleB = Math.cos(progress * Math.PI * (2.6 + ((profile.seed >> 9) % 5)) + profile.curvePhase * 0.72) * (waveAmp * 0.48);
    const cycleC = Math.sin(progress * Math.PI * (4.1 + ((profile.seed >> 12) % 4)) + profile.curvePhase * 1.12) * (waveAmp * 0.22);
    const noise = (rand() - 0.5) * profile.volTilt * cfg.noiseScale * (archetype === "volatile-swing" ? 1.8 : 1.05);
    const shock = shockMap.get(i) || 0;
    const stepReturn = regimeTrend + cycleA + cycleB + cycleC + shock + noise;
    price = Math.max(2, price * (1 + stepReturn));

    const d = new Date(end);
    d.setDate(end.getDate() - ((cfg.points - 1 - i) * cfg.dayStep));

    const volumeBase = 680000 + ((profile.seed % 15) * 88000);
    const volume = Math.round(volumeBase * (0.78 + rand() * 0.46 + Math.abs(stepReturn) * 3.6));

    series.push({
      t: d.toISOString(),
      close: Number(price.toFixed(2)),
      volume,
    });
  }

  const liveBucket = Math.floor(Date.now() / 8000);
  const livePulse = Math.sin(liveBucket * 0.9 + (profile.seed % 17)) * pattern.livePulse;
  for (let i = Math.max(0, series.length - 4); i < series.length; i++) {
    const weight = (i - (series.length - 4) + 1) / 4;
    const nextClose = Math.max(2, Number(series[i].close) * (1 + livePulse * weight));
    series[i].close = Number(nextClose.toFixed(2));
  }

  return {
    ticker: profile.clean,
    provider: 'offline-demo',
    range,
    points: series.length,
    series,
    ts: new Date().toISOString(),
    offline: true,
  };
}

function buildHistorySummary(series) {
  const points = Array.isArray(series) ? series : [];
  const closes = points.map((p) => Number(p.close)).filter((v) => Number.isFinite(v));
  if (!closes.length) {
    return {
      startPrice: '-',
      endPrice: '-',
      averagePrice: '-',
      highestPrice: '-',
      lowestPrice: '-',
      priceChangePct: 0,
      totalDataDays: 0,
    };
  }

  return {
    startPrice: Number(closes[0].toFixed(2)),
    endPrice: Number(closes[closes.length - 1].toFixed(2)),
    averagePrice: Number(avg(closes).toFixed(2)),
    highestPrice: Number(Math.max(...closes).toFixed(2)),
    lowestPrice: Number(Math.min(...closes).toFixed(2)),
    priceChangePct: Number(pctChange(closes[0], closes[closes.length - 1]).toFixed(2)),
    totalDataDays: closes.length,
  };
}

function shortForecastFactors(metrics = {}, projectedChangePct = 0, days = 7, lang = currentLang) {
  const momentum20 = Number(metrics.momentum20 || 0);
  const vol20 = Number(metrics.vol20 || 0);
  const mdd6m = Number(metrics.mdd6m || 0);
  const volChgPct = Number(metrics.volChgPct || 0);

  if (lang === "zh") {
    return [
      momentum20 >= 0 ? "近期动量偏强" : "近期动量偏弱",
      vol20 > 45 ? "短期波动偏高" : "短期波动可控",
      Math.abs(mdd6m) > 18 ? "回撤压力仍较明显" : "回撤压力较有限",
      volChgPct >= 0 ? "流动性活跃度在改善" : "流动性活跃度偏弱",
      `${days}天预期变动：${projectedChangePct >= 0 ? "+" : ""}${projectedChangePct.toFixed(2)}%`,
    ];
  }

  return [
    momentum20 >= 0 ? "Positive recent momentum" : "Weak recent momentum",
    vol20 > 45 ? "Higher short-term volatility" : "Contained short-term volatility",
    Math.abs(mdd6m) > 18 ? "Drawdown pressure remains visible" : "Drawdown pressure is limited",
    volChgPct >= 0 ? "Liquidity activity is improving" : "Liquidity activity is softer",
    `${days}D projected move: ${projectedChangePct >= 0 ? "+" : ""}${projectedChangePct.toFixed(2)}%`,
  ];
}

function localizedForecastDirection(direction) {
  if (currentLang === "zh") {
    if (direction === "Bullish") return "看涨";
    if (direction === "Bearish") return "看跌";
    return "震荡";
  }
  return direction || "Sideways";
}

function localizedForecastMethod(method) {
  if (currentLang === "zh") {
    if (String(method || "").toLowerCase().includes("rule-based browser forecast")) return "基于规则的浏览器预测";
    if (String(method || "").toLowerCase().includes("browser forecast")) return "浏览器预测";
  }
  return safeText(method, "-");
}

function localizedForecastSource(result = {}) {
  const label = result.source || result.method || "-";
  if (currentLang === "zh") {
    if (String(label).toLowerCase().includes("integrated browser forecast")) return "浏览器整合预测";
    if (String(label).toLowerCase().includes("rule-based browser forecast")) return "基于规则的浏览器预测";
  }
  return label;
}

function localizedForecastAnalysis(result = {}) {
  const days = Number(result.forecastDays || 0);
  const projectedChangePct = Number(result.projectedChangePct || 0);
  const vol20 = Number(result.metrics?.vol20 || 0);

  if (currentLang === "zh") {
    return `使用 ${days} 天预测期，模型预计相对最新收盘价${projectedChangePct >= 0 ? "上涨" : "下跌"}${Math.abs(projectedChangePct).toFixed(2)}%。20日年化波动率约为 ${Math.round(vol20)}%。`;
  }

  return `Using ${days} forecast day(s), the model projects ${projectedChangePct >= 0 ? "a rise" : "a decline"} of ${Math.abs(projectedChangePct).toFixed(2)}% from the latest close. 20D annualized volatility is about ${Math.round(vol20)}%.`;
}

function localizedForecastOutlook(result = {}) {
  const days = Number(result.forecastDays || 0);
  const directionText = localizedForecastDirection(result.direction);
  const endPrice = result.projectionSummary?.endPrice ?? result.historicalSummary?.endPrice ?? "-";

  if (currentLang === "zh") {
    return `预计未来 ${days} 天走势偏${directionText}，预测期末价格约为 ${endPrice}。`;
  }

  return `Expected to be ${directionText} over the next ${days} days, with projected end price near ${endPrice}.`;
}

function addDaysToIso(isoString, days) {
  const base = isoString ? new Date(isoString) : new Date();
  const d = new Date(base);
  d.setDate(d.getDate() + Number(days || 0));
  return d.toISOString();
}

function buildProjectedSeriesFromHistory(series = [], ticker = "DEMO", range = "1M", days = 7) {
  const points = Array.isArray(series) ? series : [];
  const closes = points.map((p) => Number(p.close)).filter((v) => Number.isFinite(v));
  if (!closes.length) return [];

  const returns = [];
  for (let i = 1; i < closes.length; i++) {
    if (closes[i - 1] !== 0) returns.push(closes[i] / closes[i - 1] - 1);
  }

  const recentReturns = returns.slice(-Math.min(10, returns.length));
  const avgReturn = recentReturns.length ? avg(recentReturns) : 0;
  const vol = recentReturns.length >= 2 ? sampleStd(recentReturns) : 0.01;
  const seed = hashTickerSeed(`${String(ticker || "DEMO").toUpperCase()}:${range}:${days}:forecast`);
  const rand = seededRandom(seed);
  const projected = [];
  let prevClose = closes[closes.length - 1];
  let prevDate = points[points.length - 1]?.t || new Date().toISOString();
  const dayStep = range === "3Y" ? 7 : range === "1Y" ? 3 : 1;

  for (let i = 1; i <= days; i++) {
    const horizonBoost = Math.min(0.012, Math.abs(avgReturn) * 0.35 * Math.sqrt(i / Math.max(1, days)));
    const drift = avgReturn * (0.65 + i / Math.max(1, days) * 0.45);
    const noise = (rand() - 0.5) * Math.max(0.004, vol * 0.9);
    const directional = avgReturn >= 0 ? horizonBoost : -horizonBoost;
    const stepReturn = drift + directional + noise;
    const nextClose = Math.max(1, prevClose * (1 + stepReturn));
    prevDate = addDaysToIso(prevDate, dayStep);
    projected.push({
      t: prevDate,
      close: Number(nextClose.toFixed(2)),
      volume: null,
      projected: true,
    });
    prevClose = nextClose;
  }

  return projected;
}

function buildProjectionSummary(projectedSeries = [], lastHistoricalClose = null) {
  const closes = (projectedSeries || []).map((p) => Number(p.close)).filter((v) => Number.isFinite(v));
  if (!closes.length) return null;
  const start = Number.isFinite(lastHistoricalClose) ? Number(lastHistoricalClose) : closes[0];
  const end = closes[closes.length - 1];
  return {
    startPrice: Number(start.toFixed(2)),
    endPrice: Number(end.toFixed(2)),
    averagePrice: Number(avg(closes).toFixed(2)),
    highestPrice: Number(Math.max(...closes).toFixed(2)),
    lowestPrice: Number(Math.min(...closes).toFixed(2)),
    priceChangePct: Number(pctChange(start, end).toFixed(2)),
    totalDataDays: closes.length,
  };
}

function mergeForecastRiskSeries(historySeries = [], projectedSeries = []) {
  const histCloses = (historySeries || []).map((p) => Number(p.close)).filter((v) => Number.isFinite(v));
  const projectedCloses = (projectedSeries || []).map((p) => Number(p.close)).filter((v) => Number.isFinite(v));
  const combined = [...histCloses, ...projectedCloses];
  if (!combined.length) return [];
  const series = computeRiskSeriesFromCloses(combined);
  const maxPoints = 48;
  if (series.length <= maxPoints) return series;
  const step = (series.length - 1) / (maxPoints - 1);
  const sampled = [];
  for (let i = 0; i < maxPoints; i++) {
    sampled.push(series[Math.round(i * step)]);
  }
  return sampled;
}

function buildClientForecastResult(ticker, range, days, hist) {
  const summary = buildHistorySummary(hist.series || []);
  const metrics = buildDynamicAnalyticsFromHistory(hist.series || [], 0);
  const projectedSeries = buildProjectedSeriesFromHistory(hist.series || [], ticker, range, days);
  const projectionSummary = buildProjectionSummary(projectedSeries, Number(summary.endPrice));
  const projectedChangePct = Number(projectionSummary?.priceChangePct || 0);
  const vol20 = Number(metrics.vol20 || 0);
  const direction = projectedChangePct > 1.5 ? "Bullish" : projectedChangePct < -1.5 ? "Bearish" : "Sideways";
  const confidence = days >= 20
    ? (vol20 > 42 ? "Low" : "Medium")
    : (Math.abs(projectedChangePct) > 3 && vol20 < 38 ? "High" : vol20 > 48 ? "Low" : "Medium");
  const dateRange = `${String(hist.series?.[0]?.t || "").slice(0, 10)} to ${String(hist.series?.[hist.series.length - 1]?.t || "").slice(0, 10)}`;
  const forecastEnd = String(projectedSeries?.[projectedSeries.length - 1]?.t || hist.series?.[hist.series.length - 1]?.t || "").slice(0, 10);
  const analysis = `Using ${days} forecast day(s), the model projects ${projectedChangePct >= 0 ? "a rise" : "a decline"} of ${Math.abs(projectedChangePct).toFixed(2)}% from the latest close. 20D annualized volatility is about ${Math.round(vol20)}%.`;
  const forecast = `Expected to be ${direction} over the next ${days} days, with projected end price near ${projectionSummary?.endPrice ?? summary.endPrice}.`;

  return {
    ticker: String(ticker || "").trim().toUpperCase(),
    range,
    forecastDays: days,
    generatedAt: new Date().toISOString(),
    status: "ok",
    source: "Integrated browser forecast",
    dateRange,
    forecastEnd,
    historicalSummary: summary,
    projectionSummary,
    historySeries: hist.series || [],
    recentSample: (hist.series || []).slice(-10),
    method: "rule-based browser forecast",
    metrics,
    projectedChangePct,
    direction,
    analysis,
    forecast,
    confidence,
    keyFactors: shortForecastFactors(metrics, projectedChangePct, days, currentLang),
    projectedSeries,
    chartRiskSeries: mergeForecastRiskSeries(hist.series || [], projectedSeries),
  };
}

function seriesSignature(series = []) {
  const points = (series || []).map((p) => Number(p?.close)).filter((v) => Number.isFinite(v));
  if (!points.length) return "empty";
  const take = (arr, n) => arr.slice(0, n).concat(arr.slice(-n));
  return `${points.length}|${take(points, 3).map((v) => v.toFixed(2)).join(",")}`;
}

async function fetchForecast(ticker, range, days) {
  try {
    const hist = await fetchHistory(ticker, range);
    return buildClientForecastResult(ticker, range, days, hist);
  } catch (e) {
    const hist = generateOfflineHistory(ticker, range);
    return buildClientForecastResult(ticker, range, days, hist);
  }
}

function applyForecastVisuals(result) {
  try {
    drawTrendChart("s1", result.historySeries || [], result.projectedSeries || [], result.ticker || selectedTicker);
    drawTrendChart("s2", result.historySeries || [], result.projectedSeries || [], result.ticker || selectedTicker);

    const s1RangeLabel = document.getElementById("s1RangeLabel");
    if (s1RangeLabel) s1RangeLabel.textContent = `${t("range_label")} ${currentRange} + ${result.forecastDays}D`;
    const s2RangeLabel = document.getElementById("s2RangeLabel");
    if (s2RangeLabel) s2RangeLabel.textContent = `${t("range_label")} ${currentRange} + ${result.forecastDays}D`;

    const s1End = document.getElementById("s1XEnd");
    const s2End = document.getElementById("s2XEnd");
    if (s1End && result.forecastEnd) s1End.textContent = fmtDateShort(result.forecastEnd);
    if (s2End && result.forecastEnd) s2End.textContent = fmtDateShort(result.forecastEnd);
  } catch (e) {
    console.error("applyForecastVisuals failed:", e);
  }
}

function renderForecastCard(result) {
  lastForecastResult = result || null;

  const tickerLabel = document.getElementById("forecastTickerLabel");
  if (tickerLabel && result) tickerLabel.textContent = currentLang === "zh" ? `${result.ticker} • ${result.forecastDays}天` : `${result.ticker} • ${result.forecastDays}D`;

  const status = document.getElementById("forecastStatus");
  if (status && result) {
    const horizonText = currentLang === "zh" ? `预测期 ${result.forecastDays}天` : `Horizon ${result.forecastDays}D`;
    status.textContent = `${result.dateRange} • ${localizedForecastSource(result)} • ${horizonText}`;
  }

  const analysis = document.getElementById("forecastAnalysis");
  if (analysis) analysis.textContent = result ? localizedForecastAnalysis(result) : "-";

  const outlook = document.getElementById("forecastOutlook");
  if (outlook) outlook.textContent = result ? localizedForecastOutlook(result) : "-";

  const confidence = document.getElementById("forecastConfidence");
  if (confidence) {
    confidence.className = `badge ${forecastConfidenceBadgeClass(result?.confidence)}`;
    confidence.textContent = forecastConfidenceLabel(result?.confidence);
  }

  const method = document.getElementById("forecastMethod");
  if (method) method.textContent = localizedForecastMethod(result?.method);

  const factors = document.getElementById("forecastFactors");
  if (factors) {
    const factorList = result ? shortForecastFactors(result.metrics || {}, Number(result.projectedChangePct || 0), Number(result.forecastDays || currentForecastDays || 7), currentLang) : [];
    factors.innerHTML = factorList.map((item) => `<div class="driver">${escapeHtml(item)}</div>`).join("");
  }

  const summary = document.getElementById("forecastSummary");
  if (summary) {
    const summaryData = result?.projectionSummary || result?.historicalSummary || {};
    summary.innerHTML = forecastSummaryEntries(summaryData).map(([label, value]) => `
      <div class="forecast-summary-row">
        <div class="label">${escapeHtml(label)}</div>
        <div class="value">${escapeHtml(String(value))}</div>
      </div>
    `).join("");
  }

  applyForecastVisuals(result);
}

function downloadForecastCsv() {
  if (!lastForecastResult) {
    alert(t("fc_export_empty"));
    return;
  }

  const r = lastForecastResult;
  const rows = [
    ["Ticker", r.ticker],
    ["Range", r.range],
    ["Forecast Days", r.forecastDays],
    ["Date Range", r.dateRange],
    ["Method", r.method],
    ["Confidence", r.confidence],
    ["Analysis", r.analysis],
    ["Forecast", r.forecast],
    ["Key Factors", (r.keyFactors || []).join(" | ")],
    ["Start Price", r.historicalSummary?.startPrice],
    ["End Price", r.historicalSummary?.endPrice],
    ["Average Price", r.historicalSummary?.averagePrice],
    ["Highest Price", r.historicalSummary?.highestPrice],
    ["Lowest Price", r.historicalSummary?.lowestPrice],
    ["Price Change (%)", r.historicalSummary?.priceChangePct],
    ["Total Data Days", r.historicalSummary?.totalDataDays],
    ["Generated At", r.generatedAt],
  ];

  const csv = rows.map((row) => row.map((cell) => {
    const value = cell == null ? "" : String(cell);
    return `"${value.replaceAll('"', '""')}"`;
  }).join(",")).join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `forecast_${r.ticker}_${r.forecastDays}d.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  alert(t("fc_export_done"));
}

async function requestAndRenderForecast(ticker = selectedTicker, range = currentRange, days = currentForecastDays) {
  const status = document.getElementById("forecastStatus");
  if (status) status.textContent = t("fc_loading");

  try {
    const result = await fetchForecast(ticker, range, days);
    renderForecastCard(result);
    return result;
  } catch (e) {
    console.error("Forecast failed:", e);
    if (status) status.textContent = t("fc_error");
    return null;
  }
}

async function fetchHistory(ticker, range) {
  const requestedTicker = String(ticker || "").trim().toUpperCase();
  const requestedRange = String(range || "1M").toUpperCase();

  if (FORCE_LOCAL_DEMO_HISTORY) {
    const local = generateOfflineHistory(requestedTicker, requestedRange);
    lastFetchedHistoryMeta = {
      ticker: requestedTicker,
      range: requestedRange,
      signature: seriesSignature(local.series || [])
    };
    return local;
  }

  try {
    const url = `/api/history?t=${encodeURIComponent(requestedTicker)}&range=${encodeURIComponent(requestedRange)}&_=${Date.now()}`;
    const r = await fetch(url, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, max-age=0",
        Pragma: "no-cache"
      }
    });
    if (!r.ok) throw new Error("history fetch failed");
    const data = await r.json();
    const returnedTicker = String(data?.ticker || "").trim().toUpperCase();
    const sig = seriesSignature(data?.series || []);

    if (returnedTicker && returnedTicker !== requestedTicker) {
      throw new Error(`history ticker mismatch: expected ${requestedTicker}, got ${returnedTicker}`);
    }

    if (
      lastFetchedHistoryMeta &&
      lastFetchedHistoryMeta.ticker !== requestedTicker &&
      lastFetchedHistoryMeta.range === requestedRange &&
      lastFetchedHistoryMeta.signature === sig
    ) {
      const fallback = generateOfflineHistory(requestedTicker, requestedRange);
      lastFetchedHistoryMeta = { ticker: requestedTicker, range: requestedRange, signature: seriesSignature(fallback.series || []) };
      return fallback;
    }

    lastFetchedHistoryMeta = { ticker: requestedTicker, range: requestedRange, signature: sig };
    return data;
  } catch (e) {
    const fallback = generateOfflineHistory(requestedTicker, requestedRange);
    lastFetchedHistoryMeta = { ticker: requestedTicker, range: requestedRange, signature: seriesSignature(fallback.series || []) };
    return fallback;
  }
}

function computeRiskSeriesFromCloses(closes) {
  const n = closes.length;
  if (n < 3) return closes.map(() => 0);

  const W = 20;
  const scores = [];

  for (let i = 0; i < n; i++) {
    const start = Math.max(0, i - W + 1);
    const window = closes.slice(start, i + 1);

    const rets = [];
    for (let k = 1; k < window.length; k++) {
      const r = (window[k] / window[k - 1]) - 1;
      if (Number.isFinite(r)) rets.push(r);
    }

    if (rets.length < 2) {
      scores.push(0);
      continue;
    }

    const mean = rets.reduce((a, b) => a + b, 0) / rets.length;
    const varr = rets.reduce((a, b) => a + (b - mean) * (b - mean), 0) / (rets.length - 1);
    const volAnn = Math.sqrt(varr) * Math.sqrt(252);

    let peak = window[0];
    let mdd = 0;
    for (const p of window) {
      if (p > peak) peak = p;
      const dd = (p / peak) - 1;
      if (dd < mdd) mdd = dd;
    }

    const volScore = Math.max(0, Math.min(60, (volAnn / 0.8) * 60));
    const mddScore = Math.max(0, Math.min(40, (Math.abs(mdd) / 0.4) * 40));
    const score = Math.round(Math.max(0, Math.min(100, volScore + mddScore)));
    scores.push(score);
  }

  return scores;
}

function formatChartPrice(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "-";
  if (Math.abs(num) >= 1000) return num.toFixed(0);
  if (Math.abs(num) >= 100) return num.toFixed(1);
  if (Math.abs(num) >= 10) return num.toFixed(2);
  return num.toFixed(2);
}

function drawTrendChart(prefix, historySeries = [], projectedSeries = [], labelTicker = selectedTicker) {
  const svg = document.getElementById(`${prefix}Chart`);
  const histLine = document.getElementById(`${prefix}HistLine`);
  const projLine = document.getElementById(`${prefix}ProjLine`);
  const forecastArea = document.getElementById(`${prefix}ForecastArea`);
  const projStart = document.getElementById(`${prefix}ProjStart`);
  const dot = document.getElementById(`${prefix}Dot`);
  const latest = document.getElementById(`${prefix}LastText`);
  const xLabel = document.getElementById(`${prefix}XLabel`);
  const yLabel = document.getElementById(`${prefix}YLabel`);
  if (!svg || !histLine || !projLine || !forecastArea || !projStart || !dot || !latest) return;

  const vb = svg.viewBox?.baseVal;
  const w = vb?.width || 1040;
  const h = vb?.height || 380;
  const isLarge = prefix === "s1";
  const padLeft = 110;
  const padRight = 76;
  const padTop = isLarge ? 82 : 76;
  const padBottom = isLarge ? 78 : 76;
  const innerW = w - padLeft - padRight;
  const innerH = h - padTop - padBottom;

  const history = (historySeries || []).map((p) => ({
    t: p?.t,
    close: Number(p?.close),
    projected: false,
  })).filter((p) => Number.isFinite(p.close));
  const projected = (projectedSeries || []).map((p) => ({
    t: p?.t,
    close: Number(p?.close),
    projected: true,
  })).filter((p) => Number.isFinite(p.close));

  const all = [...history, ...projected];
  if (!all.length) return;

  let minV = Math.min(...all.map((p) => p.close));
  let maxV = Math.max(...all.map((p) => p.close));
  const span = Math.max(1, maxV - minV);
  const padValue = Math.max(1, span * 0.12);
  minV = Math.max(0, minV - padValue);
  maxV = maxV + padValue;

  const totalPoints = Math.max(1, all.length - 1);
  const pointToXY = (point, idx) => {
    const x = padLeft + (idx / totalPoints) * innerW;
    const y = padTop + (1 - ((point.close - minV) / Math.max(1e-9, maxV - minV))) * innerH;
    return { x, y };
  };

  const histPtsArr = history.map((p, i) => pointToXY(p, i));
  const projPtsArr = projected.map((p, i) => pointToXY(p, history.length - 1 + i + 1));

  histLine.setAttribute("points", histPtsArr.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" "));
  histLine.style.display = histPtsArr.length ? "block" : "none";

  if (projected.length && histPtsArr.length) {
    const projPath = [histPtsArr[histPtsArr.length - 1], ...projPtsArr];
    projLine.setAttribute("points", projPath.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" "));
    projLine.style.display = "block";

    const lastHist = histPtsArr[histPtsArr.length - 1];
    const areaPoints = [
      `${lastHist.x.toFixed(1)},${(padTop + innerH).toFixed(1)}`,
      `${lastHist.x.toFixed(1)},${lastHist.y.toFixed(1)}`,
      ...projPtsArr.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`),
      `${projPtsArr[projPtsArr.length - 1].x.toFixed(1)},${(padTop + innerH).toFixed(1)}`,
    ];
    forecastArea.setAttribute("points", areaPoints.join(" "));
    forecastArea.style.display = "block";

    projStart.setAttribute("cx", lastHist.x.toFixed(1));
    projStart.setAttribute("cy", lastHist.y.toFixed(1));
    projStart.style.display = "block";
  } else {
    projLine.setAttribute("points", "");
    projLine.style.display = "none";
    forecastArea.setAttribute("points", "");
    forecastArea.style.display = "none";
    projStart.style.display = "none";
  }

  const latestPoint = projPtsArr[projPtsArr.length - 1] || histPtsArr[histPtsArr.length - 1];
  const latestValue = projected[projected.length - 1]?.close ?? history[history.length - 1]?.close ?? 0;
  if (latestPoint) {
    dot.setAttribute("cx", latestPoint.x.toFixed(1));
    dot.setAttribute("cy", latestPoint.y.toFixed(1));
    dot.style.display = "block";
  }

  latest.textContent = `${t("latest")} ${formatChartPrice(latestValue)}`;
  latest.setAttribute("x", "24");
  latest.setAttribute("y", isLarge ? "74" : "68");

  if (yLabel) {
    yLabel.textContent = buildPreviewTickerLabel(labelTicker || selectedTicker, currentRange);
    yLabel.setAttribute("x", "24");
    yLabel.setAttribute("y", "40");
    yLabel.removeAttribute("transform");
  }

  if (xLabel) {
    xLabel.textContent = currentLang === "zh" ? "时间" : "Time";
    xLabel.setAttribute("x", String(padLeft + innerW / 2));
    xLabel.setAttribute("y", String(h - 14));
  }

  const tickTop = document.getElementById(`${prefix}YTick100`);
  const tickMid = document.getElementById(`${prefix}YTick50`);
  const tickBot = document.getElementById(`${prefix}YTick0`);
  const gridTop = document.getElementById(`${prefix}GridTop`);
  const gridMid = document.getElementById(`${prefix}GridMid`);
  const gridBot = document.getElementById(`${prefix}GridBot`);
  const axisX = document.getElementById(`${prefix}AxisX`);
  const axisY = document.getElementById(`${prefix}AxisY`);
  const xStart = document.getElementById(`${prefix}XStart`);
  const xMid = document.getElementById(`${prefix}XMid`);
  const xEnd = document.getElementById(`${prefix}XEnd`);

  const yTop = padTop;
  const yMid = padTop + innerH / 2;
  const yBot = padTop + innerH;
  const xStartPos = padLeft;
  const xMidPos = padLeft + innerW / 2;
  const xEndPos = padLeft + innerW;

  if (tickTop) {
    tickTop.textContent = formatChartPrice(maxV);
    tickTop.setAttribute("x", String(padLeft - 18));
    tickTop.setAttribute("y", String(yTop + 6));
  }
  if (tickMid) {
    tickMid.textContent = formatChartPrice((maxV + minV) / 2);
    tickMid.setAttribute("x", String(padLeft - 18));
    tickMid.setAttribute("y", String(yMid + 6));
  }
  if (tickBot) {
    tickBot.textContent = formatChartPrice(minV);
    tickBot.setAttribute("x", String(padLeft - 18));
    tickBot.setAttribute("y", String(yBot + 6));
  }

  for (const [el, yy] of [[gridTop, yTop], [gridMid, yMid], [gridBot, yBot]]) {
    if (el) {
      el.setAttribute("x1", String(padLeft));
      el.setAttribute("x2", String(xEndPos));
      el.setAttribute("y1", String(yy));
      el.setAttribute("y2", String(yy));
    }
  }
  if (axisX) {
    axisX.setAttribute("x1", String(padLeft));
    axisX.setAttribute("x2", String(xEndPos));
    axisX.setAttribute("y1", String(yBot));
    axisX.setAttribute("y2", String(yBot));
  }
  if (axisY) {
    axisY.setAttribute("x1", String(padLeft));
    axisY.setAttribute("x2", String(padLeft));
    axisY.setAttribute("y1", String(yTop));
    axisY.setAttribute("y2", String(yBot));
  }

  const firstDate = all[0]?.t;
  const midDate = all[Math.floor((all.length - 1) / 2)]?.t;
  const lastDate = all[all.length - 1]?.t;
  if (xStart) {
    xStart.textContent = firstDate ? fmtDateShort(firstDate) : t("start");
    xStart.setAttribute("x", String(xStartPos));
    xStart.setAttribute("y", String(yBot + 34));
  }
  if (xMid) {
    xMid.textContent = midDate ? fmtDateShort(midDate) : t("middle");
    xMid.setAttribute("x", String(xMidPos));
    xMid.setAttribute("y", String(yBot + 34));
  }
  if (xEnd) {
    xEnd.textContent = lastDate ? fmtDateShort(lastDate) : t("end");
    xEnd.setAttribute("x", String(xEndPos));
    xEnd.setAttribute("y", String(yBot + 34));
  }
}


function buildMiniChartSvg(series) {
  const values = (series || []).map(v => Number(v)).filter(v => Number.isFinite(v));
  if (!values.length) return "";

  const w = 520;
  const h = 170;
  const padX = 28;
  const padY = 20;
  const innerW = w - padX * 2;
  const innerH = h - padY * 2;

  let minV = Math.min(...values);
  let maxV = Math.max(...values);

  if (maxV - minV < 8) {
    const mid = (maxV + minV) / 2;
    minV = Math.max(0, mid - 6);
    maxV = Math.min(100, mid + 6);
  } else {
    minV = Math.max(0, minV - 3);
    maxV = Math.min(100, maxV + 3);
  }

  const points = values.map((v, i) => {
    const x = padX + (i / Math.max(1, values.length - 1)) * innerW;
    const y = padY + (1 - (v - minV) / Math.max(1, maxV - minV)) * innerH;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  const last = values[values.length - 1];

  return `
    <svg viewBox="0 0 520 170" class="report-mini-chart" preserveAspectRatio="none">
      <line x1="28" y1="20" x2="492" y2="20" class="report-grid-line"></line>
      <line x1="28" y1="85" x2="492" y2="85" class="report-grid-line"></line>
      <line x1="28" y1="150" x2="492" y2="150" class="report-grid-line"></line>

      <line x1="28" y1="20" x2="28" y2="150" class="report-axis-line"></line>
      <line x1="28" y1="150" x2="492" y2="150" class="report-axis-line"></line>

      <polyline points="${points}" class="report-mini-line"></polyline>
      <circle cx="${points.split(" ").slice(-1)[0].split(",")[0]}" cy="${points.split(" ").slice(-1)[0].split(",")[1]}" r="4.5" class="report-mini-dot"></circle>

      <text x="14" y="24" class="report-axis-text">${Math.round(maxV)}</text>
      <text x="14" y="89" class="report-axis-text">${Math.round((maxV + minV) / 2)}</text>
      <text x="14" y="154" class="report-axis-text">${Math.round(minV)}</text>

      <text x="260" y="166" text-anchor="middle" class="report-axis-text">${escapeHtml(t("axis_time"))}</text>
      <text x="40" y="18" class="report-axis-text">${escapeHtml(t("latest"))} ${last}</text>
    </svg>
  `;
}

function buildReportPriceChartSvg(historySeries = [], projectedSeries = [], ticker = selectedTicker, rangeOverride = currentRange) {
  const history = (historySeries || []).map((p) => ({ t: p?.t, close: Number(p?.close) })).filter((p) => Number.isFinite(p.close));
  const projected = (projectedSeries || []).map((p) => ({ t: p?.t, close: Number(p?.close) })).filter((p) => Number.isFinite(p.close));
  const all = [...history, ...projected];
  if (!all.length) {
    return `<div class="report-chart-empty">${escapeHtml(currentLang === "zh" ? "暂无图表数据。" : "No chart data yet.")}</div>`;
  }

  const w = 760;
  const h = 280;
  const padLeft = 72;
  const padRight = 30;
  const padTop = 26;
  const padBottom = 44;
  const innerW = w - padLeft - padRight;
  const innerH = h - padTop - padBottom;

  let minV = Math.min(...all.map((p) => p.close));
  let maxV = Math.max(...all.map((p) => p.close));
  const span = Math.max(1, maxV - minV);
  const padValue = Math.max(0.8, span * 0.12);
  minV = Math.max(0, minV - padValue);
  maxV = maxV + padValue;

  const totalPoints = Math.max(1, all.length - 1);
  const pointToXY = (point, idx) => {
    const x = padLeft + (idx / totalPoints) * innerW;
    const y = padTop + (1 - ((point.close - minV) / Math.max(1e-9, maxV - minV))) * innerH;
    return { x, y };
  };

  const histPts = history.map((p, i) => pointToXY(p, i));
  const projPts = projected.map((p, i) => pointToXY(p, history.length - 1 + i + 1));
  const histLine = histPts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const projLine = projected.length && histPts.length
    ? [histPts[histPts.length - 1], ...projPts].map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")
    : "";
  const latestPt = projPts[projPts.length - 1] || histPts[histPts.length - 1];
  const latestVal = projected[projected.length - 1]?.close ?? history[history.length - 1]?.close ?? 0;
  const histStart = history[0]?.t ? String(history[0].t).slice(0, 10) : "Start";
  const midSource = all[Math.floor((all.length - 1) / 2)]?.t ? String(all[Math.floor((all.length - 1) / 2)].t).slice(0, 10) : "Middle";
  const endSource = (projected[projected.length - 1]?.t || history[history.length - 1]?.t) ? String(projected[projected.length - 1]?.t || history[history.length - 1]?.t).slice(0, 10) : "End";
  const area = projected.length && histPts.length ? [
    `${histPts[histPts.length - 1].x.toFixed(1)},${(padTop + innerH).toFixed(1)}`,
    `${histPts[histPts.length - 1].x.toFixed(1)},${histPts[histPts.length - 1].y.toFixed(1)}`,
    ...projPts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`),
    `${projPts[projPts.length - 1].x.toFixed(1)},${(padTop + innerH).toFixed(1)}`,
  ].join(" ") : "";

  return `
    <div class="report-cover-chart-head">
      <div class="report-cover-chart-title">${escapeHtml(buildPreviewTickerLabel(ticker, rangeOverride))}</div>
      <div class="report-cover-chart-latest">${escapeHtml(t("latest"))} ${formatReportPrice(latestVal)}</div>
    </div>
    <svg viewBox="0 0 ${w} ${h}" class="report-cover-chart" preserveAspectRatio="xMidYMid meet" aria-label="report chart">
      <line x1="${padLeft}" y1="${padTop}" x2="${padLeft + innerW}" y2="${padTop}" class="report-grid-line"></line>
      <line x1="${padLeft}" y1="${padTop + innerH / 2}" x2="${padLeft + innerW}" y2="${padTop + innerH / 2}" class="report-grid-line"></line>
      <line x1="${padLeft}" y1="${padTop + innerH}" x2="${padLeft + innerW}" y2="${padTop + innerH}" class="report-grid-line"></line>
      <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop + innerH}" class="report-axis-line"></line>
      <line x1="${padLeft}" y1="${padTop + innerH}" x2="${padLeft + innerW}" y2="${padTop + innerH}" class="report-axis-line"></line>
      ${area ? `<polygon points="${area}" class="report-cover-proj-area"></polygon>` : ""}
      <polyline points="${histLine}" class="report-cover-hist-line"></polyline>
      ${projLine ? `<polyline points="${projLine}" class="report-cover-proj-line"></polyline>` : ""}
      ${latestPt ? `<circle cx="${latestPt.x.toFixed(1)}" cy="${latestPt.y.toFixed(1)}" r="6" class="report-cover-dot"></circle>` : ""}
      <text x="${padLeft - 12}" y="${padTop + 4}" text-anchor="end" class="report-axis-text">${formatReportPrice(maxV)}</text>
      <text x="${padLeft - 12}" y="${padTop + innerH / 2 + 4}" text-anchor="end" class="report-axis-text">${formatReportPrice((maxV + minV) / 2)}</text>
      <text x="${padLeft - 12}" y="${padTop + innerH + 4}" text-anchor="end" class="report-axis-text">${formatReportPrice(minV)}</text>
      <text x="${padLeft}" y="${h - 10}" text-anchor="start" class="report-axis-text">${escapeHtml(histStart)}</text>
      <text x="${padLeft + innerW / 2}" y="${h - 10}" text-anchor="middle" class="report-axis-text">${escapeHtml(midSource)}</text>
      <text x="${padLeft + innerW}" y="${h - 10}" text-anchor="end" class="report-axis-text">${escapeHtml(endSource)}</text>
    </svg>
  `;
}

function predictRisk(ticker) {
  ticker = (ticker || "").trim().toUpperCase();

  const base = STOCKS[ticker] || {};
  const baseScore = Number(base.score ?? 35);
  const conf = Number(base.conf ?? 76);
  const d7 = Number(base.d7 ?? -7);
  const level = base.level || deriveLevelFromScore(baseScore);
  const metrics = buildDefaultMetricsFromSeed(baseScore, d7);

  return {
    ticker,
    name: STOCKS[ticker]?.name || ticker,
    score: baseScore,
    conf,
    d7,
    level,
    rules: { high: 12, medLo: 6, medHi: 12, low: 6 },
    metrics,
    breakdown: metrics.breakdown,
    drivers: buildDriversFromMetrics(metrics, level),
    advice: "",
    series: Array(20).fill(baseScore),
    xMeta: null
  };
}

async function predictRiskOnline(ticker, range) {
  const pred = predictRisk(ticker);

  if (!STOCKS[pred.ticker]) {
    STOCKS[pred.ticker] = {
      ticker: pred.ticker,
      name: pred.name,
      level: pred.level,
      score: pred.score,
      conf: pred.conf,
      d7: pred.d7
    };
  }

  try {
    const hist = await fetchHistory(pred.ticker, range);
    const closes = (hist.series || []).map(p => Number(p.close)).filter(v => Number.isFinite(v));

    if (closes.length >= 3) {
      pred.series = computeRiskSeriesFromCloses(closes);
      pred.score = pred.series[pred.series.length - 1];
      pred.level = deriveLevelFromScore(pred.score);

      const lastIdx = closes.length - 1;
      const baseIdx = Math.max(0, lastIdx - 5);
      const latestClose = closes[lastIdx];
      const baseClose = closes[baseIdx];

      if (Number.isFinite(latestClose) && Number.isFinite(baseClose) && baseClose !== 0) {
        pred.d7 = Number((((latestClose - baseClose) / baseClose) * 100).toFixed(1));
      }

      pred.xMeta = {
        start: hist.series?.[0]?.t,
        mid: hist.series?.[Math.floor((hist.series?.length || 1) / 2)]?.t,
        end: hist.series?.[hist.series.length - 1]?.t
      };

      pred.historySeries = hist.series || [];
      pred.projectedSeries = buildProjectedSeriesFromHistory(hist.series || [], pred.ticker, range, currentForecastDays);
      pred.metrics = buildDynamicAnalyticsFromHistory(hist.series || [], pred.d7);
      pred.breakdown = pred.metrics.breakdown;
      pred.conf = computeConfidenceFromHistory(closes.length, pred.metrics);
      pred.drivers = buildDriversFromMetrics(pred.metrics, pred.level);
    } else {
      pred.historySeries = [];
      pred.projectedSeries = [];
      pred.metrics = buildDefaultMetricsFromSeed(pred.score, pred.d7);
      pred.breakdown = pred.metrics.breakdown;
      pred.drivers = buildDriversFromMetrics(pred.metrics, pred.level);
    }
  } catch (e) {
    console.warn("Online history failed:", e?.message || e);
    pred.historySeries = [];
    pred.projectedSeries = [];
    pred.metrics = buildDefaultMetricsFromSeed(pred.score, pred.d7);
    pred.breakdown = pred.metrics.breakdown;
    pred.drivers = buildDriversFromMetrics(pred.metrics, pred.level);
  }

  pred.advice = buildActionAdvice(pred);
  return applySettingsContextToPrediction(pred);
}

function renderDriversPanel(pred) {
  const wrap = document.getElementById("s2DriversList");
  if (!wrap) return;

  wrap.innerHTML = (pred.drivers || []).map(txt => `
    <div class="driver">${escapeHtml(txt)}</div>
  `).join("");
}

function renderBreakdownAndMetrics(pred) {
  const bd = pred?.metrics?.breakdown || pred?.breakdown || { market: 35, drawdown: 30, vol: 25, liq: 10 };
  const m = pred?.metrics || {};

  const set = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  set("bdMarketVal", `${Math.round(bd.market)}%`);
  set("bdDrawdownVal", `${Math.round(bd.drawdown)}%`);
  set("bdVolVal", `${Math.round(bd.vol)}%`);
  set("bdLiqVal", `${Math.round(bd.liq)}%`);

  set("metricVol20Val", `${Math.round(Number(m.vol20 || 0))}%`);
  set("metricVol60Val", `${Math.round(Number(m.vol60 || 0))}%`);
  set("metricMdd6mVal", `${Number(m.mdd6m || 0).toFixed(1)}%`);
  set("metricBetaVal", Number(m.beta || 0).toFixed(2));
  set("metricVolChgVal", `${Number(m.volChgPct || 0) >= 0 ? "↑" : "↓"} ${Math.abs(Number(m.volChgPct || 0)).toFixed(0)}%`);

  const volChgEl = document.getElementById("metricVolChgVal");
  if (volChgEl) {
    volChgEl.classList.remove("pos", "neg", "neu");
    if (Number(m.volChgPct || 0) > 0) volChgEl.classList.add("pos");
    else if (Number(m.volChgPct || 0) < 0) volChgEl.classList.add("neg");
    else volChgEl.classList.add("neu");
  }
}

function applyPrediction(pred) {
  if (!STOCKS[pred.ticker]) {
    STOCKS[pred.ticker] = {
      ticker: pred.ticker,
      name: pred.name,
      level: pred.level,
      score: pred.score,
      conf: pred.conf,
      d7: pred.d7
    };
  } else {
    STOCKS[pred.ticker].name = STOCKS[pred.ticker].name || pred.name || pred.ticker;
    STOCKS[pred.ticker].level = pred.level;
    STOCKS[pred.ticker].score = pred.score;
    STOCKS[pred.ticker].conf = pred.conf;
    STOCKS[pred.ticker].d7 = pred.d7;
  }

  selectedTicker = pred.ticker;

  const kpiLevel = document.getElementById("kpiLevel");
  if (kpiLevel) {
    kpiLevel.className = `kpi-value badge ${levelToBadgeClass(pred.level)}`;
    kpiLevel.textContent = levelToText(pred.level);
  }

  const kpiScore = document.getElementById("kpiScore");
  if (kpiScore) kpiScore.textContent = String(pred.score);

  const kpiConf = document.getElementById("kpiConf");
  if (kpiConf) kpiConf.textContent = `${pred.conf}%`;

  const kpiUpdate = document.getElementById("kpiUpdate");
  if (kpiUpdate) kpiUpdate.textContent = new Date().toLocaleString();

  const shownName = STOCKS[pred.ticker]?.name || pred.name || pred.ticker;

  const s1Selected = document.getElementById("s1Selected");
  if (s1Selected) s1Selected.textContent = `${pred.ticker} — ${shownName}`;

  const s1Badge = document.getElementById("s1Badge");
  if (s1Badge) {
    s1Badge.className = `badge ${levelToBadgeClass(pred.level)}`;
    s1Badge.textContent = levelToText(pred.level);
  }

  const s1D7 = document.getElementById("s1D7");
  if (s1D7) {
    s1D7.textContent = fmt7d(pred.d7);
    setNumColor(s1D7, pred.d7);
  }

  const s1Explain = document.getElementById("s1Explain");
  if (s1Explain) s1Explain.textContent = buildSummaryText(pred);

  const s2HeaderStock = document.getElementById("s2HeaderStock");
  if (s2HeaderStock) s2HeaderStock.textContent = `${pred.ticker} — ${shownName}`;

  const s2Level = document.getElementById("s2Level");
  if (s2Level) {
    s2Level.className = `v badge ${levelToBadgeClass(pred.level)}`;
    s2Level.textContent = levelToText(pred.level);
  }

  const s2Score = document.getElementById("s2Score");
  if (s2Score) s2Score.textContent = String(pred.score);

  const s2Conf = document.getElementById("s2Conf");
  if (s2Conf) s2Conf.textContent = `${pred.conf}%`;

  const s2D7 = document.getElementById("s2D7");
  if (s2D7) {
    s2D7.textContent = fmt7d(pred.d7);
    setNumColor(s2D7, pred.d7);
  }

  const s2Meaning = document.getElementById("s2Meaning");
  if (s2Meaning) s2Meaning.textContent = buildSummaryText(pred);

  renderDriversPanel(pred);
  renderBreakdownAndMetrics(pred);

  const s1RangeLabel = document.getElementById("s1RangeLabel");
  if (s1RangeLabel) s1RangeLabel.textContent = `${t("range_label")} ${currentRange}`;

  const s2RangeLabel = document.getElementById("s2RangeLabel");
  if (s2RangeLabel) s2RangeLabel.textContent = `${t("range_label")} ${currentRange}`;

  drawTrendChart("s1", pred.historySeries || [], pred.projectedSeries || [], pred.ticker);
  drawTrendChart("s2", pred.historySeries || [], pred.projectedSeries || [], pred.ticker);

  renderWatchlist();
  renderCompare();
  if (
    lastForecastResult &&
    String(lastForecastResult.ticker || "").toUpperCase() === String(pred.ticker || "").toUpperCase() &&
    String(lastForecastResult.range || currentRange).toUpperCase() === String(currentRange).toUpperCase()
  ) {
    renderForecastCard(lastForecastResult);
  }
}

function switchView(viewName) {
  document.querySelectorAll(".tab").forEach(tbtn => {
    tbtn.classList.toggle("active", tbtn.dataset.view === viewName);
  });

  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  const el = document.getElementById(`view-${viewName}`);
  if (el) el.classList.add("active");

  if (viewName === "watchlist") renderWatchlist();
  if (viewName === "compare") renderCompare();
  if (viewName === "reports") initReportsDropdown();
}

function renderWatchlist() {
  const grid = document.getElementById("watchlistGrid");
  if (!grid) return;

  const q = (document.getElementById("wlSearch")?.value || "").trim().toLowerCase();
  const risk = document.getElementById("wlRiskSelect")?.value || "ALL";

  const items = watchlist
    .map(ticker => ensureStockEntry(ticker))
    .filter(Boolean)
    .filter(s => {
      const hit = `${s.ticker} ${s.name}`.toLowerCase().includes(q);
      const riskOk = risk === "ALL" || risk === s.level;
      return hit && riskOk;
    });

  grid.innerHTML = "";

  items.forEach((s) => {
    const card = document.createElement("div");
    card.className = "wcard";
    const d7Class = s.d7 > 0 ? "pos" : s.d7 < 0 ? "neg" : "neu";
    const alertState = getAlertStateForPrediction(s);
    const alertHtml = alertState.enabled
      ? `<div class="w-alert"><span class="muted">${currentLang === "zh" ? "提醒" : "Alert"}:</span> <span class="report-chip ${alertState.triggered ? "high" : "low"}">${escapeHtml(alertState.triggered ? t("rep_triggered") : t("rep_clear"))}</span></div>`
      : `<div class="w-alert"><span class="muted">${currentLang === "zh" ? "提醒" : "Alert"}:</span> <span class="report-chip off">${escapeHtml(t("rep_off"))}</span></div>`;

    card.innerHTML = `
      <div class="w-top">
        <div>
          <div class="w-name">${escapeHtml(s.ticker)}</div>
          <div class="w-sub">${escapeHtml(s.name)}</div>
        </div>
        <div class="badge ${levelToBadgeClass(s.level)}">${levelToText(s.level)}</div>
      </div>

      <div class="w-mid">
        <div><span class="muted">${currentLang === "zh" ? "评分" : "Score"}:</span> <b>${safeText(s.score, 0)}</b></div>
        <div><span class="muted">7D:</span> <b class="num ${d7Class}">${fmt7d(s.d7)}</b></div>
        ${alertHtml}
      </div>

      <div class="w-actions">
        <button class="btn primary" data-action="details" data-ticker="${escapeHtml(s.ticker)}">${currentLang === "zh" ? "查看详情" : "View Details"}</button>
        <button class="btn" data-action="remove" data-ticker="${escapeHtml(s.ticker)}">${t("btn_remove")}</button>
      </div>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll("button[data-action]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const action = btn.dataset.action;
      const ticker = btn.dataset.ticker;

      if (action === "details") {
        selectedTicker = ticker;
        const pred = await predictRiskOnline(ticker, currentRange);
        applyPrediction(pred);
        const searchInput = document.getElementById("s1Search");
        if (searchInput) searchInput.value = ticker;
        await requestAndRenderForecast(ticker, currentRange, currentForecastDays);
        switchView("detail");
      }

      if (action === "remove") {
        watchlist = watchlist.filter(t => t !== ticker);
        persistCollections();
        renderWatchlist();
      }
    });
  });
}

function renderCompareRanking() {
  const box = document.getElementById("cmpRankingChart");
  if (!box) return;

  const items = compareList
    .map(ticker => ensureStockEntry(ticker))
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);

  if (!items.length) {
    box.innerHTML = `<div class="muted">${currentLang === "zh" ? "暂无数据" : "No data"}</div>`;
    return;
  }

  box.innerHTML = items.map(s => `
    <div class="cmp-rank-row">
      <div class="cmp-rank-name">${escapeHtml(s.ticker)}</div>
      <div class="cmp-rank-bar-wrap">
        <div class="cmp-rank-bar" style="width:${Math.max(4, Number(s.score) || 0)}%"></div>
      </div>
      <div class="cmp-rank-score">${safeText(s.score, 0)}</div>
    </div>
  `).join("");
}

function renderCompareTrend() {
  const linesGroup = document.getElementById("cmpTrendLines");
  const dotsGroup = document.getElementById("cmpTrendDots");
  const labelsGroup = document.getElementById("cmpTrendLabels");
  if (!linesGroup || !dotsGroup || !labelsGroup) return;

  linesGroup.innerHTML = "";
  dotsGroup.innerHTML = "";
  labelsGroup.innerHTML = "";

  const items = compareList.map(ticker => ensureStockEntry(ticker)).filter(Boolean);
  if (!items.length) return;

  const labels = getCompareXLabels(currentRange);
  const xStartEl = document.getElementById("cmpXStart");
  const xMidEl = document.getElementById("cmpXMid");
  const xEndEl = document.getElementById("cmpXEnd");
  if (xStartEl) xStartEl.textContent = labels.start;
  if (xMidEl) xMidEl.textContent = labels.mid;
  if (xEndEl) xEndEl.textContent = labels.end;

  const colors = [
    "rgba(255,255,255,0.92)",
    "rgba(90,255,160,0.95)",
    "rgba(255,90,120,0.95)",
    "rgba(120,180,255,0.95)",
    "rgba(255,210,90,0.95)",
    "rgba(190,140,255,0.95)"
  ];

  const left = 70;
  const right = 580;
  const top = 40;
  const bottom = 220;
  const width = right - left;
  const height = bottom - top;

  const endLabels = [];

  items.forEach((s, idx) => {
    const series = buildCompareSeries(s);
    const pts = series.map((v, i) => {
      const x = left + (i / Math.max(1, series.length - 1)) * width;
      const y = bottom - (v / 100) * height;
      return { x, y, v };
    });

    const poly = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    poly.setAttribute("points", pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" "));
    poly.setAttribute("class", "cmp-trend-line");
    poly.setAttribute("stroke", colors[idx % colors.length]);
    linesGroup.appendChild(poly);

    pts.forEach((p, pointIdx) => {
      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("cx", p.x.toFixed(1));
      dot.setAttribute("cy", p.y.toFixed(1));
      dot.setAttribute("r", pointIdx === pts.length - 1 ? "4.5" : "3");
      dot.setAttribute("fill", colors[idx % colors.length]);
      dotsGroup.appendChild(dot);
    });

    const last = pts[pts.length - 1];
    endLabels.push({
      ticker: s.ticker,
      y: last.y,
      color: colors[idx % colors.length]
    });
  });

  endLabels.sort((a, b) => a.y - b.y);

  const minGap = 18;
  for (let i = 1; i < endLabels.length; i++) {
    if (endLabels[i].y - endLabels[i - 1].y < minGap) {
      endLabels[i].y = endLabels[i - 1].y + minGap;
    }
  }

  endLabels.forEach(lbl => {
    const connector = document.createElementNS("http://www.w3.org/2000/svg", "line");
    connector.setAttribute("x1", "580");
    connector.setAttribute("y1", lbl.y.toFixed(1));
    connector.setAttribute("x2", "592");
    connector.setAttribute("y2", lbl.y.toFixed(1));
    connector.setAttribute("stroke", lbl.color);
    connector.setAttribute("stroke-width", "1.5");
    labelsGroup.appendChild(connector);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", "596");
    text.setAttribute("y", (lbl.y + 4).toFixed(1));
    text.setAttribute("class", "cmp-trend-label");
    text.setAttribute("fill", lbl.color);
    text.textContent = lbl.ticker;
    labelsGroup.appendChild(text);
  });
}

function removeCompareTicker(ticker) {
  const cleanTicker = String(ticker || "").trim().toUpperCase();
  if (!cleanTicker) return;
  compareList = compareList.filter((item) => String(item || "").trim().toUpperCase() !== cleanTicker);
  persistCollections();
  renderCompare();
}

function renderCompare() {
  const box = document.getElementById("compareTable");
  if (!box) return;

  compareList = ensureUnique(compareList).map(ticker => String(ticker || "").trim().toUpperCase()).filter(Boolean);
  compareList.forEach(ensureStockEntry);

  if (!compareList.length) {
    box.innerHTML = `<div class="muted">${currentLang === "zh" ? "未选择股票。" : "No stocks selected."}</div>`;
    renderCompareRanking();
    renderCompareTrend();
    return;
  }

  box.innerHTML = compareList.map((ticker) => {
    const s = STOCKS[ticker];
    const d7Class = s.d7 > 0 ? "pos" : s.d7 < 0 ? "neg" : "neu";

    return `
      <div class="compare-item">
        <strong>${escapeHtml(s.ticker)}</strong>
        <div class="muted">${escapeHtml(s.name)}</div>
        <div class="badge ${levelToBadgeClass(s.level)}">${levelToText(s.level)}</div>
        <div><span class="muted">${currentLang === "zh" ? "评分" : "Score"}:</span> <b>${safeText(s.score, 0)}</b></div>
        <div><span class="muted">${currentLang === "zh" ? "置信度" : "Confidence"}:</span> <b>${safeText(s.conf, 0)}%</b></div>
        <div><span class="muted">7D:</span> <b class="num ${d7Class}">${fmt7d(s.d7)}</b></div>
        <div class="cmp-actions">
          <button class="btn primary cmpDetails" data-ticker="${escapeHtml(s.ticker)}">${currentLang === "zh" ? "查看详情" : "View Details"}</button>
          <button class="btn cmpRemove" data-ticker="${escapeHtml(s.ticker)}">${currentLang === "zh" ? "删除" : "Remove"}</button>
        </div>
      </div>
    `;
  }).join("");

  box.querySelectorAll(".cmpDetails").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const ticker = btn.dataset.ticker;
      const pred = await predictRiskOnline(ticker, currentRange);
      applyPrediction(pred);
      switchView("detail");
    });
  });

  box.querySelectorAll(".cmpRemove").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeCompareTicker(btn.dataset.ticker);
    });
  });

  renderCompareRanking();
  renderCompareTrend();
}

function initReportsDropdown() {
  const sel = document.getElementById("repTicker");
  if (!sel) return;

  sel.innerHTML = Object.keys(STOCKS)
    .sort()
    .map((ticker) => `<option value="${escapeHtml(ticker)}">${escapeHtml(ticker)} — ${escapeHtml(STOCKS[ticker].name)}</option>`)
    .join("");

  sel.value = selectedTicker || "AAPL";

  const repRange = document.getElementById("repRange");
  if (repRange) repRange.value = currentRange;
}

function formatReportPrice(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '-';
  return num.toFixed(num >= 100 ? 1 : 2);
}

function buildRealtimeReportSidebarData(pred, rangeOverride = currentRange) {
  const historySummary = buildHistorySummary(pred.historySeries || []);
  const latestClose = Number(historySummary.endPrice);
  const projectionSummary = buildProjectionSummary(pred.projectedSeries || [], latestClose);
  const targetPrice = Number(projectionSummary?.endPrice || latestClose || 0);
  const projectedMove = Number(projectionSummary?.priceChangePct || 0);
  const recentCloses = (pred.historySeries || []).slice(-Math.min(20, (pred.historySeries || []).length)).map(p => Number(p.close)).filter(Number.isFinite);
  const support = recentCloses.length ? Math.min(...recentCloses) : latestClose;
  const resistance = recentCloses.length ? Math.max(...recentCloses) : latestClose;
  const amplitudePct = recentCloses.length >= 2 && recentCloses[0] !== 0 ? pctChange(Math.min(...recentCloses), Math.max(...recentCloses)) : 0;
  const momentum20 = Number(pred?.metrics?.momentum20 || 0);
  const vol20 = Number(pred?.metrics?.vol20 || 0);
  const trendText = currentLang === 'zh'
    ? projectedMove > 1.2 ? '短线预计延续偏强走势。' : projectedMove < -1.2 ? '短线预计继续承压。' : '短线预计以震荡整理为主。'
    : projectedMove > 1.2 ? 'Near-term trend still leans upward.' : projectedMove < -1.2 ? 'Near-term trend still leans downward.' : 'Near-term trend remains broadly sideways.';
  const momentumText = currentLang === 'zh'
    ? `20日动量 ${momentum20 >= 0 ? '偏正' : '偏负'}，20日年化波动约 ${Math.round(vol20)}%。`
    : `20D momentum is ${momentum20 >= 0 ? 'positive' : 'negative'}, with 20D annualized vol near ${Math.round(vol20)}%.`;
  const targetDirection = localizedForecastDirection(projectedMove > 1.2 ? 'Bullish' : projectedMove < -1.2 ? 'Bearish' : 'Sideways');
  return {
    latestClose,
    historySummary,
    projectionSummary,
    targetPrice,
    projectedMove,
    support,
    resistance,
    amplitudePct: Number(amplitudePct.toFixed(1)),
    trendText,
    momentumText,
    targetDirection,
    rangeOverride
  };
}

async function buildReportPreview(ticker, rangeOverride = currentRange) {
  const pred = await predictRiskOnline(ticker, rangeOverride);
  const ck = (id) => document.getElementById(id)?.checked;
  const chartSvg = buildReportPriceChartSvg(pred.historySeries || [], pred.projectedSeries || [], pred.ticker, rangeOverride);
  const riskSvg = buildMiniChartSvg(pred.series);
  const includedSections = getIncludedReportSections();
  const alertState = getAlertStateForPrediction(pred);
  const newsPack = pred.settingContext?.newsPack || buildNewsInsightPack(ticker, pred);
  const syncText = document.getElementById("setSync")?.textContent || new Date().toLocaleString();
  const statusChipClass = alertState.triggered ? "high" : "low";
  const sidebarData = buildRealtimeReportSidebarData(pred, rangeOverride);

  const parts = [];

  if (ck("repCkSummary")) {
    parts.push(`
      <div class="pblock">
        <b>1) ${escapeHtml(t("rep_exec"))}</b>
        <ul>
          <li>${currentLang === "zh" ? "风险等级" : "Risk Level"}: ${escapeHtml(levelToText(pred.level))}</li>
          <li>${currentLang === "zh" ? "风险评分" : "Risk Score"}: ${pred.score} / 100</li>
          <li>${currentLang === "zh" ? "置信度" : "Confidence"}: ${pred.conf}%</li>
          <li>7D: ${fmt7d(pred.d7)}</li>
          <li>${escapeHtml(t("rep_rec"))}: ${escapeHtml(pred.advice)}</li>
        </ul>
      </div>
    `);
  }

  if (ck("repCkDrivers")) {
    parts.push(`
      <div class="pblock">
        <b>2) ${escapeHtml(t("rep_drivers"))}</b>
        <div class="report-driver-list">
          ${(pred.drivers || []).map(d => `<div class="report-driver-item">${escapeHtml(d)}</div>`).join("")}
        </div>
      </div>
    `);
  }

  if (ck("repCkMetrics")) {
    parts.push(`
      <div class="pblock">
        <b>3) ${escapeHtml(t("rep_metrics"))}</b>
        <div class="report-metrics">
          <div>${currentLang === "zh" ? "规则" : "Rules"}：${levelToText("HIGH")} > ${pred.rules.high}%，${levelToText("MEDIUM")} ${pred.rules.medLo}%–${pred.rules.medHi}%，${levelToText("LOW")} < ${pred.rules.low}%</div>
          <div>20D vol: ${Math.round(pred.metrics?.vol20 || 0)}%</div>
          <div>60D vol: ${Math.round(pred.metrics?.vol60 || 0)}%</div>
          <div>6M MDD: ${(pred.metrics?.mdd6m || 0).toFixed(1)}%</div>
          <div>Beta: ${(pred.metrics?.beta || 0).toFixed(2)}</div>
          <div>${escapeHtml(t("metric_volchg"))}: ${Number(pred.metrics?.volChgPct || 0) >= 0 ? "↑" : "↓"} ${Math.abs(Number(pred.metrics?.volChgPct || 0)).toFixed(0)}%</div>
        </div>
      </div>
    `);
  }

  if (ck("repCkCharts")) {
    parts.push(`
      <div class="pblock">
        <b>4) ${escapeHtml(t("rep_charts"))}</b>
        <div class="report-chart-wrap">
          <div class="report-chart-title">${escapeHtml(currentLang === "zh" ? "风险评分迷你图" : "Mini risk score chart")}</div>
          ${riskSvg}
        </div>
      </div>
    `);
  }

  if (ck("repCkDisclaimer")) {
    parts.push(`
      <div class="pblock">
        <b>5) ${escapeHtml(t("rep_disclaimer"))}</b>
        <div class="muted">
          ${currentLang === "zh" ? "仅用于学习展示，不构成投资建议。" : "For educational use only. Not financial advice."}
        </div>
      </div>
    `);
  }

  return `
    <div class="report-two-col">
      <div class="report-main">
        <div class="pblock report-cover-card">
          <div class="report-cover-top">
            <div>
              <div class="report-cover-for"><b>${escapeHtml(t("rep_report_for"))}</b></div>
              <div class="report-cover-name">${escapeHtml(pred.ticker)} — ${escapeHtml(STOCKS[pred.ticker]?.name || pred.name)}</div>
            </div>
            <div class="report-cover-meta">${escapeHtml(currentLang === "zh" ? `范围：${rangeOverride}` : `Range: ${rangeOverride}`)}</div>
          </div>
          ${ck("repCkCharts") ? `<div class="report-cover-chart-wrap">${chartSvg}</div>` : `<div class="report-cover-placeholder">${escapeHtml(currentLang === "zh" ? "已关闭图表部分；重新勾选“图表”即可显示价格趋势与预测图。" : "Charts are hidden. Re-enable the Charts section to show the price trend and forecast image.")}</div>`}
        </div>
        ${parts.join("")}
      </div>

      <aside class="report-side">
        <div class="report-side-card">
          <div class="report-side-title">${escapeHtml(currentLang === "zh" ? "实时摘要" : "Live Summary")}</div>
          <div class="report-side-text">
            ${escapeHtml(sidebarData.trendText)}
          </div>
          <div class="report-side-block muted">${escapeHtml(sidebarData.momentumText)}</div>
          <div class="report-side-block muted">${escapeHtml(currentLang === "zh" ? `已按 ${pred.ticker} + ${rangeOverride} 重新生成右侧状态。` : `Sidebar refreshed for ${pred.ticker} + ${rangeOverride}.`)}</div>
        </div>

        <div class="report-side-card">
          <div class="report-side-title">${escapeHtml(t("rep_quick"))}</div>
          <div class="report-side-text report-side-kv">
            <div class="report-side-row"><span class="report-side-label">Ticker</span><span class="report-side-value">${escapeHtml(pred.ticker)}</span></div>
            <div class="report-side-row"><span class="report-side-label">${escapeHtml(currentLang === "zh" ? "等级" : "Level")}</span><span class="report-side-value">${escapeHtml(levelToText(pred.level))}</span></div>
            <div class="report-side-row"><span class="report-side-label">${escapeHtml(currentLang === "zh" ? "评分" : "Score")}</span><span class="report-side-value">${pred.score}</span></div>
            <div class="report-side-row"><span class="report-side-label">${escapeHtml(currentLang === "zh" ? "置信度" : "Confidence")}</span><span class="report-side-value">${pred.conf}%</span></div>
            <div class="report-side-row"><span class="report-side-label">${escapeHtml(currentLang === "zh" ? "范围" : "Range")}</span><span class="report-side-value">${escapeHtml(rangeOverride)}</span></div>
            <div class="report-side-row"><span class="report-side-label">7D</span><span class="report-side-value ${pred.d7 > 0 ? "pos" : pred.d7 < 0 ? "neg" : "neu"}">${fmt7d(pred.d7)}</span></div>
          </div>
          <div class="report-side-block report-advice"><span class="muted">${escapeHtml(t("rep_rec"))}:</span> ${escapeHtml(pred.advice)}</div>
        </div>

        <div class="report-side-card">
          <div class="report-side-title">${escapeHtml(currentLang === "zh" ? "价格状态" : "Price Status")}</div>
          <div class="report-side-text report-side-kv">
            <div class="report-side-row"><span class="report-side-label">${escapeHtml(currentLang === "zh" ? "最新价" : "Latest")}</span><span class="report-side-value">${formatReportPrice(sidebarData.latestClose)}</span></div>
            <div class="report-side-row"><span class="report-side-label">${escapeHtml(currentLang === "zh" ? "区间起点" : "Range Start")}</span><span class="report-side-value">${formatReportPrice(sidebarData.historySummary.startPrice)}</span></div>
            <div class="report-side-row"><span class="report-side-label">${escapeHtml(currentLang === "zh" ? "区间终点" : "Range End")}</span><span class="report-side-value">${formatReportPrice(sidebarData.historySummary.endPrice)}</span></div>
            <div class="report-side-row"><span class="report-side-label">${escapeHtml(currentLang === "zh" ? "区间涨跌" : "Range Change")}</span><span class="report-side-value ${Number(sidebarData.historySummary.priceChangePct || 0) > 0 ? "pos" : Number(sidebarData.historySummary.priceChangePct || 0) < 0 ? "neg" : "neu"}">${fmtSignedPct(Number(sidebarData.historySummary.priceChangePct || 0), 1)}</span></div>
            <div class="report-side-row"><span class="report-side-label">${escapeHtml(currentLang === "zh" ? "区间最高" : "Range High")}</span><span class="report-side-value">${formatReportPrice(sidebarData.historySummary.highestPrice)}</span></div>
            <div class="report-side-row"><span class="report-side-label">${escapeHtml(currentLang === "zh" ? "区间最低" : "Range Low")}</span><span class="report-side-value">${formatReportPrice(sidebarData.historySummary.lowestPrice)}</span></div>
          </div>
          <div class="report-side-block muted">${escapeHtml(currentLang === "zh" ? `该区间共 ${sidebarData.historySummary.totalDataDays} 个数据点，振幅约 ${sidebarData.amplitudePct}% 。` : `${sidebarData.historySummary.totalDataDays} points in this range, with a swing of about ${sidebarData.amplitudePct}%.`)}</div>
        </div>

        <div class="report-side-card">
          <div class="report-side-title">${escapeHtml(currentLang === "zh" ? "预测状态" : "Forecast Status")}</div>
          <div class="report-side-text report-side-kv">
            <div class="report-side-row"><span class="report-side-label">${escapeHtml(currentLang === "zh" ? "预测方向" : "Direction")}</span><span class="report-side-value">${escapeHtml(sidebarData.targetDirection)}</span></div>
            <div class="report-side-row"><span class="report-side-label">${escapeHtml(currentLang === "zh" ? "目标价" : "Target Price")}</span><span class="report-side-value">${formatReportPrice(sidebarData.targetPrice)}</span></div>
            <div class="report-side-row"><span class="report-side-label">${escapeHtml(currentLang === "zh" ? "预期涨跌" : "Projected Move")}</span><span class="report-side-value ${sidebarData.projectedMove > 0 ? "pos" : sidebarData.projectedMove < 0 ? "neg" : "neu"}">${fmtSignedPct(sidebarData.projectedMove, 1)}</span></div>
            <div class="report-side-row"><span class="report-side-label">${escapeHtml(currentLang === "zh" ? "短线支撑" : "Support")}</span><span class="report-side-value">${formatReportPrice(sidebarData.support)}</span></div>
            <div class="report-side-row"><span class="report-side-label">${escapeHtml(currentLang === "zh" ? "短线阻力" : "Resistance")}</span><span class="report-side-value">${formatReportPrice(sidebarData.resistance)}</span></div>
            <div class="report-side-row"><span class="report-side-label">${escapeHtml(currentLang === "zh" ? "预测天数" : "Forecast Days")}</span><span class="report-side-value">${currentLang === "zh" ? `${currentForecastDays}天` : `${currentForecastDays}D`}</span></div>
          </div>
          <div class="report-side-block muted">${escapeHtml(currentLang === "zh" ? `该预测会随着股票、时间范围和预测天数变化而更新。` : `This forecast updates when the ticker, range, or forecast horizon changes.`)}</div>
        </div>

        <div class="report-side-card">
          <div class="report-side-title">${escapeHtml(t("rep_status"))}</div>
          <div class="report-side-text report-side-kv">
            <div class="report-side-row"><span class="report-side-label">${escapeHtml(t("rep_data_mode_status"))}</span><span class="report-side-value">${escapeHtml(getDataSourceLabel())}</span></div>
            <div class="report-side-row"><span class="report-side-label">${escapeHtml(t("rep_freq_status"))}</span><span class="report-side-value">${escapeHtml(getUpdateFrequencyLabel())}</span></div>
            <div class="report-side-row"><span class="report-side-label">${escapeHtml(t("rep_alerts_status"))}</span><span class="report-side-value"><span class="report-chip ${uiSettings.alertsOn ? "on" : "off"}">${escapeHtml(uiSettings.alertsOn ? t("rep_on") : t("rep_off"))}</span></span></div>
            <div class="report-side-row"><span class="report-side-label">${escapeHtml(t("rep_threshold_status"))}</span><span class="report-side-value">${uiSettings.scoreTh}</span></div>
            <div class="report-side-row"><span class="report-side-label">${escapeHtml(t("rep_alert_state"))}</span><span class="report-side-value"><span class="report-chip ${statusChipClass}">${escapeHtml(alertState.triggered ? t("rep_triggered") : t("rep_clear"))}</span></span></div>
            <div class="report-side-row"><span class="report-side-label">${escapeHtml(t("rep_sync_status"))}</span><span class="report-side-value">${escapeHtml(syncText)}</span></div>
          </div>
          <div class="report-side-block muted">${escapeHtml(alertState.reason)}</div>
        </div>

        <div class="report-side-card">
          <div class="report-side-title">${escapeHtml(t("rep_signal"))}</div>
          <div class="report-side-text">
            <div><span class="report-chip ${newsPack.sentimentKey === "pos" ? "low" : newsPack.sentimentKey === "neg" ? "high" : "medium"}">${escapeHtml(newsPack.sentiment)}</span></div>
            <div class="report-side-block">${escapeHtml(uiSettings.dataSource === "price_news" ? t("rep_signal_news") : t("rep_signal_price"))}</div>
            <div class="report-side-block muted">${escapeHtml(newsPack.summary)}</div>
            <div class="report-news-list">
              ${newsPack.headlines.map(item => `<div class="report-news-item">${escapeHtml(item)}</div>`).join("")}
            </div>
          </div>
        </div>
      </aside>
    </div>
  `;
}

async function rerenderReportIfGenerated() {
  const reportPreview = document.getElementById("reportPreview");
  if (!reportPreview?.dataset || reportPreview.dataset.generated !== "1") return;
  const ticker = document.getElementById("repTicker")?.value || selectedTicker;
  const repRange = document.getElementById("repRange")?.value || currentRange;
  reportPreview.innerHTML = await buildReportPreview(ticker, repRange);
  reportPreview.dataset.generated = "1";
}

function openReportPrintWindow(reportHtml, titleText) {
  const printWindow = window.open("", "_blank", "width=1100,height=900");
  if (!printWindow) {
    alert(currentLang === "zh" ? "浏览器阻止了新窗口，请允许弹窗后再导出 PDF。" : "Your browser blocked the new window. Please allow pop-ups and try again.");
    return;
  }
  const stylesheetHref = new URL("./styles.css", window.location.href).href;
  printWindow.document.write(`<!doctype html>
<html lang="${currentLang === "zh" ? "zh-CN" : "en"}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(titleText)}</title>
<link rel="stylesheet" href="${stylesheetHref}">
<style>
  body { background: #fff !important; color: #111827 !important; margin: 0; padding: 20px; }
  .report-print-shell { max-width: 1100px; margin: 0 auto; }
  .report-print-title { font-size: 28px; font-weight: 800; margin: 0 0 16px; color: #111827; }
  .report-print-meta { margin: 0 0 18px; color: #4b5563; }
  .report-two-col { display: block !important; }
  .report-side { margin-top: 18px; }
  .pblock, .report-side-card { break-inside: avoid; page-break-inside: avoid; background: #fff !important; border-color: #d1d5db !important; }
  .report-mini-chart, .report-cover-chart { background: #fff !important; }
  .report-grid-line { stroke: #d1d5db !important; }
  .report-axis-line { stroke: #6b7280 !important; }
  .report-axis-text, .report-side-label, .muted { color: #4b5563 !important; fill: #4b5563 !important; }
  .report-mini-line, .report-cover-hist-line { stroke: #2563eb !important; }
  .report-mini-dot, .report-cover-dot { fill: #2563eb !important; }
  .report-cover-proj-line { stroke: #ef4444 !important; }
  .report-cover-proj-area { fill: rgba(239,68,68,0.10) !important; }
  @media print { body { padding: 0; } }
</style>
</head>
<body>
  <div class="report-print-shell">
    <div class="report-print-title">${escapeHtml(titleText)}</div>
    <div class="report-print-meta">${escapeHtml(currentLang === "zh" ? "导出时间：" : "Export time: ")} ${escapeHtml(new Date().toLocaleString())}</div>
    ${reportHtml}
  </div>
</body>
</html>`);
  printWindow.document.close();
  printWindow.focus();
  const triggerPrint = () => {
    try { printWindow.print(); } catch (err) { console.error(err); }
  };
  printWindow.onload = () => setTimeout(triggerPrint, 350);
}

async function exportCurrentReportAsPdf() {
  const reportPreview = document.getElementById("reportPreview");
  const ticker = document.getElementById("repTicker")?.value || selectedTicker;
  const repRange = document.getElementById("repRange")?.value || currentRange;
  if (!reportPreview) return;
  if (reportPreview.dataset.generated !== "1") {
    reportPreview.innerHTML = await buildReportPreview(ticker, repRange);
    reportPreview.dataset.generated = "1";
  }
  const reportTitle = `${currentLang === "zh" ? "AI股票风险报告" : "AI Stock Risk Report"} - ${ticker} - ${repRange}`;
  openReportPrintWindow(reportPreview.innerHTML, reportTitle);
}

async function applyLanguage(lang) {
  currentLang = lang;
  uiSettings.lang = lang;
  persistUISettings();
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.title = t("app_title");

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const value = t(key);
    if (value) el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    const value = t(key);
    if (value) el.setAttribute("placeholder", value);
  });

  const pred = await predictRiskOnline(selectedTicker, currentRange);
  applyPrediction(pred);
  await requestAndRenderForecast(selectedTicker, currentRange, currentForecastDays);

  const reportPreview = document.getElementById("reportPreview");
  if (reportPreview?.dataset.generated === "1") {
    const ticker = document.getElementById("repTicker")?.value || selectedTicker;
    const repRange = document.getElementById("repRange")?.value || currentRange;
    reportPreview.innerHTML = await buildReportPreview(ticker, repRange);
  }

  if (lastForecastResult) renderForecastCard(lastForecastResult);

  syncSettingsForm();
  updateSettingsLiveStatus();
  renderWatchlist();
  renderCompare();
}

async function setRange(range) {
  currentRange = range;
  persistAppState();

  document.querySelectorAll(".chip[data-range]").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-range") === range);
  });

  const cmpRange = document.getElementById("cmpRange");
  if (cmpRange) cmpRange.value = range;

  const repRange = document.getElementById("repRange");
  if (repRange) repRange.value = range;

  const pred = await predictRiskOnline(selectedTicker, currentRange);
  applyPrediction(pred);
  await requestAndRenderForecast(selectedTicker, currentRange, currentForecastDays);

  const reportPreview = document.getElementById("reportPreview");
  if (reportPreview?.dataset.generated === "1") {
    const ticker = document.getElementById("repTicker")?.value || selectedTicker;
    reportPreview.innerHTML = await buildReportPreview(ticker, currentRange);
  }
}

async function refreshCompareData() {
  if (!compareList.length) return;

  for (const ticker of compareList) {
    const pred = await predictRiskOnline(ticker, currentRange);
    if (!STOCKS[ticker]) {
      STOCKS[ticker] = {
        ticker: pred.ticker,
        name: pred.name,
        level: pred.level,
        score: pred.score,
        conf: pred.conf,
        d7: pred.d7
      };
    } else {
      STOCKS[ticker].name = STOCKS[ticker].name || pred.name || pred.ticker;
      STOCKS[ticker].level = pred.level;
      STOCKS[ticker].score = pred.score;
      STOCKS[ticker].conf = pred.conf;
      STOCKS[ticker].d7 = pred.d7;
    }
  }

  renderCompare();
}


async function previewTickerFromInput(rawTicker) {
  const ticker = String(rawTicker || '').trim().toUpperCase();
  if (!ticker) return;
  const pred = await predictRiskOnline(ticker, currentRange);
  applyPrediction(pred);
  await requestAndRenderForecast(ticker, currentRange, currentForecastDays);
}

async function refreshDashboardData() {
  if (!selectedTicker) return;
  const pred = await predictRiskOnline(selectedTicker, currentRange);
  applyPrediction(pred);
}

function startAutoRefresh() {
  stopAutoRefresh();
  autoRefreshTimer = setInterval(async () => {
    try {
      await refreshDashboardData();
      await refreshCompareData();
      const setSync = document.getElementById("setSync");
      if (setSync) setSync.textContent = new Date().toLocaleString();
      await rerenderGeneratedReportIfNeeded();
      updateSettingsLiveStatus();
    } catch (e) {
      console.error("Auto refresh failed:", e);
    }
  }, getAutoRefreshMs());
}

function stopAutoRefresh() {
  if (autoRefreshTimer) {
    clearInterval(autoRefreshTimer);
    autoRefreshTimer = null;
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => switchView(tab.dataset.view));
  });

  const s1PredictBtn = document.getElementById("s1PredictBtn");
  if (s1PredictBtn) {
    s1PredictBtn.addEventListener("click", async () => {
      const btn = document.getElementById("s1PredictBtn");
      const input = document.getElementById("s1Search");
      const ticker = (input.value || "").trim().toUpperCase() || selectedTicker || "AAPL";

      const s1Selected = document.getElementById("s1Selected");
      const s1Explain = document.getElementById("s1Explain");
      const kpiUpdate = document.getElementById("kpiUpdate");

      if (s1Selected) s1Selected.textContent = `${ticker} — Loading...`;
      if (s1Explain) s1Explain.textContent = currentLang === "zh" ? `正在获取 ${ticker} 的数据...` : `Loading data for ${ticker}...`;
      if (kpiUpdate) kpiUpdate.textContent = new Date().toLocaleString();

      try {
        btn.disabled = true;
        btn.textContent = currentLang === "zh" ? "加载中..." : "Loading...";
        const pred = await predictRiskOnline(ticker, currentRange);
        applyPrediction(pred);
        persistAppState();
        await requestAndRenderForecast(ticker, currentRange, currentForecastDays);
        input.value = ticker;
      } catch (e) {
        console.error("Predict failed:", e);
        if (s1Explain) {
          s1Explain.textContent = currentLang === "zh"
            ? "预测失败，请检查股票代码。"
            : "Prediction failed. Please check the ticker.";
        }
      } finally {
        btn.disabled = false;
        btn.textContent = t("btn_predict");
      }
    });
  }

  const s1Search = document.getElementById("s1Search");
  if (s1Search) {
    s1Search.addEventListener("keydown", (e) => {
      if (e.key === "Enter") s1PredictBtn?.click();
    });
    s1Search.addEventListener("change", async (e) => {
      const ticker = String(e.target.value || '').trim().toUpperCase();
      if (ticker) await previewTickerFromInput(ticker);
    });
    s1Search.addEventListener("input", (e) => {
      const ticker = String(e.target.value || '').trim().toUpperCase();
      if (searchPreviewTimer) clearTimeout(searchPreviewTimer);
      if (!ticker || ticker === selectedTicker) return;
      searchPreviewTimer = setTimeout(async () => {
        try {
          await previewTickerFromInput(ticker);
        } catch (err) {
          console.warn('Preview ticker failed:', err?.message || err);
        }
      }, 500);
    });
  }


const forecastDaysInput = document.getElementById("forecastDays");
if (forecastDaysInput) {
  forecastDaysInput.value = String(currentForecastDays);
  forecastDaysInput.addEventListener("change", async (e) => {
    currentForecastDays = clamp(Number(e.target.value || 7), 1, 60);
    persistAppState();
    e.target.value = String(currentForecastDays);
    const tickerLabel = document.getElementById("forecastTickerLabel");
    if (tickerLabel) tickerLabel.textContent = currentLang === "zh" ? `${selectedTicker} • ${currentForecastDays}天` : `${selectedTicker} • ${currentForecastDays}D`;
    if (lastForecastResult) {
      await requestAndRenderForecast(selectedTicker, currentRange, currentForecastDays);
    }
  });
}

if (forecastDaysInput) {
  forecastDaysInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") document.getElementById("forecastBtn")?.click();
  });
}

document.getElementById("forecastBtn")?.addEventListener("click", async () => {
  const btn = document.getElementById("forecastBtn");
  const inputDays = document.getElementById("forecastDays");
  currentForecastDays = clamp(Number(inputDays?.value || 7), 1, 60);
  persistAppState();
  if (inputDays) inputDays.value = String(currentForecastDays);
  if (btn) {
    btn.disabled = true;
    btn.textContent = currentLang === "zh" ? "生成中..." : "Loading...";
  }
  try {
    await requestAndRenderForecast(selectedTicker, currentRange, currentForecastDays);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = t("fc_generate");
    }
  }
});

document.getElementById("forecastExportBtn")?.addEventListener("click", () => {
  downloadForecastCsv();
});

  document.getElementById("btnViewDetails")?.addEventListener("click", async () => {
    const searchTicker = (document.getElementById("s1Search")?.value || selectedTicker || "").trim().toUpperCase();
    if (searchTicker) selectedTicker = searchTicker;
    persistAppState();
    const pred = await predictRiskOnline(selectedTicker, currentRange);
    applyPrediction(pred);
    await requestAndRenderForecast(selectedTicker, currentRange, currentForecastDays);
    switchView("detail");
  });

  document.getElementById("btnGoReports")?.addEventListener("click", () => {
    switchView("reports");
    initReportsDropdown();
  });

  document.getElementById("btnBackToS1")?.addEventListener("click", () => switchView("dashboard"));

  document.getElementById("btnAddToWatchlist")?.addEventListener("click", () => {
    const cleanTicker = String(selectedTicker || "").trim().toUpperCase();
    if (!cleanTicker) return;
    ensureStockEntry(cleanTicker);
    if (!watchlist.includes(cleanTicker)) watchlist.unshift(cleanTicker);
    watchlist = ensureUnique(watchlist);
    persistCollections();
    renderWatchlist();
    switchView("watchlist");
  });

  document.querySelectorAll(".chip[data-range]").forEach(btn => {
    btn.addEventListener("click", async () => {
      await setRange(btn.getAttribute("data-range"));
    });
  });

  const cmpRange = document.getElementById("cmpRange");
  if (cmpRange) {
    cmpRange.value = currentRange;
    cmpRange.addEventListener("change", async (e) => {
      await setRange(e.target.value);
      await refreshCompareData();
    });
  }

  document.getElementById("wlSearch")?.addEventListener("input", renderWatchlist);
  document.getElementById("wlRiskSelect")?.addEventListener("change", renderWatchlist);
  document.getElementById("wlFilterBtn")?.addEventListener("click", () => {
    const sel = document.getElementById("wlRiskSelect");
    if (!sel) return;
    const order = ["ALL", "HIGH", "MEDIUM", "LOW"];
    sel.value = order[(order.indexOf(sel.value) + 1) % order.length];
    renderWatchlist();
  });

  document.getElementById("cmpAddBtn")?.addEventListener("click", async () => {
    const v = (document.getElementById("cmpInput")?.value || "").trim().toUpperCase();
    if (!v) return;

    ensureStockEntry(v);
    const pred = await predictRiskOnline(v, currentRange);
    applyPrediction(pred);
    compareList.push(v);
    compareList = ensureUnique(compareList);
    persistCollections();

    const cmpInput = document.getElementById("cmpInput");
    if (cmpInput) cmpInput.value = "";
    renderCompare();
  });

  document.getElementById("cmpInput")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") document.getElementById("cmpAddBtn")?.click();
  });

  document.getElementById("cmpGenBtn")?.addEventListener("click", async () => {
    await refreshCompareData();
  });

  document.getElementById("repGenBtn")?.addEventListener("click", async () => {
    const ticker = document.getElementById("repTicker")?.value || selectedTicker;
    const repRange = document.getElementById("repRange")?.value || currentRange;
    const reportPreview = document.getElementById("reportPreview");
    if (!reportPreview) return;
    reportPreview.innerHTML = await buildReportPreview(ticker, repRange);
    reportPreview.dataset.generated = "1";
  });

  document.getElementById("repExportBtn")?.addEventListener("click", async () => {
    await exportCurrentReportAsPdf();
  });

  ["repCkSummary", "repCkDrivers", "repCkMetrics", "repCkCharts", "repCkDisclaimer"].forEach((id) => {
    document.getElementById(id)?.addEventListener("change", async () => {
      await rerenderReportIfGenerated();
    });
  });

  document.getElementById("repTicker")?.addEventListener("change", async (e) => {
    selectedTicker = String(e.target.value || selectedTicker).toUpperCase();
    persistAppState();
    const reportPreview = document.getElementById("reportPreview");
    if (reportPreview) {
      const repRange = document.getElementById("repRange")?.value || currentRange;
      reportPreview.innerHTML = await buildReportPreview(selectedTicker, repRange);
      reportPreview.dataset.generated = "1";
    }
  });

  document.getElementById("repRange")?.addEventListener("change", async (e) => {
    const repRange = e.target.value || currentRange;
    currentRange = repRange;
    persistAppState();
    const reportPreview = document.getElementById("reportPreview");
    if (reportPreview) {
      const ticker = document.getElementById("repTicker")?.value || selectedTicker;
      reportPreview.innerHTML = await buildReportPreview(ticker, repRange);
      reportPreview.dataset.generated = "1";
    }
  });

  document.getElementById("setSaveBtn")?.addEventListener("click", async () => {
    const nextSettings = collectUISettingsFromDom();
    const langChanged = nextSettings.lang !== currentLang;
    uiSettings = { ...uiSettings, ...nextSettings };
    persistUISettings();
    applyTheme(uiSettings.theme);
    if (langChanged) {
      await applyLanguage(uiSettings.lang);
    }
    const sync = document.getElementById("setSync");
    if (sync) sync.textContent = new Date().toLocaleString();
    await applyRuntimeSettings();
    persistCollections();
    alert(currentLang === "zh" ? "设置已保存，并已同步到报告、首页、观察名单和下次打开页面。" : "Settings saved and applied to reports, dashboard, watchlist, and the next session.");
  });

  document.getElementById("setRefreshBtn")?.addEventListener("click", async () => {
    const sync = document.getElementById("setSync");
    if (sync) sync.textContent = new Date().toLocaleString();
    persistAppState();
    await refreshDashboardData();
    await refreshCompareData();
    await requestAndRenderForecast(selectedTicker, currentRange, currentForecastDays);
    await rerenderGeneratedReportIfNeeded();
    updateSettingsLiveStatus();
    alert(currentLang === "zh" ? "已刷新，右侧报告和首页摘要也已同步更新。" : "Data refreshed. The report sidebar and dashboard summary were also updated.");
  });

  document.getElementById("setLang")?.addEventListener("change", async (e) => {
    uiSettings.lang = e.target.value;
    persistUISettings();
    await applyLanguage(e.target.value);
  });

  document.getElementById("setTheme")?.addEventListener("change", async (e) => {
    uiSettings.theme = e.target.value;
    persistUISettings();
    applyTheme(e.target.value);
    updateSettingsLiveStatus();
    await rerenderGeneratedReportIfNeeded();
  });

  document.getElementById("setData")?.addEventListener("change", async () => {
    await applyRuntimeSettings();
  });

  document.getElementById("setFreq")?.addEventListener("change", async () => {
    await applyRuntimeSettings({ refresh: false });
    await rerenderGeneratedReportIfNeeded();
  });

  document.getElementById("setAlertsOn")?.addEventListener("change", async () => {
    await applyRuntimeSettings({ refresh: false });
    renderWatchlist();
    await rerenderGeneratedReportIfNeeded();
  });

  document.getElementById("setHighOn")?.addEventListener("change", async () => {
    await applyRuntimeSettings({ refresh: false });
    renderWatchlist();
    await rerenderGeneratedReportIfNeeded();
  });

  document.getElementById("setScoreTh")?.addEventListener("change", async (e) => {
    e.target.value = String(clamp(Number(e.target.value || uiSettings.scoreTh), 1, 100));
    await applyRuntimeSettings({ refresh: false });
    renderWatchlist();
    await rerenderGeneratedReportIfNeeded();
  });

  removeLegacyDefaultCollections();
  uiSettings = loadUISettings();
  watchlist = loadArrayStorage("watchlist", DEFAULT_WATCHLIST);
  compareList = loadArrayStorage("compareList", DEFAULT_COMPARE_LIST);
  watchlist.forEach(ensureStockEntry);
  compareList.forEach(ensureStockEntry);
  const appState = loadAppState();
  selectedTicker = appState.selectedTicker;
  currentRange = appState.currentRange;
  currentForecastDays = appState.currentForecastDays;
  ensureStockEntry(selectedTicker);
  syncSettingsForm();
  applyTheme(uiSettings.theme);
  updateSettingsLiveStatus();

  await applyLanguage(uiSettings.lang || "en");
  persistCollections();

  const s1SearchInit = document.getElementById("s1Search");
  if (s1SearchInit) s1SearchInit.value = selectedTicker;
  const repRangeInit = document.getElementById("repRange");
  if (repRangeInit) repRangeInit.value = currentRange;
  const cmpRangeInit = document.getElementById("cmpRange");
  if (cmpRangeInit) cmpRangeInit.value = currentRange;
  const tickerLabelInit = document.getElementById("forecastTickerLabel");
  if (tickerLabelInit) tickerLabelInit.textContent = currentLang === "zh" ? `${selectedTicker} • ${currentForecastDays}天` : `${selectedTicker} • ${currentForecastDays}D`;
  await setRange("1M");

  const pred = await predictRiskOnline(selectedTicker, currentRange);
  applyPrediction(pred);
  await requestAndRenderForecast(selectedTicker, currentRange, currentForecastDays);
  renderWatchlist();
  renderCompare();
  startAutoRefresh();
});

window.addEventListener("beforeunload", () => {
  stopAutoRefresh();
});