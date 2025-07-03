---
id: mobile-dropbox
title: Setting up Dropbox integration - 设置 Dropbox 集成
---

1. 创建一个 Dropbox 应用。

2. 将以下内容添加到 `ios/app/src/Info.plist` 中，将 `<APP_KEY>` 替换为您自己的 Dropbox 应用密钥（可以在 [App Console](https://www.dropbox.com/developers/apps) 中找到）：

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLName</key>
    <string></string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>db-<APP_KEY></string>
    </array>
  </dict>
</array>
<key>LSApplicationQueriesSchemes</key>
<array>
  <string>dbapi-2</string>
  <string>dbapi-8-emm</string>
</array>
```

**注意：** Android 和 iOS 应用的构建将从 `ios/app/src/Info.plist` 中解析 Dropbox 应用密钥。

**注意：** 有关更多信息，请参见 [Dropbox 开发者指南](https://www.dropbox.com/developers/reference/developer-guide)。
