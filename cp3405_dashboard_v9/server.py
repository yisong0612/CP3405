import os
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
YAHOO_SEARCH_ENDPOINT = "https://query2.finance.yahoo.com/v1/finance/search"

SUGGESTION_UNIVERSE = [
    {"symbol": "A", "name": "Agilent Technologies, Inc."}, {"symbol": "AA", "name": "Alcoa Corporation"},
    {"symbol": "AAA", "name": "Alternative Access First Priority CLO Bond ETF"}, {"symbol": "AACG", "name": "ATA Creativity Global"},
    {"symbol": "AAL", "name": "American Airlines Group Inc."}, {"symbol": "AAME", "name": "Atlantic American Corporation"},
    {"symbol": "AAP", "name": "Advance Auto Parts, Inc."}, {"symbol": "AAPL", "name": "Apple Inc."},
    {"symbol": "AAPG", "name": "Ascentage Pharma Group International"}, {"symbol": "AAT", "name": "American Assets Trust, Inc."},
    {"symbol": "ABBV", "name": "AbbVie Inc."}, {"symbol": "ABC", "name": "AmerisourceBergen Corporation"},
    {"symbol": "ABNB", "name": "Airbnb, Inc."}, {"symbol": "ABT", "name": "Abbott Laboratories"},
    {"symbol": "ACAD", "name": "ACADIA Pharmaceuticals Inc."}, {"symbol": "ACGL", "name": "Arch Capital Group Ltd."},
    {"symbol": "ACN", "name": "Accenture plc"}, {"symbol": "ADBE", "name": "Adobe Inc."},
    {"symbol": "ADI", "name": "Analog Devices, Inc."}, {"symbol": "ADM", "name": "Archer-Daniels-Midland Company"},
    {"symbol": "ADP", "name": "Automatic Data Processing, Inc."}, {"symbol": "ADSK", "name": "Autodesk, Inc."},
    {"symbol": "AEM", "name": "Agnico Eagle Mines Limited"}, {"symbol": "AEO", "name": "American Eagle Outfitters, Inc."},
    {"symbol": "AEP", "name": "American Electric Power Company, Inc."}, {"symbol": "AES", "name": "The AES Corporation"},
    {"symbol": "AFL", "name": "Aflac Incorporated"}, {"symbol": "AGG", "name": "iShares Core U.S. Aggregate Bond ETF"},
    {"symbol": "AI", "name": "C3.ai, Inc."}, {"symbol": "AIG", "name": "American International Group"},
    {"symbol": "AIR", "name": "AAR Corp."}, {"symbol": "AKAM", "name": "Akamai Technologies, Inc."},
    {"symbol": "ALB", "name": "Albemarle Corporation"}, {"symbol": "ALLY", "name": "Ally Financial Inc."},
    {"symbol": "AMAT", "name": "Applied Materials, Inc."}, {"symbol": "AMD", "name": "Advanced Micro Devices, Inc."},
    {"symbol": "AME", "name": "AMETEK, Inc."}, {"symbol": "AMGN", "name": "Amgen Inc."},
    {"symbol": "AMT", "name": "American Tower Corporation"}, {"symbol": "AMZN", "name": "Amazon.com, Inc."},
    {"symbol": "ANET", "name": "Arista Networks, Inc."}, {"symbol": "ANF", "name": "Abercrombie & Fitch Co."},
    {"symbol": "AON", "name": "Aon plc"}, {"symbol": "APA", "name": "APA Corporation"},
    {"symbol": "APD", "name": "Air Products and Chemicals, Inc."}, {"symbol": "APH", "name": "Amphenol Corporation"},
    {"symbol": "APP", "name": "AppLovin Corporation"}, {"symbol": "ARM", "name": "Arm Holdings plc"},
    {"symbol": "ASML", "name": "ASML Holding N.V."}, {"symbol": "AVGO", "name": "Broadcom Inc."}, {"symbol": "AZN", "name": "AstraZeneca PLC"},
    {"symbol": "BAC", "name": "Bank of America Corp."},
    {"symbol": "BABA", "name": "Alibaba Group Holding Ltd."}, {"symbol": "BIDU", "name": "Baidu, Inc."},
    {"symbol": "BRK-B", "name": "Berkshire Hathaway Inc. Class B"}, {"symbol": "C", "name": "Citigroup Inc."},
    {"symbol": "COIN", "name": "Coinbase Global, Inc."}, {"symbol": "CRM", "name": "Salesforce, Inc."},
    {"symbol": "DIS", "name": "The Walt Disney Company"}, {"symbol": "GOOGL", "name": "Alphabet Inc. Class A"},
    {"symbol": "GOOG", "name": "Alphabet Inc. Class C"}, {"symbol": "IBM", "name": "International Business Machines"},
    {"symbol": "INTC", "name": "Intel Corporation"}, {"symbol": "JPM", "name": "JPMorgan Chase & Co."},
    {"symbol": "KO", "name": "The Coca-Cola Company"}, {"symbol": "MA", "name": "Mastercard Incorporated"},
    {"symbol": "MCD", "name": "McDonald\'s Corporation"}, {"symbol": "META", "name": "Meta Platforms, Inc."},
    {"symbol": "MSFT", "name": "Microsoft Corporation"}, {"symbol": "NFLX", "name": "Netflix, Inc."},
    {"symbol": "NIO", "name": "NIO Inc."}, {"symbol": "NKE", "name": "NIKE, Inc."},
    {"symbol": "NVDA", "name": "NVIDIA Corporation"}, {"symbol": "ORCL", "name": "Oracle Corporation"},
    {"symbol": "PDD", "name": "PDD Holdings Inc."}, {"symbol": "PEP", "name": "PepsiCo, Inc."},
    {"symbol": "PFE", "name": "Pfizer Inc."}, {"symbol": "PLTR", "name": "Palantir Technologies Inc."},
    {"symbol": "PYPL", "name": "PayPal Holdings, Inc."}, {"symbol": "SHOP", "name": "Shopify Inc."},
    {"symbol": "SPY", "name": "SPDR S&P 500 ETF Trust"}, {"symbol": "TSLA", "name": "Tesla, Inc."},
    {"symbol": "TSM", "name": "Taiwan Semiconductor Manufacturing Co., Ltd."}, {"symbol": "UBER", "name": "Uber Technologies, Inc."},
    {"symbol": "UNH", "name": "UnitedHealth Group Incorporated"}, {"symbol": "V", "name": "Visa Inc."},
    {"symbol": "VOO", "name": "Vanguard S&P 500 ETF"}, {"symbol": "WMT", "name": "Walmart Inc."},
    {"symbol": "XOM", "name": "Exxon Mobil Corporation"}, {"symbol": "0700.HK", "name": "Tencent Holdings Ltd."},
    {"symbol": "9988.HK", "name": "Alibaba Group Holding Ltd."}, {"symbol": "9618.HK", "name": "JD.com, Inc."},
    {"symbol": "1299.HK", "name": "AIA Group Limited"}, {"symbol": "1211.HK", "name": "BYD Company Limited"},
    {"symbol": "600519.SS", "name": "Kweichow Moutai Co., Ltd."}, {"symbol": "000858.SZ", "name": "Wuliangye Yibin Co., Ltd."},
    {"symbol": "601318.SS", "name": "Ping An Insurance"}, {"symbol": "600036.SS", "name": "China Merchants Bank"},
    {"symbol": "000001.SZ", "name": "Ping An Bank Co., Ltd."}, {"symbol": "300750.SZ", "name": "Contemporary Amperex Technology"}
]

TRANSLATIONS = {
    "en": {
        "ticker_required": "Ticker is required.",
        "date_format": "Dates must use YYYY-MM-DD format.",
        "forecast_days": "Forecast days must be between 1 and 30.",
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
        "forecast_result_sentence": "Estimated {days}-day change: {change}%. Projected end price: {price}. Estimated range: {low} to {high}.",
        "factor_5ma": "5-day moving average",
        "factor_20ma": "20-day moving average",
        "factor_change": "Historical price change",
        "factor_vol": "Return volatility",
        "factor_events": "Market events",
        "news_query": "{ticker} stock OR {name} stock",
        "last_trading_day": "Last Trading Day",
        "date_range_sep": " to ",
        "backtest_note": "Backtest applies a simple MA5/MA20 trend-following rule with volume confirmation on recent real history. It is for validation only.",
    },
    "zh": {
        "ticker_required": "必须输入股票代码。",
        "date_format": "日期必须使用 YYYY-MM-DD 格式。",
        "forecast_days": "预测天数必须在 1 到 30 之间。",
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
        "forecast_result_sentence": "预计未来 {days} 天涨跌幅：{change}%。预计结束价格约为 {price}。估计区间：{low} 到 {high}。",
        "factor_5ma": "5日移动平均线",
        "factor_20ma": "20日移动平均线",
        "factor_change": "历史价格变动",
        "factor_vol": "回报波动率",
        "factor_events": "市场事件",
        "news_query": "{ticker} 股票 OR {name} 股票",
        "last_trading_day": "最后交易日",
        "date_range_sep": " 至 ",
        "backtest_note": "回测使用 MA5/MA20 趋势规则并结合成交量确认，在最近真实历史行情中进行模拟验证，仅供参考。",
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
    opens = quotes.get("open") or []
    highs = quotes.get("high") or []
    lows = quotes.get("low") or []
    closes = quotes.get("close") or []
    volumes = quotes.get("volume") or []
    dedup: Dict[str, Dict[str, Any]] = {}
    for ts, open_, high_, low_, close_, volume_ in zip(timestamps, opens, highs, lows, closes, volumes):
        if ts is None or close_ is None:
            continue
        day = dt.datetime.utcfromtimestamp(int(ts)).strftime("%Y-%m-%d")
        open_v = round(float(open_ if open_ is not None else close_), 2)
        close_v = round(float(close_), 2)
        high_v = round(float(high_ if high_ is not None else max(open_v, close_v)), 2)
        low_v = round(float(low_ if low_ is not None else min(open_v, close_v)), 2)
        volume_v = int(volume_ or 0)
        dedup[day] = {
            "date": day,
            "open": open_v,
            "high": high_v,
            "low": low_v,
            "close": close_v,
            "volume": volume_v,
        }
    return list(dedup.values())


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
        "start_date_used": start_date.isoformat(),
        "end_date_used": end_date.isoformat(),
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
    last_price = float(prices[-1]) if prices else 0.0

    def next_trading_days(start_date: str, days: int) -> List[str]:
        d = dt.datetime.strptime(start_date, "%Y-%m-%d").date()
        result = []
        while len(result) < days:
            d += dt.timedelta(days=1)
            if d.weekday() < 5:
                result.append(d.isoformat())
        return result

    if len(prices) < 10:
        future_days = next_trading_days(points[-1]["date"], forecast_days) if points else []
        forecast_points = [{"date": day, "close": round(last_price, 2)} for day in future_days]
        return {
            "analysis": t(lang, "sample_short_analysis"),
            "forecast": t(lang, "sample_short_forecast", days=forecast_days),
            "confidence": t(lang, "low"),
            "key_factors": [t(lang, "small_sample"), t(lang, "short_vol"), t(lang, "limited_confirmation")],
            "predicted_change_pct": 0.0,
            "predicted_end_price": round(last_price, 2),
            "predicted_range_low": round(last_price, 2),
            "predicted_range_high": round(last_price, 2),
            "forecast_points": forecast_points,
            "forecast_summary": t(lang, "forecast_result_sentence", days=forecast_days, change="0.00", price=f"{last_price:.2f}", low=f"{last_price:.2f}", high=f"{last_price:.2f}"),
        }

    returns = []
    for prev, curr in zip(prices[:-1], prices[1:]):
        if prev:
            returns.append((curr - prev) / prev)
    mean_r = sum(returns) / len(returns) if returns else 0.0
    vol = 0.0
    if returns:
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

    short_ma = moving_average(prices, 5)
    long_ma = moving_average(prices, 20)
    short_slope = slope_last(short_ma)
    long_slope = slope_last(long_ma)
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

    last_10_mean = sum(returns[-10:]) / min(len(returns), 10) if returns else 0.0
    short_ret = short_slope / last_price if last_price else 0.0
    long_ret = long_slope / last_price if last_price else 0.0
    expected_daily = (0.5 * short_ret) + (0.25 * long_ret) + (0.25 * last_10_mean)
    clamp = max(0.005, min(0.04, (vol * 2.2) if vol else 0.02))
    if expected_daily > clamp:
        expected_daily = clamp
    elif expected_daily < -clamp:
        expected_daily = -clamp

    predicted_change = ((1 + expected_daily) ** forecast_days - 1) * 100
    predicted_end_price = last_price * ((1 + expected_daily) ** forecast_days)
    band_pct = vol * (forecast_days ** 0.5) * 100
    range_low = predicted_end_price * (1 - band_pct / 100)
    range_high = predicted_end_price * (1 + band_pct / 100)

    future_days = next_trading_days(points[-1]["date"], forecast_days) if points else []
    forecast_points = []
    running_price = last_price
    for day in future_days:
        running_price = running_price * (1 + expected_daily)
        forecast_points.append({"date": day, "close": round(running_price, 2)})

    forecast = t(lang, "forecast_sentence", days=forecast_days, direction=direction)
    forecast_summary = t(
        lang,
        "forecast_result_sentence",
        days=forecast_days,
        change=f"{predicted_change:+.2f}",
        price=f"{predicted_end_price:.2f}",
        low=f"{range_low:.2f}",
        high=f"{range_high:.2f}",
    )
    return {
        "analysis": analysis,
        "forecast": forecast,
        "confidence": confidence,
        "key_factors": [
            t(lang, "factor_5ma"), t(lang, "factor_20ma"), t(lang, "factor_change"), t(lang, "factor_vol"), t(lang, "factor_events")
        ],
        "predicted_change_pct": round(predicted_change, 2),
        "predicted_end_price": round(predicted_end_price, 2),
        "predicted_range_low": round(range_low, 2),
        "predicted_range_high": round(range_high, 2),
        "forecast_points": forecast_points,
        "forecast_summary": forecast_summary,
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


def fetch_remote_suggestions(query: str, limit: int = 50) -> List[Dict[str, str]]:
    q = (query or "").strip()
    if not q:
        return []
    params = urllib.parse.urlencode({"q": q, "quotesCount": str(limit), "newsCount": "0", "enableFuzzyQuery": "false"})
    url = f"{YAHOO_SEARCH_ENDPOINT}?{params}"
    try:
        payload = _fetch_json(url)
    except Exception:
        return []

    target = q.upper()
    items: List[Dict[str, str]] = []
    seen: set[str] = set()
    for raw in payload.get("quotes") or []:
        symbol = str(raw.get("symbol") or "").upper().strip()
        name = str(raw.get("shortname") or raw.get("longname") or raw.get("name") or symbol).strip()
        exch = str(raw.get("exchange") or raw.get("exchDisp") or "").strip()
        quote_type = str(raw.get("quoteType") or "").lower()
        if not symbol or symbol in seen:
            continue
        if quote_type not in {"equity", "etf", "index", "mutualfund", "adr", "trust", "crypto"} and quote_type:
            continue
        seen.add(symbol)
        display_name = name if not exch else f"{name} · {exch}"
        items.append({"symbol": symbol, "name": display_name})

    starts = [it for it in items if it["symbol"].startswith(target) or it["name"].upper().startswith(target)]
    contains = [it for it in items if it not in starts and (target in it["symbol"] or target in it["name"].upper())]
    return (starts + contains)[:limit]


def suggest_tickers(query: str, limit: int = 50) -> List[Dict[str, str]]:
    q = (query or "").strip().upper()
    remote = fetch_remote_suggestions(q, limit=limit)

    if not q:
        local_starts = SUGGESTION_UNIVERSE[:]
        local_contains: List[Dict[str, str]] = []
    else:
        local_starts = []
        local_contains = []
        for item in SUGGESTION_UNIVERSE:
            symbol = item["symbol"].upper()
            name = item["name"].upper()
            if symbol.startswith(q) or name.startswith(q):
                local_starts.append(item)
            elif q in symbol or q in name:
                local_contains.append(item)

    ordered: List[Dict[str, str]] = []
    seen: set[str] = set()
    for bucket in (remote, local_starts, local_contains):
        for item in bucket:
            symbol = item["symbol"]
            if symbol in seen:
                continue
            seen.add(symbol)
            ordered.append(item)
            if len(ordered) >= limit:
                return ordered
    return ordered



def run_backtest(points: List[Dict[str, Any]], lang: str) -> Dict[str, Any]:
    lang = get_lang(lang)
    base = {
        "return_pct": 0.0,
        "max_drawdown_pct": 0.0,
        "win_rate_pct": 0.0,
        "trades": 0,
        "buy_hold_return_pct": 0.0,
        "alpha_vs_buy_hold_pct": 0.0,
        "equity_curve": [],
        "trade_log": [],
        "note": t(lang, "backtest_note"),
    }
    if len(points) < 30:
        return base

    closes = [float(p["close"]) for p in points]
    vols = [float(p.get("volume") or 0) for p in points]

    def rolling_mean(values: List[float], window: int) -> List[float | None]:
        out: List[float | None] = [None] * len(values)
        for i in range(window - 1, len(values)):
            out[i] = sum(values[i - window + 1:i + 1]) / window
        return out

    ma5 = rolling_mean(closes, 5)
    ma20 = rolling_mean(closes, 20)
    vol20 = rolling_mean(vols, 20)

    equity = 1.0
    peak = 1.0
    max_dd = 0.0
    position = False
    entry = 0.0
    entry_date = ""
    trade_returns: List[float] = []
    trade_log: List[Dict[str, Any]] = []
    equity_curve: List[Dict[str, Any]] = []

    for i in range(20, len(points)):
        point = points[i]
        price = closes[i]
        date = point.get("date") or ""
        buy_signal = (
            ma5[i] is not None and ma20[i] is not None and vol20[i] is not None and
            ma5[i] > ma20[i] and price > ma5[i] and vols[i] >= vol20[i]
        )
        sell_signal = (
            ma5[i] is not None and ma20[i] is not None and (ma5[i] < ma20[i] or price < ma5[i])
        )

        action = "HOLD"
        if not position and buy_signal:
            position = True
            entry = price
            entry_date = date
            action = "BUY"
        elif position and sell_signal:
            ret = (price - entry) / entry if entry else 0.0
            trade_returns.append(ret)
            equity *= (1 + ret)
            peak = max(peak, equity)
            dd = (equity - peak) / peak if peak else 0.0
            max_dd = min(max_dd, dd)
            trade_log.append({
                "entry_date": entry_date,
                "entry_price": round(entry, 2),
                "exit_date": date,
                "exit_price": round(price, 2),
                "return_pct": round(ret * 100, 2),
            })
            position = False
            entry = 0.0
            entry_date = ""
            action = "SELL"

        marked_equity = equity
        if position and entry:
            marked_equity = equity * (price / entry)
        peak = max(peak, marked_equity)
        dd_marked = (marked_equity - peak) / peak if peak else 0.0
        max_dd = min(max_dd, dd_marked)
        equity_curve.append({
            "date": date,
            "equity": round(marked_equity, 4),
            "close": round(price, 2),
            "action": action,
        })

    if position and entry:
        final_price = closes[-1]
        final_date = points[-1].get("date") or ""
        ret = (final_price - entry) / entry
        trade_returns.append(ret)
        equity *= (1 + ret)
        peak = max(peak, equity)
        dd = (equity - peak) / peak if peak else 0.0
        max_dd = min(max_dd, dd)
        trade_log.append({
            "entry_date": entry_date,
            "entry_price": round(entry, 2),
            "exit_date": final_date,
            "exit_price": round(final_price, 2),
            "return_pct": round(ret * 100, 2),
        })
        if equity_curve:
            equity_curve[-1]["equity"] = round(equity, 4)
            equity_curve[-1]["action"] = "SELL"

    trades = len(trade_returns)
    wins = sum(1 for r in trade_returns if r > 0)
    win_rate = (wins / trades * 100) if trades else 0.0
    buy_hold = ((closes[-1] / closes[20]) - 1) * 100 if closes[20] else 0.0
    strategy_return = (equity - 1) * 100
    base.update({
        "return_pct": round(strategy_return, 2),
        "max_drawdown_pct": round(abs(max_dd) * 100, 2),
        "win_rate_pct": round(win_rate, 2),
        "trades": trades,
        "buy_hold_return_pct": round(buy_hold, 2),
        "alpha_vs_buy_hold_pct": round(strategy_return - buy_hold, 2),
        "equity_curve": equity_curve,
        "trade_log": trade_log[-8:],
    })
    return base


def quote_snapshot(ticker: str) -> Dict[str, Any]:
    end = dt.date.today()
    start = end - dt.timedelta(days=45)
    result = _fetch_yahoo_chart(ticker, start.isoformat(), end.isoformat())
    meta = result.get("meta") or {}
    points = _extract_points(result)
    if len(points) < 2:
        raise RuntimeError("No recent quote data.")

    closes = [float(p["close"]) for p in points if p.get("close") is not None]
    if len(closes) < 2:
        raise RuntimeError("No recent quote data.")

    # Use the last two distinct trading-day closes so the displayed 1D change
    # matches the real close-to-close move from Yahoo Finance history.
    distinct = []
    for point in reversed(points):
        value = float(point["close"])
        if not distinct or round(value, 4) != round(distinct[-1]["close"], 4):
            distinct.append({"close": value, "date": point["date"]})
        if len(distinct) >= 2:
            break
    if len(distinct) < 2:
        raise RuntimeError("No recent quote data.")

    latest = distinct[0]
    previous = distinct[1]
    price = latest["close"]
    prev = previous["close"]
    change_pct = ((price - prev) / prev) * 100 if prev else 0.0

    recent = points[-12:]
    spark = [round(float(p["close"]), 2) for p in recent if p.get("close") is not None]

    return {
        "symbol": (meta.get("symbol") or ticker).upper(),
        "name": meta.get("shortName") or meta.get("longName") or ticker.upper(),
        "price": round(price, 2),
        "change_pct": round(change_pct, 2),
        "spark": spark,
        "last_date": latest["date"],
        "previous_close": round(prev, 2),
        "change_basis": "1D",
    }

def analyse_stock(config: AnalysisConfig) -> Dict[str, Any]:
    lang = get_lang(config.lang)
    data = _download_real_history(config)
    forecast = fallback_forecast(data["chart_points"], config.forecast_days, data["summary"], lang)
    backtest = run_backtest(data["chart_points"], lang)
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
        "date_range": f"{data['start_date_used']}{t(lang, 'date_range_sep')}{data['end_date_used']}",
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
        "forecast_summary": forecast["forecast_summary"],
        "forecast_metrics": {
            "predicted_change_pct": forecast["predicted_change_pct"],
            "predicted_end_price": forecast["predicted_end_price"],
            "predicted_range_low": forecast["predicted_range_low"],
            "predicted_range_high": forecast["predicted_range_high"],
        },
        "forecast_points": forecast["forecast_points"],
        "backtest": backtest,
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
        if parsed.path == "/api/suggest":
            params = urllib.parse.parse_qs(parsed.query)
            query = (params.get("q") or [""])[0]
            items = suggest_tickers(query, limit=50)
            self._send_json({"status": "ok", "items": items})
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
            forecast_days = int(payload.get("forecast_days", 7))
            lang = get_lang(payload.get("lang", "en"))
            if not ticker:
                self._send_json({"status": "error", "message": t(lang, "ticker_required")}, status=400)
                return
            if forecast_days < 1 or forecast_days > 30:
                self._send_json({"status": "error", "message": t(lang, "forecast_days")}, status=400)
                return
            start_date = str(payload.get("start_date", "")).strip()
            end_date = str(payload.get("end_date", "")).strip()
            if not start_date or not end_date:
                today = dt.date.today()
                end_date = today.isoformat()
                start_date = (today - dt.timedelta(days=365)).isoformat()
            if not validate_date(start_date) or not validate_date(end_date):
                self._send_json({"status": "error", "message": t(lang, "date_format")}, status=400)
                return
            if dt.datetime.strptime(end_date, "%Y-%m-%d").date() < dt.datetime.strptime(start_date, "%Y-%m-%d").date():
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
def main() -> None:
    port_env = os.environ.get("PORT")
    is_render = port_env is not None

    if is_render:
        host = "0.0.0.0"
        port = int(port_env)
    else:
        host = "127.0.0.1"
        port = PREFERRED_PORT
        for candidate in range(PREFERRED_PORT, PREFERRED_PORT + 20):
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
                if s.connect_ex(("127.0.0.1", candidate)) != 0:
                    port = candidate
                    break
    print("DEBUG is_render =", is_render)
    print("DEBUG host =", host)
    print("DEBUG port =", port)
    server = ThreadingHTTPServer((host, port), AppHandler)
    print("DEBUG server created successfully")

    if not is_render:
        threading.Timer(
            1.0,
            lambda: webbrowser.open(f"http://127.0.0.1:{port}/?v=15"),
        ).start()
        print(f"Server running at http://127.0.0.1:{port}")
        print("Keep this terminal open while the web app is running.")
    else:
        print(f"Server running on Render at 0.0.0.0:{port}")
 
    print("DEBUG entering serve_forever()")
    server.serve_forever()

if __name__ == "__main__":
    main()
