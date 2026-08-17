@echo off
REM KasirKu Pro - Build Script untuk Windows
REM This script automates the APK build process

setlocal enabledelayedexpansion

echo.
echo KasirKu Pro Build Script
echo ================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

REM Build type
set BUILD_TYPE=%1
if "%BUILD_TYPE%"=="" set BUILD_TYPE=debug

if "%BUILD_TYPE%"=="debug" (
    echo Building Debug APK...
    cd android
    call gradlew.bat assembleDebug
    cd ..
    echo.
    echo [SUCCESS] Debug APK built successfully!
    echo Location: android\app\build\outputs\apk\debug\app-debug.apk
    
) else if "%BUILD_TYPE%"=="release" (
    echo Building Release APK...
    
    if not exist "kasirku-pro.keystore" (
        echo [ERROR] Keystore not found!
        echo Generate keystore first:
        echo keytool -genkey -v -keystore kasirku-pro.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias kasirku-pro-key
        exit /b 1
    )
    
    cd android
    call gradlew.bat assembleRelease
    cd ..
    echo.
    echo [SUCCESS] Release APK built successfully!
    echo Location: android\app\build\outputs\apk\release\app-release.apk
    
) else (
    echo [ERROR] Invalid build type. Use 'debug' or 'release'
    exit /b 1
)

echo.
echo [SUCCESS] Build completed!
pause
