---
id: supported-browsers
title: Supported Browsers - 支持的浏览器
---

## 桌面端浏览器

| 浏览器            | 支持 | 版本  | 备注                                          |
| ----------------- | :--: | :---: | --------------------------------------------- |
| Chrome [^1]       |  ✅   | >= 72 | 在 >= 96 的版本中效果最佳                     |
| Firefox           |  ✅   | >= 68 | 在 >= 101 的版本中效果最佳                    |
| Safari            |  ✅   | >= 14 | 在 >= 15 的版本中效果最佳，输出设备选择不支持 |
| Edge              |  ✅   | >= 79 | 不支持 Edge Legacy                            |
| Internet Explorer |  ❌   |       | 不支持ＩＥ浏览器                              |

## 移动端浏览器

### Android - 安卓

| 浏览器      | 支持 | 版本 | 备注               |
| ----------- | :--: | :--: | ------------------ |
| Chrome [^1] |  ✅   |      | 支持与桌面版本相同 |
| Firefox     |  ✅   |      | 支持与桌面版本相同 |

:::note
为了获得更好的移动体验（后台支持、蓝牙支持等），我们建议使用原生应用。我们提供了一个 [原生 Android SDK](/handbook/docs/dev-guide/dev-guide-android-sdk)。
:::

### iOS - 苹果

| 浏览器  | 支持 |  版本   | 备注                                   |
| ------- | :--: | :-----: | -------------------------------------- |
| Chrome  |  ✅   |         | 与 Safari 相同的支持，因为它们共享引擎 |
| Firefox |  ✅   |         | 与 Safari 相同的支持，因为它们共享引擎 |
| Safari  |  ✅   | >= 14.3 | 在 15.4 的版本中效果最佳               |
| Edge    |  ✅   |         | 与 Safari 相同的支持，因为它们共享引擎 |

:::note
在 iOS 上，所有浏览器共享相同的引擎，即 Safari。因此，所有 iOS 浏览器的功能和限制均与 Safari 一致。

为了获得更好的移动体验（后台支持、CallKit 集成等），我们建议使用原生应用。我们提供了一个 [原生 iOS SDK](/handbook/docs/dev-guide/dev-guide-ios-sdk)。
:::

[^1]: 这同样适用于所有基于 Chromium 的浏览器，例如 Brave、（当前的）Edge、Opera、Vivaldi 等。
