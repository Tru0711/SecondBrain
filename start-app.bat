@echo off
REM Start BSE Smart Task Tracker - Backend and Frontend

echo.
echo ================================================
echo BSE Smart Task Tracker - Startup Script
echo ================================================
echo.

REM Start Backend in a new terminal
echo [1/2] Starting Backend (Express Server on port 5000)...
start cmd /k "cd /d e:\SecondBrain\backend && npm run dev"

timeout /t 3 /nobreak

REM Start Frontend in a new terminal
echo [2/2] Starting Frontend (Vite Dev Server on port 3000)...
start cmd /k "cd /d e:\SecondBrain\frontend && npm run dev"

echo.
echo ================================================
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo API: http://localhost:5000/api
echo ================================================
echo.
echo Press CTRL+C in each terminal to stop the servers.
pause
