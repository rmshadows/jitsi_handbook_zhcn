---
id: dev-guide-mobile-jitsi-meet
title: Developer Guide for Jitsi Meet - 开发者指南
sidebar_label: Jitsi Meet development - Jitsi Meet开发
---

本指南将帮助您设置一个开发环境，以便开始在 Jitsi Meet 移动应用程序本身上工作。

:::caution
不支持在 Windows 上构建应用程序/SDK。
:::

## 概述

:::note
本指南是关于构建 Jitsi Meet 应用程序本身的。如果您想将 Jitsi Meet SDK 集成到自己的应用程序中，请查看侧边栏上的专用页面。
:::

Jitsi Meet 可以构建为 Android 或 iOS 的独立应用程序。它使用 [React Native] 框架。

首先，确保安装以下依赖项：

* `watchman`
* `nodejs`
* `npm`

:::warning Node 版本
需要 Node 20.x 和 npm 10.x。任何其他版本可能会导致运行时错误。
:::

:::note Xcode
需要 Xcode 15 或更高版本。
:::

## iOS

1. 安装依赖项

  - 安装主要依赖项：

    ```bash
    npm install
    ```

  - 安装所需的 pods（必须先安装 CocoaPods，可以通过 Homebrew 完成：`brew install cocoapods`）

    ```bash
    cd ios
    pod install
    cd ..
    ```

2. 使用 Xcode 构建应用程序

   - 在 Xcode 中打开 `ios/jitsi-meet.xcworkspace`。确保它是工作区文件！

   - 从顶部栏选择您的设备，然后点击 **Play ▶️** 按钮。

   当应用程序从 Xcode 启动时，调试控制台将显示应用程序输出日志。

3. 其他备注

   您可能需要更改在设备上部署时的 bundle ID。
   这可以在 **General** 选项卡中更改。在 **Identity** 下将 **Bundle Identifier** 设置为不同的值，并在 **Signing** 部分调整 **Team** 以匹配您自己的信息。


## Android

确保安装了 [Android Studio]。

将 Android Studio 中的 JDK 设置为至少 Java 11：https://developer.android.com/studio/intro/studio-config#jdk

### 添加额外依赖项

由于我们的项目结构，React Native 的自动链接将无法工作，因此 Android 依赖项需要手动链接。

首先，将您的项目添加到 `android/settings.gradle`，如下所示：

```gradle title="android/settings.gradle"
include ':react-native-mydependency'
project(':react-native-mydependency').projectDir = new File(rootProject.projectDir, '../node_modules/@somenamespace/react-native-mydependency/android')
```

然后在 `android/sdk/build.gradle` 中添加依赖项，如下所示：

```gradle title="android/sdk/build.gradle"
implementation project(':react-native-mydependency')
```

最后，在 `android/sdk/src/main/java/org/jitsi/meet/sdk/ReactInstanceManagerHolder.java` 中的 `getReactNativePackages` 方法中链接它，如下所示：

```java title="android/sdk/src/main/java/org/jitsi/meet/sdk/ReactInstanceManagerHolder.java"
new com.companyname.library.AwesomeLibraryPackage(),
```

确保您调整完全限定的包名。

## 调试

官方文档关于 [调试] 的内容相当详细，并指定了首选的调试方法。

:::note
使用 Chrome 开发者工具调试时，JavaScript 源代码是由 Chrome 的 V8 引擎解释的，而不是 React Native 使用的 JSCore。由于可能存在支持的 JavaScript 特性差异，请务必牢记这一点。还要注意，Jitsi Meet 不支持 Flipper。
:::

## 启用额外功能

- [Dropbox 集成](mobile-dropbox.md)
- [Google 登录集成（用于 YouTube 直播）](mobile-google-auth.md)

[Android Studio]: https://developer.android.com/studio/index.html
[debugging]: https://facebook.github.io/react-native/docs/debugging/
[React Native]: https://facebook.github.io/react-native/
