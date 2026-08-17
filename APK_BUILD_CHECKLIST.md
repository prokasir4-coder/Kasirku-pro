# KasirKu Pro - Checklist Mempersiapkan APK

## ✅ Pre-Build Checklist

### 1. Environment Setup
- [ ] Node.js 16+ terinstall (`node -v`)
- [ ] npm 7+ terinstall (`npm -v`)
- [ ] Android Studio terinstall
- [ ] Android SDK Level 31+ terinstall
- [ ] JDK 11+ terinstall (`java -version`)
- [ ] ANDROID_HOME environment variable set

### 2. Project Setup
- [ ] Repository di-clone
- [ ] `npm install` sudah dijalankan
- [ ] `.env` file sudah dibuat dari `.env.example`
- [ ] Tidak ada error saat `npm start`
- [ ] Project struktur lengkap (`src/` folder ada)

### 3. Configuration
- [ ] Update `app.json` dengan app name & version
- [ ] Update `package.json` version sesuai rencana
- [ ] Check `android/app/build.gradle` - versionCode & versionName
- [ ] Set app icon di `android/app/src/main/res/`
- [ ] Check `AndroidManifest.xml` untuk permissions

### 4. Testing (Development)
- [ ] Run `npm run android` berhasil
- [ ] Emulator/device bisa detect
- [ ] App bisa launch di emulator/device
- [ ] Login screen tampil
- [ ] Tidak ada console errors

### 5. Build Preparation (Debug APK)
- [ ] Jalankan `npm run build:android` atau `./build.sh debug`
- [ ] APK generated di `android/app/build/outputs/apk/debug/`
- [ ] Test install debug APK ke device: `adb install app-debug.apk`
- [ ] App bisa buka & functional di device

### 6. Release Build Preparation
- [ ] Keystore sudah di-generate: `kasirku-pro.keystore`
- [ ] Keystore password & key password dicatat
- [ ] `build.gradle` sudah configured dengan signing config
- [ ] Verify keystore valid: `keytool -list -v -keystore kasirku-pro.keystore`

### 7. Final Release APK Build
- [ ] Clean build: `cd android && ./gradlew clean && cd ..`
- [ ] Build release: `./build.sh release` atau `npm run build:android`
- [ ] Release APK generated di `android/app/build/outputs/apk/release/`
- [ ] File size reasonable (~50-100MB)
- [ ] Test install release APK: `adb install -r app-release.apk`

### 8. Code Quality
- [ ] Run `npm run lint` - no critical errors
- [ ] Run `npm run type-check` - no TypeScript errors
- [ ] No console.log left in production code
- [ ] Remove debug code

### 9. Documentation
- [ ] README.md updated
- [ ] SETUP_GUIDE.md reviewed
- [ ] Code comments added untuk complex logic
- [ ] API documentation ready (if applicable)

### 10. Repository Management
- [ ] `.gitignore` updated (excludes node_modules, build, keystore)
- [ ] All changes committed: `git add . && git commit -m "..."`
- [ ] Push to GitHub: `git push origin main`
- [ ] Repository tags created: `git tag v1.0.0 && git push origin --tags`

### 11. Pre-ZIP Cleanup
- [ ] Delete `node_modules` (besar, akan install ulang)
- [ ] Delete `android/.gradle` (temporary build files)
- [ ] Delete `android/app/build` (temporary build files)
- [ ] Keep keystore file (`kasirku-pro.keystore`) - jangan di-ZIP jika public repo
- [ ] Jangan ZIP `.env` - gunakan `.env.example` saja

### 12. Create ZIP Package
- [ ] Jalankan cleanup script atau manual delete
- [ ] Create ZIP: `zip -r kasirku-pro.zip .` (exclude files above)
- [ ] Verify ZIP contents tidak terlalu besar (~5-10MB)
- [ ] Keep backup ZIP file

### 13. Upload ke Repository
- [ ] Push all commits to GitHub
- [ ] Create GitHub Release dengan APK file
- [ ] Upload Release APK ke GitHub Releases
- [ ] Add release notes

## 📋 Quick Command Reference

```bash
# Setup awal
npm install
cp .env.example .env

# Development testing
npm start
npm run android

# Build Debug APK
npm run build:android
./build.sh debug

# Build Release APK
keytool -genkey -v -keystore kasirku-pro.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias kasirku-pro-key
./build.sh release

# Git workflow
git add .
git commit -m "Prepare for v1.0.0 release"
git push origin main
git tag v1.0.0
git push origin --tags

# Clean for ZIP
cd android && ./gradlew clean && cd ..
rm -rf node_modules android/.gradle android/app/build

# Create ZIP
zip -r kasirku-pro.zip . -x "node_modules/*" "android/.gradle/*" "android/app/build/*" ".git/*" "*.jks" ".env"
```

## 🎯 Success Criteria

- ✅ Debug APK bisa di-install & berjalan
- ✅ Release APK bisa di-install & berjalan  
- ✅ No console errors di production build
- ✅ UI responsive & tidak ada crashes
- ✅ All screens accessible
- ✅ Git repository updated
- ✅ ZIP file ready untuk distribution

## 🔄 Troubleshooting

| Issue | Solution |
|-------|----------|
| ANDROID_HOME not set | Set env var: `export ANDROID_HOME=...` |
| Gradle sync failed | Run: `cd android && ./gradlew sync && cd ..` |
| Build failed | Clean & rebuild: `./gradlew clean assembleDebug` |
| APK install failed | Uninstall old: `adb uninstall com.kasirkupro` |
| Device not detected | Check: `adb devices` |

## ✨ Tips

- Always test pada real device sebelum release
- Keep keystore safe - jangan commit ke public repo
- Document semua passwords dan secrets di secure place
- Incrementally test features, jangan sekaligus
- Backup project sebelum major changes

---

**Created**: 2026-08-17  
**For**: KasirKu Pro v1.0.0
