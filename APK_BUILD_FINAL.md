# 🎯 KASIRKU PRO - BUILD APK FINAL GUIDE

## ⚡ UNTUK BUILD APK SEKARANG

### Step 1: Buka Terminal/CMD
```bash
cd kasirku-pro
```

### Step 2: Install Dependencies (jika belum)
```bash
npm install
```

### Step 3: Build DEBUG APK (5 Menit)
```bash
cd android
./gradlew assembleDebug
cd ..
```
**HASIL:** `android/app/build/outputs/apk/debug/app-debug.apk`

### Step 4: Install ke Device/Emulator
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🔐 UNTUK BUILD RELEASE APK (Play Store)

### Step 1: Generate Keystore (PERTAMA KALI)
```bash
keytool -genkey -v -keystore kasirku-pro.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias kasirku-pro-key
```
**Isikan:**
- Nama: KasirKu Pro
- Organisasi: Your Company
- Negara: ID
- Password: (SIMPAN DENGAN AMAN!)

### Step 2: Edit `android/app/build.gradle`

Buka file `android/app/build.gradle`, cari `android {}` section:

```gradle
android {
    namespace "com.kasirkupro"
    compileSdk 33

    defaultConfig {
        applicationId "com.kasirkupro"
        minSdk 21
        targetSdk 33
        versionCode 1
        versionName "1.0.0"
    }

    signingConfigs {
        release {
            storeFile file('../kasirku-pro.keystore')
            storePassword 'YOUR_PASSWORD_HERE'
            keyAlias 'kasirku-pro-key'
            keyPassword 'YOUR_PASSWORD_HERE'
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

### Step 3: Build Release APK
```bash
cd android
./gradlew assembleRelease
cd ..
```
**HASIL:** `android/app/build/outputs/apk/release/app-release.apk`

### Step 4: Install Release APK
```bash
adb install -r android/app/build/outputs/apk/release/app-release.apk
```

---

## 📱 DIMANA APK HASIL BUILD?

### Debug APK
📍 **Lokasi**: `android/app/build/outputs/apk/debug/app-debug.apk`

Gunakan untuk:
- Testing development
- Testing di emulator
- Debugging

### Release APK
📍 **Lokasi**: `android/app/build/outputs/apk/release/app-release.apk`

Gunakan untuk:
- Upload ke Play Store
- Distribusi ke user
- Production

---

## ✅ CHECKLIST SEBELUM BUILD

- [ ] Android Studio terinstall
- [ ] Android SDK terinstall (min API 21)
- [ ] JDK 11+ terinstall
- [ ] ANDROID_HOME environment variable set
- [ ] node_modules sudah di-install (`npm install`)
- [ ] Emulator running atau device connected (`adb devices`)

---

## 🐛 ERROR SOLUTIONS

### Error: "ANDROID_HOME not set"
```bash
# Mac/Linux
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

# Windows
setx ANDROID_HOME "C:\Users\YourUser\AppData\Local\Android\sdk"
```

### Error: "device not found"
```bash
# Check connected devices
adb devices

# Troubleshoot
adb kill-server
adb start-server
adb devices
```

### Error: "Gradle build failed"
```bash
cd android
./gradlew clean
./gradlew assembleDebug
cd ..
```

### Error: "Keystore not found"
- Generate keystore dulu dengan keytool command
- Pastikan file `kasirku-pro.keystore` ada di root folder

---

## 🚀 QUICK COMMANDS

| Command | Result |
|---------|--------|
| `npm install` | Install dependencies |
| `npm start` | Start Metro bundler |
| `npm run android` | Build & run di emulator |
| `cd android && ./gradlew assembleDebug && cd ..` | Build Debug APK |
| `cd android && ./gradlew assembleRelease && cd ..` | Build Release APK |
| `adb install path/to/apk.apk` | Install APK |
| `adb uninstall com.kasirkupro` | Uninstall app |

---

## 📊 FILE SIZES

| Type | Size |
|------|------|
| Debug APK | ~80-100 MB |
| Release APK | ~50-70 MB |
| node_modules folder | ~500 MB |

---

## 🎯 NEXT STEPS AFTER BUILD

1. ✅ Test APK di emulator/device
2. ✅ Verify semua fitur berjalan
3. ✅ Check tidak ada console errors
4. ✅ Update app version (untuk next release)
5. ✅ Commit ke GitHub
6. ✅ Upload ke Play Store (untuk release)

---

## 📞 HELP & SUPPORT

### Resources
- React Native Docs: https://reactnative.dev
- Android Docs: https://developer.android.com
- Gradle: https://gradle.org

### Common Issues
- Check APK_QUICK_START.md
- Check SETUP_GUIDE.md
- Check repo GitHub issues

---

**Happy Building! 🎉**

Created: 2026-08-17
Version: KasirKu Pro v1.0.0
