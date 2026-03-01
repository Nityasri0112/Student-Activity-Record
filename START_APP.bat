@echo off
echo ========================================
echo    SmartHub - Starting Application
echo ========================================
echo.

echo [1/3] Starting MongoDB...
echo Please make sure MongoDB Compass is running!
echo Connection: mongodb://localhost:27017
echo.
pause

echo [2/3] Starting Backend Server...
start cmd /k "cd backend && npm install && npm start"
timeout /t 5

echo [3/3] Starting Frontend...
start cmd /k "cd smart-hub && npm install && npm run dev"

echo.
echo ========================================
echo    SmartHub Started Successfully!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit...
pause
