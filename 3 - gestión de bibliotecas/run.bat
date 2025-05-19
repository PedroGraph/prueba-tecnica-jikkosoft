@echo off
setlocal

REM Get the directory where this script is located
set "SCRIPT_DIR=%~dp0"
set "BACKEND_DIR=%SCRIPT_DIR%backend"
set "FRONTEND_DIR=%SCRIPT_DIR%frontend"

echo Checking dependencies...

REM Check and install backend dependencies
if not exist "%BACKEND_DIR%\node_modules" (
    echo Installing backend dependencies...
    cd /d "%BACKEND_DIR%" && npm install
)

echo Checking frontend dependencies...
if not exist "%FRONTEND_DIR%\node_modules" (
    echo Installing frontend dependencies...
    cd /d "%FRONTEND_DIR%" && npm install
)

echo Starting backend server...
start cmd /k "cd /d "%BACKEND_DIR%" && npm run dev"

echo Waiting for backend to start...
timeout /t 3 >nul

echo Starting frontend server...
start cmd /k "cd /d "%FRONTEND_DIR%" && npm run dev"

echo Both servers are running!
echo Press any key to exit...
pause >nul
endlocal
