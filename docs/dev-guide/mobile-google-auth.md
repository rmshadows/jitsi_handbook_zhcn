---
id: mobile-google-auth
title: Setting up Google sign-in integration - 设置 Google 登录集成
---

- 在此处创建 Firebase 项目：https://firebase.google.com/。您需要一个已签名的 Android 构建，您也可以使用调试自签名构建，只需获取签名哈希即可。已签名应用的密钥哈希可以通过以下方式获取（在 macOS 上）：
  ```bash
  keytool -list -printcert -jarfile the-app.apk
  ```
- 将生成的 `google-services.json` 文件放置在 `android/app` 中，iOS 的 `GoogleService-Info.plist` 文件放置在 `ios/app` 中（您可以在此步骤停止，不需要执行向导中建议的驱动程序和代码更改）。
- 您可能希望在您的 GIT 配置中排除这些文件（请勿在应用程序本身的 `.gitignore` 中排除它们！）。
- 您的网络客户端 ID 在创建 Firebase 项目时会自动生成。可以在 Google 开发者控制台中找到它们（https://console.developers.google.com/）。
- 确保您的配置反映此 ID，通过在 config.js 中设置 `googleApiApplicationClientID`。
- 将您的 iOS 客户端 ID（plist 文件中的 REVERSED_CLIENT_ID）作为应用程序 URL 架构添加到 `ios/app/src/Info.plist` 中（替换占位符）。
- 在开发者控制台中启用 YouTube API 访问（见上文），以启用直播。
