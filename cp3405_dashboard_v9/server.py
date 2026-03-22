from __future__ import annotations

import datetime as dt
import json
import pathlib
import re
import threading
import traceback
import urllib.error
import urllib.parse
import urllib.request
import webbrowser
import xml.etree.ElementTree as ET
from dataclasses import dataclass
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from email.utils import parsedate_to_datetime
from typing import Any, Dict, List

BASE_DIR = pathlib.Path(__file__).resolve().parent
PREFERRED_PORT = 8020
YAHOO_ENDPOINTS = [
    "https://query1.finance.yahoo.com/v8/finance/chart/{ticker}",
    "https://query2.finance.yahoo.com/v8/finance/chart/{ticker}",
]
GOOGLE_NEWS_RSS = "https://news.google.com/rss/search"

TRANSLATIONS = {
    "en": {
        "ticker_required": "Ticker is required.",
        "date_format": "Dates must use YYYY-MM-DD format.",
        "forecast_days": "Forecast days must be between 1 and 60.",
        "end_before_start": "End date cannot be earlier than start date.",
        "future_adjusted": "End date was adjusted to {date} because future market data does not exist.",
        "start_later": "Start date cannot be later than the adjusted end date.",
        "network_hint": "Check your internet connection and whether your network can open finance.yahoo.com.",
        "download_note": "Historical prices were downloaded from Yahoo Finance.",
        "forecast_note": "Forecast text is a rule-based estimate from those historical prices.",
        "sample_short_analysis": "Historical sample is short, so the pattern is not stable enough for a strong signal.",
        "sample_short_forecast": "The next {days} days may be mostly sideways because there are too few observations.",
        "small_sample": "Small historical sample",
        "short_vol": "Short-term volatility",
        "limited_confirmation": "Limited technical confirmation",
        "upward": "upward",
        "downward": "downward",
        "flat": "flat",
        "bullish": "Bullish",
        "bearish": "Bearish",
        "sideways": "Sideways",
        "high": "High",
        "medium": "Medium",
        "low": "Low",
        "analysis_sentence": "The 5-day trend is {short}, the 20-day trend is {long}, and daily volatility is about {vol}%.",
        "forecast_sentence": "For the next {days} days, the model points to a {direction} bias based on moving-average slope, overall range change, and recent volatility. This is an estimate, not real future data.",
        "factor_5ma": "5-day moving average",
        "factor_20ma": "20-day moving average",
        "factor_change": "Historical price change",
        "factor_vol": "Return volatility",
        "factor_events": "Market events",
        "news_query": "{ticker} stock OR {name} stock",
        "last_trading_day": "Last Trading Day",
    },
    "zh": {
        "ticker_required": "必须输入股票代码。",
        "date_format": "日期必须使用 YYYY-MM-DD 格式。",
        "forecast_days": "预测天数必须在 1 到 60 之间。",
        "end_before_start": "结束日期不能早于开始日期。",
        "future_adjusted": "由于未来没有真实市场数据，结束日期已自动调整为 {date}。",
        "start_later": "开始日期不能晚于调整后的结束日期。",
        "network_hint": "请检查网络连接，并确认你的网络可以打开 finance.yahoo.com。",
        "download_note": "历史价格已从 Yahoo Finance 下载。",
        "forecast_note": "预测文字是根据这些历史价格生成的规则型估计，不代表真实未来价格。",
        "sample_short_analysis": "历史样本较短，因此当前走势信号还不够稳定。",
        "sample_short_forecast": "未来 {days} 天可能以震荡为主，因为可用观测值太少。",
        "small_sample": "历史样本较少",
        "short_vol": "短期波动率",
        "limited_confirmation": "技术信号有限",
        "upward": "向上",
        "downward": "向下",
        "flat": "走平",
        "bullish": "看涨",
        "bearish": "看跌",
        "sideways": "震荡",
        "high": "高",
        "medium": "中",
        "low": "低",
        "analysis_sentence": "5日趋势为{short}，20日趋势为{long}，日波动率约为 {vol}%。",
        "forecast_sentence": "未来 {days} 天，模型根据均线斜率、区间涨跌幅和近期波动率，判断走势偏{direction}。这只是估计，不是真实未来价格。",
        "factor_5ma": "5日移动平均线",
        "factor_20ma": "20日移动平均线",
        "factor_change": "历史价格变动",
        "factor_vol": "回报波动率",
        "factor_events": "市场事件",
        "news_query": "{ticker} 股票 OR {name} 股票",
        "last_trading_day": "最后交易日",
    },
}


@dataclass
class AnalysisConfig:
    ticker: str
    start_date: str
    end_date: str
    forecast_days: int = 7
    lang: str = "en"


def get_lang(lang: str | None) -> str:
    return "zh" if str(lang).lower().startswith("zh") else "en"


def t(lang: str, key: str, **kwargs: Any) -> str:
    text = TRANSLATIONS[get_lang(lang)][key]
    return text.format(**kwargs) if kwargs else text


def validate_date(date_str: str) -> bool:
    try:
        dt.datetime.strptime(date_str, "%Y-%m-%d")
        return True
    except ValueError:
        return False


def _to_unix(date_str: str, end_of_day: bool = False) -> int:
    parsed = dt.datetime.strptime(date_str, "%Y-%m-%d")
    if end_of_day:
        parsed = parsed + dt.timedelta(days=1)
    return int(parsed.timestamp())


def _fetch_text(url: str) -> str:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0",
            "Accept": "application/json,text/plain,application/xml,text/xml,*/*",
        },
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        charset = resp.headers.get_content_charset() or "utf-8"
        return resp.read().decode(charset, errors="replace")


def _fetch_json(url: str) -> Dict[str, Any]:
    return json.loads(_fetch_text(url))


def _normalize_ticker_for_news(ticker: str) -> str:
    raw = ticker.upper().strip()
    return raw.replace(".SS", "").replace(".SZ", "").replace(".HK", " HK")


def _fetch_yahoo_chart(ticker: str, start_date: str, end_date: str) -> Dict[str, Any]:
    params = urllib.parse.urlencode({
        "period1": str(_to_unix(start_date)),
        "period2": str(_to_unix(end_date, end_of_day=True)),
        "interval": "1d",
        "includePrePost": "false",
        "events": "div,splits,capitalGains",
    })
    payload = None
    last_error = None
    ticker_q = urllib.parse.quote(ticker)
    for endpoint in YAHOO_ENDPOINTS:
        url = endpoint.format(ticker=ticker_q) + "?" + params
        try:
            payload = _fetch_json(url)
            break
        except urllib.error.HTTPError as exc:
            last_error = f"Yahoo Finance request failed with HTTP {exc.code}."
        except urllib.error.URLError as exc:
            reason = getattr(exc, "reason", exc)
            last_error = f"Network error while connecting to Yahoo Finance: {reason}."
        except Exception as exc:
            last_error = f"Unexpected network error: {exc}."
    if payload is None:
        raise RuntimeError(last_error or "Failed to connect to Yahoo Finance.")
    chart = payload.get("chart") or {}
    error = chart.get("error")
    if error:
        desc = error.get("description") or error.get("code") or "Unknown Yahoo Finance error."
        raise RuntimeError(f"Yahoo Finance returned an error: {desc}")
    results = chart.get("result") or []
    if not results:
        raise RuntimeError("Yahoo Finance returned no result for this ticker.")
    return results[0]


def _extract_points(result: Dict[str, Any]) -> List[Dict[str, Any]]:
    timestamps = result.get("timestamp") or []
    indicators = ((result.get("indicators") or {}).get("quote") or [])
    quotes = indicators[0] if indicators else {}
    closes = quotes.get("close") or []
    dedup: Dict[str, float] = {}
    for ts, close in zip(timestamps, closes):
        if ts is None or close is None:
            continue
        day = dt.datetime.utcfromtimestamp(int(ts)).strftime("%Y-%m-%d")
        dedup[day] = round(float(close), 2)
    return [{"date": day, "close": price} for day, price in dedup.items()]

def _download_real_history(config: AnalysisConfig) -> Dict[str, Any]:
    lang = get_lang(config.lang)
    today = dt.date.today()
    start_date = dt.datetime.strptime(config.start_date, "%Y-%m-%d").date()
    end_date = dt.datetime.strptime(config.end_date, "%Y-%m-%d").date()

    adjusted_note = ""
    if end_date > today:
        end_date = today
        adjusted_note = t(lang, "future_adjusted", date=today.isoformat())
    if start_date > end_date:
        raise RuntimeError(t(lang, "start_later"))

    result = _fetch_yahoo_chart(config.ticker, start_date.isoformat(), end_date.isoformat())
    meta = result.get("meta") or {}
    points = _extract_points(result)
    if not points:
        raise RuntimeError(
            "No closing price data was returned. This usually means the network could not reach Yahoo Finance, "
            "the ticker is invalid, or the selected range has no trading data."
        )

    prices = [p["close"] for p in points]
    start_p = float(prices[0])
    end_p = float(prices[-1])
    avg_p = float(sum(prices) / len(prices))
    high_p = float(max(prices))
    low_p = float(min(prices))
    pct_change = ((end_p - start_p) / start_p) * 100 if start_p else 0.0
    last_trading_day = points[-1]["date"]
    summary = {
        "Start Price": round(start_p, 2),
        "End Price": round(end_p, 2),
        "Average Price": round(avg_p, 2),
        "Highest Price": round(high_p, 2),
        "Lowest Price": round(low_p, 2),
        "Price Change (%)": round(pct_change, 2),
        "Total Data Days": int(len(points)),
        "Last Trading Day": last_trading_day,
    }
    stock_name = meta.get("longName") or meta.get("shortName") or meta.get("symbol") or config.ticker.upper()
    data_note = adjusted_note or t(lang, "download_note")
    return {
        "stock_name": stock_name,
        "summary": summary,
        "chart_points": points,
        "sample_data": points[-10:],
        "source": "Yahoo Finance",
        "data_note": data_note,
        "last_trading_day": last_trading_day,
    }


def fallback_forecast(points: List[Dict[str, Any]], forecast_days: int, summary: Dict[str, Any], lang: str) -> Dict[str, Any]:
    lang = get_lang(lang)
    prices = [float(p["close"]) for p in points if p.get("close") is not None]
    if len(prices) < 10:
        return {
            "analysis": t(lang, "sample_short_analysis"),
            "forecast": t(lang, "sample_short_forecast", days=forecast_days),
            "confidence": t(lang, "low"),
            "key_factors": [t(lang, "small_sample"), t(lang, "short_vol"), t(lang, "limited_confirmation")],
        }

    returns = []
    for prev, curr in zip(prices[:-1], prices[1:]):
        if prev:
            returns.append((curr - prev) / prev)
    vol = 0.0
    if returns:
        mean_r = sum(returns) / len(returns)
        vol = (sum((r - mean_r) ** 2 for r in returns) / len(returns)) ** 0.5

    def moving_average(values: List[float], window: int) -> List[float]:
        if len(values) < window:
            return []
        return [sum(values[i - window + 1:i + 1]) / window for i in range(window - 1, len(values))]

    def slope_last(values: List[float], k: int = 6) -> float:
        values = values[-k:]
        if len(values) < 2:
            return 0.0
        x = list(range(len(values)))
        x_mean = sum(x) / len(x)
        y_mean = sum(values) / len(values)
        numerator = sum((xi - x_mean) * (yi - y_mean) for xi, yi in zip(x, values))
        denominator = sum((xi - x_mean) ** 2 for xi in x) or 1.0
        return numerator / denominator

    short_slope = slope_last(moving_average(prices, 5))
    long_slope = slope_last(moving_average(prices, 20))
    pct = float(summary.get("Price Change (%)", 0.0))
    score = 0.0
    score += 1.0 if short_slope > 0 else -1.0 if short_slope < 0 else 0.0
    score += 0.7 if long_slope > 0 else -0.7 if long_slope < 0 else 0.0
    score += 0.3 if pct > 0 else -0.3 if pct < 0 else 0.0

    if score >= 1.0:
        direction = t(lang, "bullish")
    elif score <= -1.0:
        direction = t(lang, "bearish")
    else:
        direction = t(lang, "sideways")

    high_vol = vol >= 0.02
    confidence = t(lang, "medium") if not high_vol else t(lang, "low")
    analysis = t(
        lang,
        "analysis_sentence",
        short=t(lang, "upward") if short_slope > 0 else t(lang, "downward") if short_slope < 0 else t(lang, "flat"),
        long=t(lang, "upward") if long_slope > 0 else t(lang, "downward") if long_slope < 0 else t(lang, "flat"),
        vol=round(vol * 100, 2),
    )
    forecast = t(lang, "forecast_sentence", days=forecast_days, direction=direction)
    return {
        "analysis": analysis,
        "forecast": forecast,
        "confidence": confidence,
        "key_factors": [
            t(lang, "factor_5ma"), t(lang, "factor_20ma"), t(lang, "factor_change"), t(lang, "factor_vol"), t(lang, "factor_events")
        ],
    }


def _parse_news_items(xml_text: str) -> List[Dict[str, str]]:
    root = ET.fromstring(xml_text)
    items: List[Dict[str, str]] = []
    channel = root.find("channel")
    if channel is None:
        return items
    for item in channel.findall("item")[:40]:
        title = (item.findtext("title") or "").strip()
        link = (item.findtext("link") or "").strip()
        pub_date = (item.findtext("pubDate") or "").strip()
        source_node = item.find("source")
        source = (source_node.text or "").strip() if source_node is not None else ""
        if title and link:
            items.append({"title": title, "link": link, "source": source, "published": pub_date})
    return items


def _parse_pub_date(value: str) -> dt.datetime:
    if not value:
        return dt.datetime.min
    try:
        parsed = parsedate_to_datetime(value)
        if parsed.tzinfo is not None:
            parsed = parsed.astimezone(dt.timezone.utc).replace(tzinfo=None)
        return parsed
    except Exception:
        return dt.datetime.min


def _news_relevance(item: Dict[str, str], ticker: str, stock_name: str) -> int:
    title = (item.get("title") or "").lower()
    source = (item.get("source") or "").lower()
    ticker_u = ticker.upper().strip()
    ticker_l = ticker_u.lower()
    base_symbol = ticker_u.split('.')[0].lower()
    words = [w.lower() for w in re.split(r"[^A-Za-z0-9]+", stock_name) if len(w) >= 3][:4]
    score = 0
    if ticker_l and ticker_l in title:
        score += 8
    if base_symbol and base_symbol in title:
        score += 5
    for w in words:
        if w in title:
            score += 4
        if w in source:
            score += 1
    if "stock" in title or "shares" in title or "price" in title or "earnings" in title:
        score += 2
    bad_terms = ["crypto", "bitcoin", "btc", "eth", "token", "tokenized", "forex", "coin"]
    if any(b in title for b in bad_terms) and not any(w in title for w in words) and ticker_l not in title:
        score -= 12
    pub = _parse_pub_date(item.get("published") or "")
    age_days = max(0, (dt.datetime.utcnow() - pub).days) if pub != dt.datetime.min else 999
    if age_days <= 2:
        score += 3
    elif age_days <= 7:
        score += 2
    elif age_days <= 30:
        score += 1
    return score


def _slice_news_pool(items: List[Dict[str, str]], refresh_seq: int, page_size: int = 8) -> List[Dict[str, str]]:
    if not items:
        return []
    if len(items) <= page_size:
        return items
    offset = (refresh_seq * page_size) % len(items)
    seq = items[offset:offset + page_size]
    if len(seq) < page_size:
        seq += items[:page_size - len(seq)]
    seen = set()
    unique = []
    for item in seq:
        key = item.get("link") or item.get("title")
        if key in seen:
            continue
        seen.add(key)
        unique.append(item)
    return unique


def fetch_news(ticker: str, stock_name: str, lang: str, refresh_seq: int = 0) -> Dict[str, Any]:
    preferred = get_lang(lang)
    ticker_news = _normalize_ticker_for_news(ticker)
    base_symbol = ticker.upper().split('.')[0]
    english_name = stock_name.strip() or ticker.upper()
    if preferred == "zh":
        queries = [
            (f'"{base_symbol}" 股票 OR "{english_name}" 股票 when:7d', "zh-CN", "CN", "CN:zh-Hans"),
            (f'"{base_symbol}" stock OR "{english_name}" stock when:7d', "en-US", "US", "US:en"),
            (f'"{ticker_news}" stock OR "{english_name}" earnings OR "{english_name}" price when:30d', "en-US", "US", "US:en"),
            (f'"{base_symbol}" "{english_name}" when:30d', "en-US", "US", "US:en"),
        ]
    else:
        queries = [
            (f'"{base_symbol}" stock OR "{english_name}" stock when:7d', "en-US", "US", "US:en"),
            (f'"{ticker_news}" stock OR "{english_name}" earnings OR "{english_name}" price when:30d', "en-US", "US", "US:en"),
            (f'"{base_symbol}" "{english_name}" when:30d', "en-US", "US", "US:en"),
            (f'"{base_symbol}" 股票 OR "{english_name}" 股票 when:7d', "zh-CN", "CN", "CN:zh-Hans"),
        ]

    merged: List[Dict[str, str]] = []
    seen: set[str] = set()
    last_error: Exception | None = None
    for query, hl, gl, ceid in queries:
        try:
            params = urllib.parse.urlencode({"q": query, "hl": hl, "gl": gl, "ceid": ceid})
            xml_text = _fetch_text(f"{GOOGLE_NEWS_RSS}?{params}")
            for item in _parse_news_items(xml_text):
                key = item.get("link") or item.get("title")
                if not key or key in seen:
                    continue
                item["_score"] = _news_relevance(item, ticker, stock_name)
                seen.add(key)
                merged.append(item)
        except Exception as exc:
            last_error = exc
            continue

    if not merged and last_error is not None:
        raise RuntimeError(f"News refresh failed: {last_error}")

    filtered = [i for i in merged if int(i.get("_score", 0)) >= 0]
    candidates = filtered or merged
    candidates.sort(key=lambda item: (int(item.get("_score", 0)), _parse_pub_date(item.get("published") or "")), reverse=True)
    page = _slice_news_pool(candidates, refresh_seq=refresh_seq, page_size=8)
    for item in candidates:
        item.pop("_score", None)
    return {"items": page, "pool_total": len(candidates), "slice_label": f"{(refresh_seq % max(1, (len(candidates)+7)//8))+1}/{max(1, (len(candidates)+7)//8)}"}


def quote_snapshot(ticker: str) -> Dict[str, Any]:
    end = dt.date.today()
    start = end - dt.timedelta(days=45)
    result = _fetch_yahoo_chart(ticker, start.isoformat(), end.isoformat())
    meta = result.get("meta") or {}
    points = _extract_points(result)
    if len(points) < 2:
        raise RuntimeError("No recent quote data.")

    recent = points[-12:]
    closes = [float(p["close"]) for p in points if p.get("close") is not None]
    if len(closes) < 2:
        raise RuntimeError("No recent quote data.")

    regular_market_price = meta.get("regularMarketPrice")
    previous_close = meta.get("previousClose") or meta.get("chartPreviousClose")
    try:
        price = float(regular_market_price) if regular_market_price is not None else float(closes[-1])
    except Exception:
        price = float(closes[-1])
    try:
        prev = float(previous_close) if previous_close is not None else float(closes[-2])
    except Exception:
        prev = float(closes[-2])

    # Fall back to the last two distinct closes when Yahoo does not expose a usable previous close.
    if not prev:
        prev = float(closes[-2])
    if round(price, 4) == round(prev, 4):
        distinct = []
        for value in reversed(closes):
            if not distinct or round(value, 4) != round(distinct[-1], 4):
                distinct.append(value)
            if len(distinct) >= 2:
                break
        if len(distinct) >= 2:
            price, prev = distinct[0], distinct[1]

    change_pct = ((price - prev) / prev) * 100 if prev else 0.0
    return {
        "symbol": (meta.get("symbol") or ticker).upper(),
        "name": meta.get("shortName") or meta.get("longName") or ticker.upper(),
        "price": round(price, 2),
        "change_pct": round(change_pct, 2),
        "spark": [round(float(p["close"]), 2) for p in recent],
        "last_date": recent[-1]["date"],
        "previous_close": round(prev, 2),
        "change_basis": "1D",
    }

def analyse_stock(config: AnalysisConfig) -> Dict[str, Any]:
    lang = get_lang(config.lang)
    data = _download_real_history(config)
    forecast = fallback_forecast(data["chart_points"], config.forecast_days, data["summary"], lang)
    news_items: List[Dict[str, str]] = []
    try:
        news_payload = fetch_news(config.ticker, data["stock_name"], lang, refresh_seq=0)
        news_items = news_payload.get("items", [])
    except Exception:
        pass
    model_parameters = {
        "model_type": "rule-based heuristic",
        "moving_average_windows": [5, 20],
        "slope_lookback_days": 6,
        "score_weights": {"ma5": 1.0, "ma20": 0.7, "range_change": 0.3},
        "volatility_low_confidence_threshold": 0.02,
        "forecast_days": config.forecast_days,
        "historical_points_used": len(data["chart_points"]),
        "input_features": ["daily close", "5-day moving average", "20-day moving average", "historical range change", "daily return volatility"],
        "price_source": data["source"],
    }
    return {
        "status": "ok",
        "ticker": config.ticker.upper(),
        "stock_name": data["stock_name"],
        "date_range": f"{config.start_date} to {config.end_date}",
        "forecast_days": config.forecast_days,
        "generated_at": dt.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "source": data["source"],
        "historical_data_summary": data["summary"],
        "raw_data_sample": data["sample_data"],
        "chart_points": data["chart_points"],
        "analysis": forecast["analysis"],
        "forecast": forecast["forecast"],
        "confidence": forecast["confidence"],
        "key_factors": forecast["key_factors"],
        "note": f"{data['data_note']} {t(lang, 'forecast_note')}",
        "last_trading_day": data["last_trading_day"],
        "last_trading_day_label": t(lang, "last_trading_day"),
        "news": news_items,
        "model_parameters": model_parameters,
    }


class AppHandler(BaseHTTPRequestHandler):
    def _send_text(self, text: str, status: int = 200, content_type: str = "text/html; charset=utf-8") -> None:
        encoded = text.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()
        self.wfile.write(encoded)

    def _send_json(self, payload: Dict[str, Any], status: int = 200) -> None:
        self._send_text(json.dumps(payload, ensure_ascii=False), status=status, content_type="application/json; charset=utf-8")

    def log_message(self, format: str, *args: Any) -> None:
        print("[HTTP]", format % args)

    def do_GET(self) -> None:
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path in ["/", "/index.html"]:
            self._send_text((BASE_DIR / "index.html").read_text(encoding="utf-8"))
            return
        if parsed.path == "/api/health":
            self._send_json({"status": "ok"})
            return
        if parsed.path == "/api/news":
            params = urllib.parse.parse_qs(parsed.query)
            ticker = (params.get("ticker") or [""])[0].strip()
            stock_name = (params.get("stock_name") or [ticker])[0].strip() or ticker
            lang = get_lang((params.get("lang") or ["en"])[0])
            if not ticker:
                self._send_json({"status": "error", "message": t(lang, "ticker_required")}, status=400)
                return
            refresh_seq = int((params.get("refresh_seq") or ["0"])[0] or 0)
            try:
                payload = fetch_news(ticker, stock_name, lang, refresh_seq=refresh_seq)
                self._send_json({"status": "ok", **payload})
            except Exception as exc:
                self._send_json({"status": "error", "message": str(exc), "items": [], "pool_total": 0}, status=500)
            return
        if parsed.path == "/api/market":
            params = urllib.parse.parse_qs(parsed.query)
            symbols = (params.get("symbols") or ["AAPL,MSFT,NVDA,TSLA,GOOGL,AMZN"])[0]
            items = []
            for symbol in [s.strip() for s in symbols.split(",") if s.strip()][:8]:
                try:
                    items.append(quote_snapshot(symbol))
                except Exception:
                    continue
            self._send_json({"status": "ok", "items": items})
            return
        self._send_text("Not Found", status=404, content_type="text/plain; charset=utf-8")

    def do_POST(self) -> None:
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path != "/api/analyze":
            self._send_text("Not Found", status=404, content_type="text/plain; charset=utf-8")
            return
        try:
            content_length = int(self.headers.get("Content-Length", "0"))
            body = self.rfile.read(content_length).decode("utf-8") if content_length else "{}"
            payload = json.loads(body or "{}")
            ticker = str(payload.get("ticker", "")).strip()
            start_date = str(payload.get("start_date", "")).strip()
            end_date = str(payload.get("end_date", "")).strip()
            forecast_days = int(payload.get("forecast_days", 7))
            lang = get_lang(payload.get("lang", "en"))
            if not ticker:
                self._send_json({"status": "error", "message": t(lang, "ticker_required")}, status=400)
                return
            if not validate_date(start_date) or not validate_date(end_date):
                self._send_json({"status": "error", "message": t(lang, "date_format")}, status=400)
                return
            if forecast_days < 1 or forecast_days > 60:
                self._send_json({"status": "error", "message": t(lang, "forecast_days")}, status=400)
                return
            if end_date < start_date:
                self._send_json({"status": "error", "message": t(lang, "end_before_start")}, status=400)
                return
            self._send_json(analyse_stock(AnalysisConfig(ticker=ticker, start_date=start_date, end_date=end_date, forecast_days=forecast_days, lang=lang)))
        except Exception as exc:
            traceback.print_exc()
            lang = "zh" if 'lang' in locals() and lang == 'zh' else 'en'
            self._send_json({"status": "error", "message": str(exc), "hint": t(lang, "network_hint")}, status=500)


def main() -> None:
    import os
    import socket

    render_port = os.environ.get("PORT")
    is_render = render_port is not None

    if is_render:
        host = "0.0.0.0"
        port = int(render_port)
    else:
        host = "127.0.0.1"
        port = PREFERRED_PORT
        for candidate in range(PREFERRED_PORT, PREFERRED_PORT + 20):
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
                if s.connect_ex(("127.0.0.1", candidate)) != 0:
                    port = candidate
                    break

    server = ThreadingHTTPServer((host, port), AppHandler)

    if not is_render:
        threading.Timer(1.0, lambda: webbrowser.open(f"http://127.0.0.1:{port}/?v=9")).start()
        print(f"Server running at http://127.0.0.1:{port}")
        print("Keep this terminal open while the web app is running.")
    else:
        print(f"Server running on Render at 0.0.0.0:{port}")

    server.serve_forever()