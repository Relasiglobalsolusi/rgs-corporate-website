@echo off
cd /d "%~dp0"
echo Starting RGS Corporate Website at http://localhost:3001
echo (ERP system runs separately at http://localhost:3000)
call npm run dev
pause
