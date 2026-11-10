@echo off
title YTCreatorFinder
cd /d "%~dp0"
echo =======================================================
echo Starting YTCreatorFinder on http://localhost:3000...
echo =======================================================
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:3000"
node server.js
pause
