---
id: dev-guide-react-native-sdk
title: React Native SDK
---

Jitsi React Native SDK 提供与 Jitsi Meet 应用相同的用户体验，以可自定义的方式嵌入到您的 React Native 应用中。

## 使用 React Native SDK 的示例应用

如果您想看看如何将 Jitsi React Native SDK 轻松集成到 React Native 应用中，请查看<br/>
[示例应用程序仓库](https://github.com/jitsi/jitsi-meet-sdk-samples#react-native)。

## 用法

虽然这是一个发布的库，您可以通过 `npm i @jitsi/react-native-sdk` 安装。<br/>
可能会出现 RNSDK 和您的应用之间的依赖冲突。<br/>如果出现这种情况，请运行 `npm i @jitsi/react-native-sdk --force`。<br/>
要检查是否需要添加一些依赖项，请运行以下脚本 `node node_modules/@jitsi/react-native-sdk/update_dependencies.js`。<br/>
这将同步我们的所有同级依赖项与您的依赖项。<br/>
接下来，您需要执行 `npm install`。

由于我们的 SDK 使用 SVG 文件，您需要相应地更新您的 metro bundler 配置：

```config title="metro.config"
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: {
      sourceExts,
      assetExts
    }
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg']
    }
  }
})();
```

### 安卓

#### 权限

- 在 `android/app/src/debug/AndroidManifest.xml` 和 `android/app/src/main/AndroidManifest.xml` 中，在 `</application>` 标签下，请添加

  ```xml
   <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
   <uses-permission android:name="android.permission.BLUETOOTH" />
   <uses-permission android:name="android.permission.CAMERA" />
   <uses-permission android:name="android.permission.INTERNET" />
   <uses-permission android:name="android.permission.MANAGE_OWN_CALLS" />
   <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
   <uses-permission android:name="android.permission.RECORD_AUDIO" />
   <uses-permission android:name="android.permission.WAKE_LOCK" />
   <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
  ```

- 从 Android 14 开始，特定的前台服务类型权限需要在清单文件中添加：

  ```xml
   <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
   <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK" />
   <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PROJECTION" />
  ```

#### 服务

- 要启用屏幕共享功能，您现在需要进入 `MainApplication.java` 文件并：
  1. `import com.oney.WebRTCModule.WebRTCModuleOptions;` 来自 `react-native-webrtc` 依赖项。

  2. `WebRTCModuleOptions options = WebRTCModuleOptions.getInstance();` 实例化它。
  3. `options.enableMediaProjectionService = true;` 启用处理屏幕共享功能的前台服务。

#### API

- 我们的应用使用 `react-native-orientation-locker` 依赖项，该依赖项使用 API 33 功能。确保您的应用在 `android\build.gradle` 中至少针对该版本：

  ```markdown
    buildscript {
        ext {
            compileSdkVersion = 33
            targetSdkVersion = 33
        }
    }
  ```

### iOS

#### 权限

- React Native SDK 请求摄像头和麦克风访问，请确保在您的 `Info.plist` 文件中包含 `NSCameraUsageDescription` 和 `NSMicrophoneUsageDescription` 的必要条目。
- React Native SDK 根据会议状态显示和隐藏状态栏，您可能希望在 `Info.plist` 文件中将 `UIViewControllerBasedStatusBarAppearance` 设置为 `NO`。
- 要启动屏幕共享，React Native SDK 提供 UI 以向用户展示 `RPSystemBroadcastPickerView`。默认情况下，选择器将显示所有可用广播提供者的列表。为了将选择器限制为我们特定的广播提供者，我们必须将 `preferredExtension` 设置为广播扩展的包标识符。我们通过在应用的 Info.plist 中添加一个名为 `RTCScreenSharingExtension` 的新键并将广播扩展包标识符设置为值来做到这一点。
- 确保在应用的 `Info.plist` 中将 `voip` 添加到 `UIBackgroundModes`，以便在应用后台时仍能工作。

#### 构建阶段

##### 运行脚本阶段

- 为了使声音正常工作，请在 Xcode 中添加以下脚本：

  ```shell
    SOUNDS_DIR="${PROJECT_DIR}/../node_modules/@jitsi/react-native-sdk/sounds"
    cp $SOUNDS_DIR/* ${CONFIGURATION_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/
  ```

## JitsiMeeting 属性

我们的 JitsiMeeting 组件渲染完整的会议体验。它具有一些可自定义的属性：

### config

`Object` - 重写不同的 [config](https://github.com/jitsi/jitsi-meet/blob/master/config.js) 选项。

- 例如：

```javascript
<JitsiMeeting
    config={{
        hideConferenceTimer: true,
        subject: "React Native SDK",
        customToolbarButtons: [
            {
                icon: "https://w7.pngwing.com/pngs/987/537/png-transparent-download-downloading-save-basic-user-interface-icon-thumbnail.png",
                id: "btn1",
                text: "Button one"
            }, {
                icon: "https://w7.pngwing.com/pngs/987/537/png-transparent-download-downloading-save-basic-user-interface-icon-thumbnail.png",
                id: "btn2",
                text: "Button two"
            }
        ]
    }} />
```

### flags

`Object` - 添加不同功能的 [flags](https://github.com/jitsi/jitsi-meet/blob/master/react/features/base/flags/constants.ts)，以增强您的会议体验。

- 例如：

```javascript
<JitsiMeeting 
    flags={{
    'call-integration.enabled': true, 
    'fullscreen.enabled': false, 
    'invite.enabled': true }} />
```

### eventListeners

`Object` - 个性化您的会议体验的选项：

- onConferenceBlurred
  `Function` - 传入一个函数，当 ```CONFERENCE_BLURRED``` 动作被分发时触发，具体来说，当会议屏幕失去焦点时，尤其是在导航到另一个屏幕时。

- onConferenceFocused
  `Function` - 传入一个函数，当 ```CONFERENCE_FOCUSED``` 动作被分发时触发，具体来说，当会议屏幕获得焦点时。

- onAudioMutedChanged
  `Function` - 传入一个函数，当 ```SET_AUDIO_MUTED``` 动作被分发时触发，具体来说，当音频静音状态改变时。

- onConferenceJoined
  `Function` - 传入一个函数，当 ```CONFERENCE_JOINED``` 动作被分发时触发，具体来说，当会议已加入时。

- onConferenceLeft
  `Function` - 传入一个函数，当 ```CONFERENCE_LEFT``` 动作被分发时触发，具体来说，当会议已离开时。

- onConferenceWillJoin
  `Function` - 传入一个函数，当 ```CONFERENCE_WILL_JOIN``` 动作被分发时触发，具体来说，当会议即将加入时。

- onEnterPictureInPicture
  `Function` - 传入一个函数，当 ```ENTER_PICTURE_IN_PICTURE``` 动作被分发时触发，具体来说，当进入画中画模式时。

- onParticipantJoined
  `Function` - 传入一个函数，当 ```PARTICIPANT_JOINED``` 动作被分发时触发，具体来说，当特定参与者加入会议时。

- onReadyToClose
  `Function` - 传入一个函数，当 ```READY_TO_CLOSE``` 动作被分发时触发，具体来说，当退出会议时。

- onVideoMutedChanged
  `Function` - 传入一个函数，当 ```SET_VIDEO_MUTED``` 动作被分发时触发，具体来说，当视频静音状态改变时。

### room

`string` - 会议进行的房间名称。

### serverURL

`string` - 会议应进行的服务器地址。

### style

`Object` - 自定义会议体验的 CSS 样式。

### token

`string` - 用于身份验证的 JWT 令牌。

### userInfo

- avatarUrl
  `string` - 参与者头像的路径。

- displayName
  `string` - 默认参与者名称以显示。

- email
  `string` - 默认参与者电子邮件。
