CP3405 Smart Stock Dashboard + AI Assistant

What was added
- AI Assistant panel in the News & Watchlist page
- Backend `/api/llm-chat` endpoint
- Uses current dashboard context (ticker, analysis, forecast, backtest, news)
- Local chat history is saved in browser localStorage
- Supports local `.env` loading

How to use locally
1. Copy `.env.example` to `.env`
2. Put your API key into `OPENAI_API_KEY`
3. Optional: change `OPENAI_MODEL`
4. Run `start_web.bat` or `python server.py`
5. Open the site, load a ticker, then go to `News & Watchlist` and use the AI Assistant

Environment variables
- `OPENAI_API_KEY`: required for chat
- `OPENAI_MODEL`: optional, default is `gpt-4o-mini`
- `OPENAI_BASE_URL`: optional for OpenAI-compatible endpoints

Notes
- The AI assistant does not guarantee future stock movement
- It answers using the current page data plus your question
- On Render, add the same environment variables in the dashboard settings
