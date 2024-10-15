---
id: dev-guide-web-jitsi-meet
title: Developer Guide for Jitsi Meet - Jitsi Meet开发指南
sidebar_label: Jitsi Meet development - Jitsi Meet开发
---

本指南将帮助您设置开发环境，以开始在 Jitsi Meet 网络应用程序上进行工作。

## 构建源代码

:::note
需要 Node.js >= 16 和 npm >= 8。
:::

:::caution
不支持 Windows。
:::

在 Debian/Ubuntu 系统上，可以通过以下方式安装所需的软件包：

- 从 https://nodejs.org/en/download/ 下载“Linux Binaries (x64)”。
- 按照以下说明安装 Node.js：[Node.js 安装说明](https://github.com/nodejs/help/wiki/Installation)。

然后继续：

```bash
# 克隆代码库
git clone https://github.com/jitsi/jitsi-meet
cd ./jitsi-meet

npm install

# 构建 Jitsi Meet 应用程序，只需输入
make
```

:::warning
**不要**运行 `npm update` 或使用 `yarn`，也不要删除 `package-lock.json`。依赖项被固定是有原因的。
:::

### 使用 webpack-dev-server 进行开发运行

在终端中使用以下命令：

```bash
make dev
```

默认情况下，使用的后端部署为 `alpha.jitsi.net`。您可以通过使用代理服务器将 Jitsi Meet 应用指向其他后端。为此，请设置 `WEBPACK_DEV_SERVER_PROXY_TARGET` 变量：

```bash
export WEBPACK_DEV_SERVER_PROXY_TARGET=https://your-example-server.com
make dev
```

应用程序应该在 https://localhost:8080/ 上运行。

#### 证书错误

浏览器可能会显示证书错误，因为开发证书是自签名的。可以安全地忽略这些警告并继续访问您的网站。

### 构建 .debs 文件

要制作一个可以轻松部署到公共测试服务器的 deb，确保您拥有所需的 lib-jitsi-meet 源代码，然后：

```
npm install
make
dpkg-buildpackage -A -rfakeroot -us -uc -tc
```

您将在上级目录中获得一堆 .deb 文件，并可以将更新的源代码推送到您的服务器并使用 jitsi-meet-web deb 文件安装它。

### 从现有部署的源代码运行

请参阅文档 [如何从源代码构建 Jitsi Meet：开发者指南](https://community.jitsi.org/t/how-to-how-to-build-jitsi-meet-from-source-a-developers-guide/75422)。
