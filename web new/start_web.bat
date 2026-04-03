@echo off
cd /d %~dp0

echo Starting CP3405 Smart Stock Dashboard with AI Assistant...
echo If you want the AI chat to work locally, create a .env file and add OPENAI_API_KEY.
echo Keep this terminal window open while using the webpage.
echo.

where py >nul 2>nul
if %errorlevel%==0 (
    py -3 server.py
    goto :end
)

where python >nul 2>nul
if %errorlevel%==0 (
    python server.py
    goto :end
)

echo Python 3 was not found on this computer.
pause
:end
