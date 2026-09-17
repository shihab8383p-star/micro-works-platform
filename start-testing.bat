@echo off
echo ============================================================
echo   MICROJOB PLATFORM - LOCAL TESTING SCRIPT
echo ============================================================
echo.

echo Step 1: Checking MongoDB connection...
echo.

node -e "const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/microjob-platform').then(() => { console.log('✅ MongoDB Connected!'); mongoose.disconnect(); process.exit(0); }).catch((err) => { console.log('❌ MongoDB Connection Failed!'); console.log(''); console.log('Please install MongoDB first:'); console.log('  - Download: https://www.mongodb.com/try/download/community'); console.log('  - Or see: INSTALL_LOCAL_MONGODB.md'); console.log(''); process.exit(1); });"

if errorlevel 1 (
    echo.
    echo ============================================================
    pause
    exit /b 1
)

echo.
echo Step 2: Initializing database...
echo.
call npm run init-db

if errorlevel 1 (
    echo.
    echo ❌ Database initialization failed!
    pause
    exit /b 1
)

echo.
echo Step 3: Starting server...
echo.
echo ============================================================
echo   SERVER STARTING
echo ============================================================
echo.
echo   Open your browser and go to:
echo   👉 http://localhost:5000
echo.
echo   Admin Login:
echo   📧 Email: admin@example.com
echo   🔑 Password: admin123
echo.
echo   Press Ctrl+C to stop the server
echo ============================================================
echo.

call npm run dev
