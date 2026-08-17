# 🚀 KasirKu Pro - APK BUILD QUICK START

## ⚡ Super Cepat (5 Menit)

### Debug APK (untuk testing)
```bash
npm install
npm run android
```
✅ APK siap di emulator/device!

---

## 📦 Release APK (untuk Play Store)

### Step 1: Setup Keystore (PERTAMA KALI SAJA)
```bash
keytool -genkey -v -keystore kasirku-pro.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias kasirku-pro-key
```
**⚠️ SIMPAN PASSWORD DI TEMPAT AMAN!**

### Step 2: Edit `android/app/build.gradle`
Cari section `android {}` dan tambahkan:

```gradle
android {
    ...
    
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
}
```

### Step 3: Build Release APK
```bash
cd android
./gradlew assembleRelease
cd ..
```

**Output:** `android/app/build/outputs/apk/release/app-release.apk`

✅ **APK Ready untuk Play Store!**

---

## 🎯 Install APK ke Device

### Debug APK
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Release APK
```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

### Uninstall
```bash
adb uninstall com.kasirkupro
```

---

## 🛠️ Troubleshooting

| Error | Solusi |
|-------|--------|
| `ANDROID_HOME not set` | `export ANDROID_HOME=$HOME/Library/Android/sdk` |
| `Keystore not found` | Generate dengan keytool command di atas |
| `Gradle build failed` | `cd android && ./gradlew clean && cd ..` |
| `Device not detected` | `adb devices` - pastikan USB debugging ON |

---

## 📝 Versioning

**Update sebelum build release:**

Edit `android/app/build.gradle`:
```gradle
android {
    defaultConfig {
        versionCode 1        // Increment untuk setiap release
        versionName "1.0.0"  // Versi publik
    }
}
```

---

## 🎁 Upload ke Play Store

1. Login ke [Google Play Console](https://play.google.com/console)
2. Create App
3. Fill Store Listing (deskripsi, screenshot, dll)
4. Upload Release APK
5. Fill content rating questionnaire
6. Set pricing & distribution
7. Submit for review

---

## ✅ Final Checklist

- ✅ Keystore sudah dibuat & tersimpan aman
- ✅ build.gradle sudah di-update dengan signing config
- ✅ Version code & name sudah di-update
- ✅ App icon sudah di-set
- ✅ APK berhasil di-build tanpa error
- ✅ APK bisa di-install ke device
- ✅ App bisa buka & functional
- ✅ Tidak ada console errors

---

**Happy Building! 🎉**
