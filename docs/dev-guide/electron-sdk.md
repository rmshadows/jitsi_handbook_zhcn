---
id: dev-guide-electron-sdk
title: Electron SDK
---

Jitsi Meet Electron SDK 提供了一个工具包，用于将 Jitsi Meet 集成到 Electron 应用程序中，并为桌面体验提供额外的功能。

**支持的 Electron 版本**: >= 16.

## 示例应用程序

Jitsi Meet Electron 应用程序是使用 Electron SDK 创建的，利用了其所有可用功能。源代码可在此处找到：[jitsi-meet-electron 应用程序库](https://github.com/jitsi/jitsi-meet-electron)。

## 安装

通过 npm 安装：

```bash
npm install @jitsi/electron-sdk
```

注意：该包包含 Windows 上的远程控制模块的本机代码。二进制预构建与 npm 包一起通过 prebuildify 打包。

## 使用

### 屏幕共享

**要求**：
屏幕共享工具需要一个加载 Jitsi Meet 的 iframe HTML 元素。

**启用屏幕共享**：

在显示 Jitsi Meet 的 **render** Electron 进程中：

```javascript
const {
    setupScreenSharingRender
} = require("@jitsi/electron-sdk");

// api - Jitsi Meet iframe API 对象。
setupScreenSharingRender(api);
```

在 **main** Electron 进程中：

```javascript
const {
    setupScreenSharingMain
} = require("@jitsi/electron-sdk");

// jitsiMeetWindow - 加载 Jitsi Meet 的 BrowserWindow 实例。
// appName - 在内容共享跟踪窗口中显示的应用程序名称。
// 例如，[appName] 正在共享您的屏幕。
// osxBundleId - Mac 应用程序的 bundleId，如果用户拒绝权限，将重置屏幕捕获权限。  
setupScreenSharingMain(mainWindow, appName, osxBundleId);
```

**注意**：
使用 Electron 的屏幕共享示例可以在这里找到：[没有 SDK 的屏幕共享示例](https://github.com/gabiborlea/jitsi-meet-electron-example)。

### 远程控制

**要求**：
远程控制工具需要一个加载 Jitsi Meet 的 iframe HTML 元素。

**启用远程控制**：

在显示 Jitsi Meet 的 **render** Electron 进程中：

```javascript
const {
    RemoteControl
} = require("@jitsi/electron-sdk");

// iframe - Jitsi Meet iframe
const remoteControl = new RemoteControl(iframe);
```

要禁用远程控制：

```javascript
remoteControl.dispose();
```

注意：当 Jitsi Meet iframe 卸载时，`dispose` 方法将自动被调用。

在 **main** Electron 进程中：

```javascript
const {
    RemoteControlMain
} = require("@jitsi/electron-sdk");

// jitsiMeetWindow - 加载 Jitsi Meet 的 BrowserWindow 实例。
const remoteControl = new RemoteControlMain(mainWindow);
```

### 始终在顶部

当主 Jitsi Meet 窗口未获得焦点时，显示一个小窗口，其中显示当前活动扬声器的视频。

**要求**：

1. Jitsi Meet 应通过我们的 [iframe API](https://github.com/jitsi/jitsi-meet/blob/master/doc/api.md) 初始化。
2. 显示 Jitsi Meet 的 `BrowserWindow` 实例应使用 [Chrome 的 window.open 实现](https://github.com/electron/electron/blob/master/docs/api/window-open.md#using-chromes-windowopen-implementation)（将 `nativeWindowOpen` 选项设置为 `true`）。
3. 如果您有自定义处理程序来打开窗口，您必须过滤始终在顶部的窗口。您可以通过其 `frameName` 参数来执行此操作，该参数将设置为 `AlwaysOnTop`。

**启用始终在顶部**：

在 **main** Electron 进程中：

```javascript
const {
    setupAlwaysOnTopMain
} = require("@jitsi/electron-sdk");

// jitsiMeetWindow - 加载 Jitsi Meet 的 BrowserWindow 实例。
setupAlwaysOnTopMain(jitsiMeetWindow);
```

在显示 Jitsi Meet 的 **render** Electron 进程中：

```javascript
const {
    setupAlwaysOnTopRender
} = require("@jitsi/electron-sdk");

const api = new JitsiMeetExternalAPI(...);
const alwaysOnTop = setupAlwaysOnTopRender(api);

alwaysOnTop.on('will-close', handleAlwaysOnTopClose);
```

`setupAlwaysOnTopRender` 返回一个 EventEmitter 实例，具有以下事件：

* **dismissed** - 当始终在顶部窗口通过其关闭按钮显式关闭时发出
* **will-close** - 在始终在顶部窗口即将关闭之前发出

### 电源监控

提供查询 Electron 系统空闲状态和接收电源监控事件的方法。

**启用电源监控**：

在 **main** Electron 进程中：

```javascript
const {
    setupPowerMonitorMain
} = require("@jitsi/electron-sdk");

// jitsiMeetWindow - 加载 Jitsi Meet 的 BrowserWindow 实例。
setupPowerMonitorMain(jitsiMeetWindow);
```

在显示 Jitsi Meet 的 **render** Electron 进程中：

```javascript
const {
    setupPowerMonitorRender
} = require("@jitsi/electron-sdk");

const api = new JitsiMeetExternalAPI(...);
setupPowerMonitorRender(api);
```

### 注意：

您需要添加 `disable-site-isolation-trials` 开关，原因见 [https://github.com/electron/electron/issues/18214](https://github.com/electron/electron/issues/18214)：

```javascript
app.commandLine.appendSwitch('disable-site-isolation-trials');
```

有关更多信息，请查看 SDK 的库 [https://github.com/jitsi/jitsi-meet-electron-sdk](https://github.com/jitsi/jitsi-meet-electron-sdk)。
