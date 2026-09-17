@echo off
echo ========================================
echo MICRO WORKS - DEPLOY TO GITHUB
echo ========================================
echo.

cd /d "%~dp0"

echo Step 1: Initialize Git...
git init

echo Step 2: Add all files...
git add .

echo Step 3: Commit files...
git commit -m "Deploy Micro Works Platform"

echo Step 4: Add remote repository...
set /p REPO="Enter your repository URL (e.g., https://github.com/manillashihab07/micro-works.git): "
git remote add origin %REPO%

echo Step 5: Push to GitHub...
git branch -M main
git push -u origin main

echo.
echo ========================================
echo DEPLOYMENT COMPLETE!
echo ========================================
pause
