@echo off
cd /d %~dp0

echo Starting CP3405 Smart Stock Dashboard v7...
echo This version opens on a fresh local port and disables cache.
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
