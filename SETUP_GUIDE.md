# KasirKu Pro - Setup & Build Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm atau yarn
- Android Studio + Android SDK (untuk Android)
- Java Development Kit (JDK) 11+

### Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/prokasir4-coder/kasirku-pro.git
   cd kasirku-pro
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Setup Environment**
   ```bash
   cp .env.example .env
   # Edit .env sesuai konfigurasi Anda
   ```

4. **Run Development Server**
   ```bash
   npm start
   ```

---

## 📱 Build & Run Android

### Development Mode
```bash
# Pastikan emulator atau device sudah tersambung
npm run android
```

### Build APK untuk Testing (Debug APK)
```bash
cd android
./gradlew assembleDebug
# Output: android/app/build/outputs/apk/debug/app-debug.apk
```

### Build APK untuk Release (Production)

**1. Generate Keystore** (hanya 1x pertama)
```bash
keytool -genkey -v -keystore kasirku-pro.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias kasirku-pro-key
```

**2. Konfigurasi Signing di `android/app/build.gradle`**
```gradle
signingConfigs {
    release {
        storeFile file('../kasirku-pro.keystore')
        storePassword 'YOUR_STORE_PASSWORD'
        keyAlias 'kasirku-pro-key'
        keyPassword 'YOUR_KEY_PASSWORD'
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

**3. Build Release APK**
```bash
cd android
./gradlew assembleRelease
# Output: android/app/build/outputs/apk/release/app-release.apk
```

---

## 📦 Output Files

Setelah build selesai, APK akan tersedia di:

**Debug APK:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

**Release APK:**
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## 💾 Preparing for ZIP & Upload

### 1. Clean Build Artifacts
```bash
cd android
./gradlew clean
cd ..
```

### 2. Create ZIP File
```bash
# Di root directory kasirku-pro
zip -r kasirku-pro.zip . \
  -x "node_modules/*" \
  "android/.gradle/*" \
  "android/app/build/*" \
  ".git/*" \
  "*.jks" \
  ".env"
```

Atau gunakan Tools:
- **Windows**: Klik kanan folder → Send to → Compressed folder
- **Mac/Linux**: `zip -r kasirku-pro.zip .`

### 3. Push ke Repository
```bash
git add .
git commit -m "Initial KasirKu Pro setup"
git push origin main
```

---

## 📋 Checklist Sebelum Build APK

- ✅ Update app version di `android/app/build.gradle`
- ✅ Buat keystore file (`kasirku-pro.keystore`)
- ✅ Update build.gradle dengan signing config
- ✅ Test di emulator/device development
- ✅ Pastikan semua dependencies terinstall
- ✅ Update AndroidManifest.xml jika perlu permissions
- ✅ Set app icon di `android/app/src/main/res/`

---

## 🔧 Common Issues & Solutions

### Error: "ANDROID_HOME not set"
```bash
# Set ANDROID_HOME
export ANDROID_HOME=$HOME/Library/Android/sdk  # Mac/Linux
# atau Windows: setx ANDROID_HOME "C:\Users\YourUser\AppData\Local\Android\sdk"
```

### Error: "Gradle sync failed"
```bash
cd android
./gradlew sync
cd ..
```

### Error: "Unable to boot emulator"
```bash
# Buat emulator baru di Android Studio
# atau gunakan device fisik
adb devices  # Check connected devices
```

---

## 📚 Project Structure

```
kasirku-pro/
├── src/
│   ├── screens/         # Screen components
│   ├── services/        # API services
│   ├── store/           # State management
│   ├── types/           # TypeScript types
│   ├── navigation/      # Navigation setup
│   └── App.tsx          # Root component
├── android/             # Android native code
├── ios/                 # iOS native code (opsional)
├── package.json         # Dependencies
├── app.json             # React Native config
├── .env.example         # Environment template
└── README.md            # Full documentation
```

---

## 🎯 Next Development Steps

1. **Implement Backend API**
   - Setup Node.js/Express server
   - Create database (PostgreSQL/MongoDB)
   - Implement auth endpoints
   - Create transaction endpoints

2. **Add Features**
   - Barcode scanner integration
   - Receipt printer support
   - Offline mode (SQLite)
   - Push notifications

3. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests

4. **Deployment**
   - Google Play Store submission
   - Firebase setup
   - Monitoring & analytics

---

## 📱 Testing APK

### Install Debug APK ke Device
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Install Release APK ke Device
```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

### Uninstall APK
```bash
adb uninstall com.kasirkupro
```

---

## 📞 Support

Jika ada error atau pertanyaan, silakan:
1. Check file SETUP_GUIDE.md ini
2. Buka GitHub Issues
3. Contact: prokasir4-coder@example.com

---

**Version**: 1.0.0  
**Last Updated**: 2026-08-17
