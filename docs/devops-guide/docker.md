---
id: devops-guide-docker
title: 自托管指南 - Docker
sidebar_label: Docker
---

## Quick start - 快速上手

要在运行 Docker 和 Docker Compose 的机器上快速运行 Jitsi Meet，按照以下步骤操作：

1. 下载并解压 [最新发布版本]。 **请勿** 直接克隆 git 仓库。如果您想运行测试镜像，请参见下文：

   ```bash
   wget $(curl -s https://api.github.com/repos/jitsi/docker-jitsi-meet/releases/latest | grep 'zip' | cut -d\" -f4)
   ```

2. 解压包：

   ```bash
   unzip <filename>
   ```

3. 通过复制并调整 `env.example` 来创建 `.env` 文件：

   ```bash
   cp env.example .env
   ```

4. 通过运行以下 bash 脚本，在 `.env` 文件的安全部分设置强密码：

   ```bash
   ./gen-passwords.sh
   ```

5. 创建所需的 `CONFIG` 目录

   * 对于 Linux：

   ```bash
   mkdir -p ~/.jitsi-meet-cfg/{web,transcripts,prosody/config,prosody/prosody-plugins-custom,jicofo,jvb,jigasi,jibri}
   ```

   * 对于 Windows：

   ```bash
   echo web,transcripts,prosody/config,prosody/prosody-plugins-custom,jicofo,jvb,jigasi,jibri | % { mkdir "~/.jitsi-meet-cfg/$_" }
   ```

6. 运行以下命令启动服务（译者：建议使用`docker-compose`输出更简洁）：

   ```bash
   docker compose up -d
   ```

7. 通过 [``https://localhost:8443``](https://localhost:8443) 访问 Web UI（如果您编辑了 `.env` 文件中的端口，请使用相应的端口）。

:::note
HTTP（非 HTTPS）也可用（默认端口为 8000），但这主要用于反向代理设置；直接通过 HTTP 访问而非 HTTPS 会导致 WebRTC 错误，例如：

* _无法访问您的麦克风/摄像头：因未知原因无法使用麦克风/摄像头。无法读取属性 'getUserMedia' 的值 'undefined'_ 
* _navigator.mediaDevices 未定义_

:::

**重要**：当实际部署 Jitsi Meet 时，必须将 `PUBLIC_URL` 环境变量设置为您的真实域名（译者：这点非常重要！）。

如果您还想使用 jigasi，请首先在 `.env` 文件中配置 SIP 凭据，然后使用以下命令运行 Docker Compose：

```bash
docker compose -f docker-compose.yml -f jigasi.yml up
```

如果您想启用文档共享功能（通过 [Etherpad]），请配置它并使用以下命令运行 Docker Compose：

```bash
docker compose -f docker-compose.yml -f etherpad.yml up
```

如果您还想使用 jibri，请首先按照 Jitsi 广播基础设施配置部分的说明配置主机，然后使用以下命令运行 Docker Compose：

```bash
docker compose -f docker-compose.yml -f jibri.yml up -d
```

或者同时使用 jigasi：

```bash
docker compose -f docker-compose.yml -f jigasi.yml -f jibri.yml up -d
```

对于日志分析项目，您需要 `log-analyser.yml` 和 `grafana.yml` 文件。该项目允许您在 grafana 中分析 Docker 日志。如果您想运行日志分析器，请按以下命令运行 Docker 文件：

```bash
docker-compose -f docker-compose.yml -f log-analyser.yml -f grafana.yml up -d
```

有关日志分析的详细信息，请参阅 [此文档](https://jitsi.github.io/handbook/docs/devops-guide/devops-guide-log-analyser)。

### 更新

如果您想更新，只需再次运行以下命令：

```bash
wget $(curl -s https://api.github.com/repos/jitsi/docker-jitsi-meet/releases/latest | grep 'zip' | cut -d\" -f4)
```

（就像最初下载 Jitsi 时一样）。然后解压并在被询问时选择覆盖所有文件：

```bash
unzip <filename>
```

### 测试开发/不稳定版本构建

下载最新代码：

```bash
git clone https://github.com/jitsi/docker-jitsi-meet && cd docker-jitsi-meet
```

:::note
`master` 分支的代码设计为与不稳定镜像一起使用。请勿与发行版镜像一起运行。
:::

按照正常方式运行 `docker compose up`。

每天都会上传一个新的“不稳定”镜像构建版本。

### 构建您自己的镜像

下载最新代码：

```bash
git clone https://github.com/jitsi/docker-jitsi-meet && cd docker-jitsi-meet
```

提供的 `Makefile` 提供了一种全面的方式来构建整个堆栈或单个镜像。

要构建所有镜像：

```bash
make
```

要构建特定的镜像（例如，Web 镜像）：

```bash
make build_web
```

一旦您的本地构建完成，请确保将 `JITSI_IMAGE_VERSION=latest` 添加到您的 `.env` 文件中。

### 安全提示

此设置曾经为跨组件使用的内部账户提供默认密码。为了使默认设置安全，默认密码已被删除，相应的容器在没有设置密码的情况下不会启动。

可以通过以下方式生成强密码：`./gen-passwords.sh`  
这将修改您的 `.env` 文件（会保存一份备份到 `.env.bak` 中），并为每个必需选项设置强密码。密码使用 `openssl rand -hex 16` 生成。

**请勿重用任何密码。**

## 架构

Jitsi Meet 的安装可以分为以下组件：

* Web 界面
* XMPP 服务器
* 会议焦点组件
* 视频路由器（可以有多个）
* 音频通话的 SIP 网关
* 用于录制或流式传输会议的广播基础设施

![](../assets/docker-jitsi-meet.png)

该图显示了在运行 Docker 的主机上的典型部署。此项目将上述每个组件分隔到相互连接的容器中。为此，提供了多个容器镜像。

### 外部端口

以下外部端口必须在防火墙上打开：

* `80/tcp` 用于 Web UI HTTP（实际上只是重定向，在 `.env` 文件中取消注释 `ENABLE_HTTP_REDIRECT=1` 后）
* `443/tcp` 用于 Web UI HTTPS
* `10000/udp` 用于 UDP 的 RTP 媒体 

另外 `20000-20050/udp` 用于 jigasi，如果您选择部署该组件以方便 SIP 访问。

例如，在 CentOS/Fedora 服务器上，可以通过以下方式打开这些端口（不包括 SIP 访问）：

```bash
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --permanent --add-port=10000/udp
sudo firewall-cmd --reload
```

请参阅 [Debian/Ubuntu 安装指南中的相关部分](https://jitsi.github.io/handbook/docs/devops-guide/devops-guide-quickstart#setup-and-configure-your-firewall)。

### 镜像

* **base**: Debian 稳定基础镜像，带有用于进程控制的 [S6 Overlay] 和启用的 [Jitsi 仓库]。所有其他镜像都基于此镜像。
* **base-java**: 与上述相同，另加 Java（OpenJDK）。
* **web**: Jitsi Meet Web UI，通过 nginx 提供服务。
* **prosody**: [Prosody]，XMPP 服务器。
* **jicofo**: [Jicofo]，XMPP 焦点组件。
* **jvb**: [Jitsi Videobridge]，视频路由器。
* **jigasi**: [Jigasi]，SIP（仅音频）网关。
* **jibri**: [Jibri]，广播基础设施。

### 设计考虑

Jitsi Meet 使用 XMPP 进行信令，因此需要 XMPP 服务器。由这些容器提供的设置不会将 XMPP 服务器暴露给外部世界。相反，它被完全封闭，XMPP 流量的路由仅发生在用户定义的网络中。

XMPP 服务器可以暴露给外部世界，但这超出了本项目的范围。

## 配置

配置通过包含在 ``.env`` 文件中的环境变量进行。您可以复制提供的 ``env.example`` 文件作为参考。

| 变量                | 描述                                                  | 示例                     |
| ------------------- | ----------------------------------------------------- | ------------------------ |
| `CONFIG`            | 存储所有配置的目录                                    | /opt/jitsi-meet-cfg      |
| `TZ`                | 系统时区                                              | Europe/Amsterdam         |
| `HTTP_PORT`         | 暴露的 HTTP 流量端口                                  | 8000                     |
| `HTTPS_PORT`        | 暴露的 HTTPS 流量端口                                 | 8443                     |
| `JVB_ADVERTISE_IPS` | Docker 主机的 IP 地址（用逗号分隔），适用于局域网环境 | 192.168.1.1              |
| `PUBLIC_URL`        | 用于 web 服务的公共 URL                               | https://meet.example.com |

译者：大陆用户时区可以设置为：Asia/Shanghai

:::note
移动端应用程序不支持自签名证书（默认情况下）。请参阅下文了解如何使用 Let’s Encrypt 获得正确的证书。
:::

### TLS 配置

#### Let's Encrypt 配置

如果您希望将 Jitsi Meet 实例直接暴露给外部流量，但没有有效的 TLS 证书，幸运的是，Jitsi 已内置了对 Let’s Encrypt 的支持。以下是所需的选项：

| 变量                 | 描述                                     | 示例              |
| -------------------- | ---------------------------------------- | ----------------- |
| `ENABLE_LETSENCRYPT` | 启用 Let’s Encrypt 证书生成              | 1                 |
| `LETSENCRYPT_DOMAIN` | 要为其生成证书的域名                     | meet.example.com  |
| `LETSENCRYPT_EMAIL`  | 接收重要帐户通知的电子邮件地址（必填项） | alice@atlanta.net |

此外，您需要将 `HTTP_PORT` 设置为 80，将 `HTTPS_PORT` 设置为 443，并将 `PUBLIC_URL` 设置为您的域名。您还可以考虑通过设置 `ENABLE_HTTP_REDIRECT=1` 来将 HTTP 流量重定向到 HTTPS。

**Let’s Encrypt 限制提醒**：Let’s Encrypt 对您为同一域名提交新证书请求的次数有限制。当前的限制是每 7 天最多提交 5 个新证书请求。因此，如果您打算删除 `.jitsi-meet-cfg` 文件夹，建议您禁用 `.env` 中的 Let’s Encrypt 相关环境变量。或者，您可以将 `.jitsi-meet-cfg` 文件夹移动到其他位置，以便安全地保留已经颁发的证书。或者，您可以先禁用 Let’s Encrypt 进行初步测试，然后在测试完成后再启用 Let’s Encrypt。

:::note
当您不再使用 `LETSENCRYPT_USE_STAGING` 时，必须手动清除 `.jitsi-meet-cfg/web` 中的证书。
:::

有关 Let’s Encrypt 限制的更多信息，请访问：
https://letsencrypt.org/docs/rate-limits/

#### 使用现有的 TLS 证书和密钥

如果您拥有有效的 TLS 证书并且不需要使用 Let’s Encrypt 证书，您可以配置 Jitsi Meet 容器来使用它。

与 Let’s Encrypt 证书不同，此操作不是通过 `.env` 文件配置的，而是通过告知 Jitsi Meet 的 `web` 服务挂载以下两个卷：

- 将 `/path/to/your/cert.key` 文件挂载到 `/config/keys/cert.key` 挂载点
- 将 `/path/to/your/cert.fullchain` 文件挂载到 `/config/keys/cert.crt` 挂载点

在 `docker-compose.yml` 文件中的配置如下：

```yaml
services:
    web:
        ...
        volumes:
            ...
            - /path/to/your/cert.fullchain:/config/keys/cert.crt
            - /path/to/your/cert.key:/config/keys/cert.key
```

### 功能配置（config.js）

| 变量                         | 描述                                                 | 示例 |
| ---------------------------- | ---------------------------------------------------- | ---- |
| `TOOLBAR_BUTTONS`            | 配置工具栏按钮。按钮名称以逗号分隔（逗号之间无空格） |      |
| `HIDE_PREMEETING_BUTTONS`    | 隐藏会前屏幕上的按钮。按钮名称以逗号分隔             |      |
| `ENABLE_LOBBY`               | 控制是否启用大厅功能                                 | 1    |
| `ENABLE_AV_MODERATION`       | 控制是否启用音视频管理功能                           | 1    |
| `ENABLE_PREJOIN_PAGE`        | 进入会议前显示预加入页面                             | 1    |
| `ENABLE_WELCOME_PAGE`        | 启用欢迎页面                                         | 1    |
| `ENABLE_CLOSE_PAGE`          | 启用关闭页面                                         | 0    |
| `DISABLE_AUDIO_LEVELS`       | 禁用音频级别测量                                     | 0    |
| `ENABLE_NOISY_MIC_DETECTION` | 启用噪音麦克风检测                                   | 1    |
| `ENABLE_BREAKOUT_ROOMS`      | 启用分组讨论室                                       | 1    |

### Jigasi SIP 网关（仅音频）配置

如果您希望启用 SIP 网关，以下选项是必需的：

| 变量                   | 描述                                        | 示例              |
| ---------------------- | ------------------------------------------- | ----------------- |
| `JIGASI_SIP_URI`       | 用于来电/去电的 SIP URI                     | test@sip2sip.info |
| `JIGASI_SIP_PASSWORD`  | 指定 SIP 账号的密码                         | `<unset>`         |
| `JIGASI_SIP_SERVER`    | SIP 服务器（不确定时可使用 SIP 账号的域名） | sip2sip.info      |
| `JIGASI_SIP_PORT`      | SIP 服务器端口                              | 5060              |
| `JIGASI_SIP_TRANSPORT` | SIP 传输协议                                | UDP               |

#### 显示拨入信息

| 变量                 | 描述                             | 示例                                         |
| -------------------- | -------------------------------- | -------------------------------------------- |
| `DIALIN_NUMBERS_URL` | 包含所有拨入号码的 JSON 文件 URL | https://meet.example.com/dialin.json         |
| `CONFCODE_URL`       | 用于检查/生成拨入代码的 API URL  | https://jitsi-api.jitsi.net/conferenceMapper |

拨入号码的 JSON 文件应类似如下：

```json
{"message":"Dial-In numbers:","numbers":{"DE": ["+49-721-0000-0000"]},"numbersEnabled":true}
```

### 使用 Jibri 进行录制/直播配置

<details>
  <summary>如果您使用的版本低于 7439，则需要一些额外的设置。</summary>
在运行 **版本低于 7439** 的 Jibri 之前，您需要在主机上设置 ALSA 循环设备。这 **不** 适用于非 Linux 主机。

对于 CentOS 7，模块已经与内核一起编译，因此只需因此只需运行：

```bash
# 配置 5 个捕获/播放接口
echo "options snd-aloop enable=1,1,1,1,1 index=0,1,2,3,4" > /etc/modprobe.d/alsa-loopback.conf
# 设置模块自动加载
echo "snd_aloop" > /etc/modules-load.d/snd_aloop.conf
# 加载模块
modprobe snd-aloop
# 检查模块是否已加载
lsmod | grep snd_aloop
```

对于 Ubuntu：

```bash
# 安装模块
apt update && apt install linux-image-extra-virtual
# 配置 5 个捕获/播放接口
echo "options snd-aloop enable=1,1,1,1,1 index=0,1,2,3,4" > /etc/modprobe.d/alsa-loopback.conf
# 设置模块自动加载
echo "snd-aloop" >> /etc/modules
# 检查模块是否已加载
lsmod | grep snd_aloop
```

:::note
如果您在 AWS 上运行，可能需要重启机器以使用通用内核，而不是 “aws” 内核。如果重启后机器仍在使用 “aws” 内核，您需要手动更新 grub 文件。操作如下：
:::

```bash
# 用编辑器打开 grub 文件
nano /etc/default/grub
# 将 GRUB_DEFAULT 的值从 "0" 修改为 "1>2"
# 保存并退出文件

# 更新 grub
update-grub
# 重启机器
reboot now
```

对于多实例 Jibri，您需要为每个实例手动选择不同的循环设备。

默认情况下，第一个实例的 `.asoundrc` 文件如下：

```
...
slave.pcm "hw:Loopback,0,0"
...
slave.pcm "hw:Loopback,0,1"
...
slave.pcm "hw:Loopback,1,1"
...
slave.pcm "hw:Loopback,1,0"
...
```

要设置第二个实例，运行容器时更改 `/home/jibri/.asoundrc` 文件：

```
...
slave.pcm "hw:Loopback_1,0,0"
...
slave.pcm "hw:Loopback_1,0,1"
...
slave.pcm "hw:Loopback_1,1,1"
...
slave.pcm "hw:Loopback_1,1,0"
...
```

您还可以使用编号 id 设置循环设备。第三个实例的 `.asoundrc` 文件应如下：

  ```
  ...
  slave.pcm "hw:2,0,0"
  ...
  slave.pcm "hw:2,0,1"
  ...
  slave.pcm "hw:2,1,1"
  ...
  slave.pcm "hw:2,1,0"
  ...

  ```

</details>

如果您想启用 Jibri，以下选项是必需的：

| 变量               | 描述          | 示例 |
| ------------------ | ------------- | ---- |
| `ENABLE_RECORDING` | 启用录制/直播 | 1    |

Jibri 扩展配置：

| 变量                                   | 描述                                                  | 示例                |
| -------------------------------------- | ----------------------------------------------------- | ------------------- |
| `JIBRI_RECORDER_USER`                  | Jibri 客户端连接的内部录制用户                        | recorder            |
| `JIBRI_RECORDER_PASSWORD`              | Jibri 客户端连接的内部录制密码                        | `<unset>`           |
| `JIBRI_RECORDING_DIR`                  | Jibri 容器内的录制目录                                | /config/recordings  |
| `JIBRI_FINALIZE_RECORDING_SCRIPT_PATH` | 完成录制后的脚本路径，将在录制完成后运行              | /config/finalize.sh |
| `JIBRI_XMPP_USER`                      | Jibri 客户端连接的内部用户                            | jibri               |
| `JIBRI_STRIP_DOMAIN_JID`               | Jibri 内的域名前缀剥离（详情请参阅 env.example 文件） | muc                 |
| `JIBRI_BREWERY_MUC`                    | Jibri 池的 MUC 名称                                   | jibribrewery        |
| `JIBRI_PENDING_TIMEOUT`                | MUC 连接超时时间                                      | 90                  |

### Jitsi Meet 配置

Jitsi Meet 使用两个配置文件来更改 Web 界面的默认设置：`config.js` 和 `interface_config.js`。这些文件位于您环境文件中配置的 `CONFIG/web/` 目录中。

每次容器重启时，这些文件都会重新创建。如果您想提供自己的设置，创建自己的配置文件 `custom-config.js` 和 `custom-interface_config.js` 即可。

您只需提供相关设置，Docker 脚本会将您的自定义文件附加到默认文件中！

### 身份验证

身份验证可以通过以下环境变量进行控制。如果启用了访客访问，未经身份验证的用户需要等待已认证用户加入后才能进入房间。如果未启用访客访问，每个用户都需要认证后才能加入。

如果启用了身份验证，一旦认证用户登录，该用户将在会话超时前始终保持登录状态。您可以通过设置 `ENABLE_AUTO_LOGIN=0` 来禁用默认的自动登录功能，或者设置 `JICOFO_AUTH_LIFETIME` 来限制会话时长。

| 变量                   | 描述                                      | 示例     |
| ---------------------- | ----------------------------------------- | -------- |
| `ENABLE_AUTH`          | 启用身份验证                              | 1        |
| `ENABLE_GUESTS`        | 启用访客访问                              | 1        |
| `AUTH_TYPE`            | 选择身份验证类型（internal、jwt 或 ldap） | internal |
| `ENABLE_AUTO_LOGIN`    | 启用自动登录                              | 1        |
| `JICOFO_AUTH_LIFETIME` | 选择认证用户的会话超时值                  | 3 hours  |

#### 内部身份验证

默认的身份验证模式是 `internal`，使用 XMPP 凭据认证用户。要启用此功能，需设置 `ENABLE_AUTH` 为 1，并将 `AUTH_TYPE` 设置为 `internal`，然后配置以下设置。

内部用户必须通过 `prosodyctl` 工具在 `prosody` 容器中创建。首先，进入对应的容器：

```bash
docker compose exec prosody /bin/bash
```

进入容器后，运行以下命令创建用户：

```bash
prosodyctl --config /config/prosody.cfg.lua register 【TheDesiredUsername】 meet.jitsi 【TheDesiredPassword】
```

注意，命令不会产生任何输出。

要删除用户，请运行以下命令：

```bash
prosodyctl --config /config/prosody.cfg.lua unregister 【TheDesiredUsername】 meet.jitsi
```

要列出所有用户，运行以下命令：

```bash
find /config/data/meet%2ejitsi/accounts -type f -exec basename {} .dat \;
```

#### 使用 LDAP 进行身份验证

您可以使用 LDAP 进行用户认证。要启用此功能，需设置 `ENABLE_AUTH` 为 1，并将 `AUTH_TYPE` 设置为 `ldap`，然后配置以下设置。

| 变量                   | 描述                                                        | 示例                                             |
| ---------------------- | ----------------------------------------------------------- | ------------------------------------------------ |
| `LDAP_URL`             | LDAP 连接的 URL                                             | ldaps://ldap.domain.com/                         |
| `LDAP_BASE`            | LDAP 基础 DN，可为空                                        | DC=example,DC=domain,DC=com                      |
| `LDAP_BINDDN`          | LDAP 用户 DN，不指定此参数则使用匿名绑定                    | CN=binduser,OU=users,DC=example,DC=domain,DC=com |
| `LDAP_BINDPW`          | LDAP 用户密码，不指定此参数则使用匿名绑定                   | LdapUserPassw0rd                                 |
| `LDAP_FILTER`          | LDAP 过滤器                                                 | (sAMAccountName=%u)                              |
| `LDAP_AUTH_METHOD`     | LDAP 认证方法                                               | bind                                             |
| `LDAP_VERSION`         | LDAP 协议版本                                               | 3                                                |
| `LDAP_USE_TLS`         | 启用 LDAP TLS                                               | 1                                                |
| `LDAP_TLS_CIPHERS`     | 设置允许的 TLS 密码列表                                     | SECURE256:SECURE128                              |
| `LDAP_TLS_CHECK_PEER`  | 要求并验证 LDAP 服务器证书                                  | 1                                                |
| `LDAP_TLS_CACERT_FILE` | CA 证书文件路径，启用服务器证书验证时使用                   | /etc/ssl/certs/ca-certificates.crt               |
| `LDAP_TLS_CACERT_DIR`  | CA 证书目录路径，启用服务器证书验证时使用                   | /etc/ssl/certs                                   |
| `LDAP_START_TLS`       | 启用 START_TLS，需 LDAPv3，URL 必须为 ldap:// 而非 ldaps:// | 0                                                |

#### 使用 JWT 令牌进行身份验证

您可以使用 JWT 令牌认证用户。要启用此功能，需设置 `ENABLE_AUTH` 为 1，并将 `AUTH_TYPE` 设置为 `jwt`，然后配置以下设置。

| 变量                     | 描述                                                   | 示例                        |
| ------------------------ | ------------------------------------------------------ | --------------------------- |
| `JWT_APP_ID`             | 应用标识符                                             | my_jitsi_app_id             |
| `JWT_APP_SECRET`         | 仅您的令牌知道的应用密钥                               | my_jitsi_app_secret         |
| `JWT_ACCEPTED_ISSUERS`   | （可选）设置 asap_accepted_issuers 为逗号分隔列表      | my_web_client,my_app_client |
| `JWT_ACCEPTED_AUDIENCES` | （可选）设置 asap_accepted_audiences 为逗号分隔列表    | my_server1,my_server2       |
| `JWT_ASAP_KEYSERVER`     | （可选）设置 asap_keyserver 为一个可用于查找公钥的 URL | https://example.com/asap>   |
| `JWT_ALLOW_EMPTY`        | （可选）允许没有 JWT 的匿名用户，同时验证提供的 JWT    | 0                           |
| `JWT_AUTH_TYPE`          | （可选）控制用于处理传入 JWT 的模块                    | token                       |
| `JWT_TOKEN_AUTH_MODULE`  | （可选）控制用于验证 JWT 的模块                        | token_verification          |

可以使用 [jwt.io](https://jwt.io/#debugger-io) 调试器进行测试。使用以下示例 payload：

```json
{
  "context": {
    "user": {
      "avatar": "https://robohash.org/john-doe",
      "name": "John Doe",
      "email": "jdoe@example.com"
    }
  },
  "aud": "my_jitsi_app_id",
  "iss": "my_jitsi_app_id",
  "sub": "meet.jitsi",
  "room": "*"
}
```

#### 使用 Matrix 进行身份验证

有关更多信息，请参阅 “Prosody Auth Matrix 用户验证” 的文档 [这里](https://github.com/matrix-org/prosody-mod-auth-matrix-user-verification)。

| 变量                           | 描述                                                         | 示例                           |
| ------------------------------ | ------------------------------------------------------------ | ------------------------------ |
| `MATRIX_UVS_URL`               | Matrix 用户验证服务的基本 URL（不带斜杠）                    | `https://uvs.example.com:3000` |
| `MATRIX_UVS_ISSUER`            | （可选）通过的 auth token 的发行者，必须与 JWT 中的 `iss` 匹配 | issuer（默认）                 |
| `MATRIX_UVS_AUTH_TOKEN`        | （可选）如果启用了身份验证，则为用户验证服务的 auth token    | changeme                       |
| `MATRIX_UVS_SYNC_POWER_LEVELS` | （可选）使 Matrix 房间的主持人成为 Prosody 房间的拥有者      | 1                              |

#### 使用混合 Matrix 令牌（Hybrid Matrix Token）进行身份验证

您可以使用 `Hybrid Matrix Token` 认证用户。它支持在同一设置中使用 `Matrix` 和 `JWT Token` 进行身份验证。要启用此功能，需设置 `ENABLE_AUTH` 为 1，并将 `AUTH_TYPE` 设置为 `hybrid_matrix_token`，然后配置以下设置。

有关更多信息，请参阅 “Hybrid Matrix Token” 的文档 [这里](https://github.com/jitsi-contrib/prosody-plugins/tree/main/auth_hybrid_matrix_token)。

| 变量                           | 描述                                                         | 示例                           |
| ------------------------------ | ------------------------------------------------------------ | ------------------------------ |
| `MATRIX_UVS_URL`               | Matrix 用户验证服务的基本 URL（不带斜杠）                    | `https://uvs.example.com:3000` |
| `MATRIX_UVS_ISSUER`            | （可选）通过的 auth token 的发行者，必须与 JWT 中的 `iss` 匹配 | my_issuer                      |
| `MATRIX_UVS_AUTH_TOKEN`        | （可选）如果启用了身份验证，则为用户验证服务的 auth token    | my_matrix_secret               |
| `MATRIX_UVS_SYNC_POWER_LEVELS` | （可选）使 Matrix 房间的主持人成为 Prosody 房间的拥有者      | 1                              |
| `MATRIX_LOBBY_BYPASS`          | （可选）允许 Matrix 房间成员绕过 Jitsi 大厅检查              | 1                              |
| `JWT_APP_ID`                   | 应用标识符                                                   | my_jitsi_app_id                |
| `JWT_APP_SECRET`               | 仅您的令牌知道的应用密钥                                     | my_jitsi_app_secret            |
| `JWT_ALLOW_EMPTY`              | （可选）允许没有 JWT 的匿名用户，同时验证提供的 JWT          | 0                              |

#### 外部身份验证

| 变量             | 描述                                                 | 示例                                  |
| ---------------- | ---------------------------------------------------- | ------------------------------------- |
| `TOKEN_AUTH_URL` | 使用外部服务进行身份验证或专注于已存在的外部认证窗口 | https://auth.meet.example.com/{room}> |

### 使用 Etherpad 进行文档协作编辑

您可以通过 [Etherpad] 进行协作编辑文档。要启用它，请设置以下配置选项，并使用额外的配置文件 `etherpad.yml` 运行 Docker Compose。

以下是所需选项：

| 变量                | 描述                      | 示例                              |
| ------------------- | ------------------------- | --------------------------------- |
| `ETHERPAD_URL_BASE` | 设置 etherpad-lite 的 URL | `http://etherpad.meet.jitsi:9001` |

### 转录功能配置

如果您想启用转录功能，需要以下选项：

| 变量                               | 描述                                            | 示例 |
| ---------------------------------- | ----------------------------------------------- | ---- |
| `ENABLE_TRANSCRIPTIONS`            | 启用会议中的 Jigasi 转录功能                    | 1    |
| `GC_PROJECT_ID`                    | 来自 Google Cloud 凭据的 `project_id`           |      |
| `GC_PRIVATE_KEY_ID`                | 来自 Google Cloud 凭据的 `private_key_id`       |      |
| `GC_PRIVATE_KEY`                   | 来自 Google Cloud 凭据的 `private_key`          |      |
| `GC_CLIENT_EMAIL`                  | 来自 Google Cloud 凭据的 `client_email`         |      |
| `GC_CLIENT_ID`                     | 来自 Google Cloud 凭据的 `client_id`            |      |
| `GC_CLIENT_CERT_URL`               | 来自 Google Cloud 凭据的 `client_x509_cert_url` |      |
| `JIGASI_TRANSCRIBER_RECORD_AUDIO`  | 当转录器开启时，Jigasi 会录制音频               | true |
| `JIGASI_TRANSCRIBER_SEND_TXT`      | 当转录器开启时，Jigasi 会将转录文本发送到聊天   | true |
| `JIGASI_TRANSCRIBER_ADVERTISE_URL` | Jigasi 会将转录文件的链接发布到聊天             | true |

有关设置 Google Cloud 凭据的详细信息，请参阅 https://cloud.google.com/text-to-speech/docs/quickstart-protocol> 中的 "Before you begin" 部分的第 1 到 5 段。

### Sentry 日志配置

| 变量                 | 描述                                   | 默认值                               |
| -------------------- | -------------------------------------- | ------------------------------------ |
| `JVB_SENTRY_DSN`     | Sentry 数据源名称（Sentry 项目的端点） | `https://public:private@host:port/1` |
| `JICOFO_SENTRY_DSN`  | Sentry 数据源名称（Sentry 项目的端点） | `https://public:private@host:port/1` |
| `JIGASI_SENTRY_DSN`  | Sentry 数据源名称（Sentry 项目的端点） | `https://public:private@host:port/1` |
| `SENTRY_ENVIRONMENT` | 可选的环境信息，用于过滤事件           | production                           |
| `SENTRY_RELEASE`     | 可选的版本信息，用于过滤事件           | 1.0.0                                |

### TURN 服务器配置

配置外部 TURN 服务器。

| 变量               | 描述                                                     | 默认值 |
| ------------------ | -------------------------------------------------------- | ------ |
| `TURN_CREDENTIALS` | TURN 服务器的凭据                                        |        |
| `TURN_HOST`        | TURN 服务器主机名，使用逗号分隔的列表（UDP 或 TCP 传输） |        |
| `TURN_PORT`        | TURN 服务器端口（UDP 或 TCP 传输）                       | 443    |
| `TURN_TRANSPORT`   | TURN 服务器协议，使用逗号分隔的列表（UDP 或 TCP 或两者） | tcp    |
| `TURNS_HOST`       | TURN 服务器主机名，使用逗号分隔的列表（TLS 传输）        |        |
| `TURNS_PORT`       | TURN 服务器端口（TLS 传输）                              | 443    |

### 高级配置

这些配置选项已预设，通常无需更改。

| 变量                                    | 描述                                                         | 默认值                                                       |
| --------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `XMPP_DOMAIN`                           | 内部 XMPP 域                                                 | meet.jitsi                                                   |
| `XMPP_AUTH_DOMAIN`                      | 认证服务的内部 XMPP 域                                       | auth.meet.jitsi                                              |
| `XMPP_SERVER`                           | 内部 XMPP 服务器名称 xmpp.meet.jitsi                         | xmpp.meet.jitsi                                              |
| `XMPP_BOSH_URL_BASE`                    | BOSH 模块的内部 XMPP 服务器 URL                              | `http://xmpp.meet.jitsi:5280`                                |
| `XMPP_MUC_DOMAIN`                       | MUC 的 XMPP 域                                               | muc.meet.jitsi                                               |
| `XMPP_INTERNAL_MUC_DOMAIN`              | 内部 MUC 的 XMPP 域                                          | internal-muc.meet.jitsi                                      |
| `XMPP_GUEST_DOMAIN`                     | 未认证用户的 XMPP 域                                         | guest.meet.jitsi                                             |
| `XMPP_RECORDER_DOMAIN`                  | jibri 录制器的域                                             | recorder.meet.jitsi                                          |
| `XMPP_MODULES`                          | XMPP_DOMAIN 的自定义 Prosody 模块（逗号分隔）                | info,alert                                                   |
| `XMPP_MUC_MODULES`                      | MUC 组件的自定义 Prosody 模块（逗号分隔）                    | info,alert                                                   |
| `XMPP_INTERNAL_MUC_MODULES`             | 内部 MUC 组件的自定义 Prosody 模块（逗号分隔）               | info,alert                                                   |
| `GLOBAL_MODULES`                        | 自定义的 prosody 模块，在全局配置中加载（逗号分隔）          | statistics,alert                                             |
| `GLOBAL_CONFIG`                         | 具有转义换行符的自定义配置字符串                             | foo = bar;\nkey = val;                                       |
| `RESTART_POLICY`                        | 容器重启策略                                                 | 默认值为 `unless-stopped`                                    |
| `DISABLE_HTTPS`                         | 处理此设置之外的 TLS 连接                                    | 0                                                            |
| `ENABLE_HTTP_REDIRECT`                  | 将 HTTP 流量重定向到 HTTPS                                   | 0                                                            |
| `LOG_LEVEL`                             | 控制 prosody 和相关模块输出的日志级别                        | info                                                         |
| `ENABLE_HSTS`                           | 发送 `strict-transport-security` 头以强制浏览器使用安全和受信任的连接。建议在生产环境中使用。 | 1                                                            |
| `ENABLE_IPV6`                           | 提供在不支持 IPv6 的环境中禁用 IPv6 的方式                   | 1                                                            |
| `ENABLE_COLIBRI_WEBSOCKET_UNSAFE_REGEX` | 启用旧版不安全的正则表达式，用于 JVB colibri-ws URL。警告：谨慎启用，此正则表达式允许连接任意内部 IP 地址，不建议在生产环境中使用。不安全的正则表达式定义为 | 0                                                            |
| `COLIBRI_WEBSOCKET_JVB_LOOKUP_NAME`     | 查找 JVB IP 地址的 DNS 名称，用于 `COLIBRI_WEBSOCKET_REGEX` 的默认值 | jvb                                                          |
| `COLIBRI_WEBSOCKET_REGEX`               | 重写用于代理到 JVB 的 colibri 正则表达式。建议在生产中用匹配可能 JVB IP 范围的值覆盖 | 默认是 `dig $COLIBRI_WEBSOCKET_JVB_LOOKUP_NAME` 除非 `DISABLE_COLIBRI_WEBSOCKET_JVB_LOOKUP` 被设置为 true |
| `DISABLE_COLIBRI_WEBSOCKET_JVB_LOOKUP`  | 控制在定义 `COLIBRI_WEBSOCKET_REGEX` 时是否运行 `dig $COLIBRI_WEBSOCKET_JVB_LOOKUP_NAME` | 0                                                            |

#### 高级 Prosody 选项

| 变量                                | 描述                                                         | 默认值        |
| ----------------------------------- | ------------------------------------------------------------ | ------------- |
| `PROSODY_RESERVATION_ENABLED`       | 启用 Prosody 的预留 REST API                                 | false         |
| `PROSODY_RESERVATION_REST_BASE_URL` | Prosody 的预留 REST API 的基本 URL                           |               |
| `PROSODY_AUTH_TYPE`                 | 为 Prosody 选择认证类型（internal、jwt 或 ldap）             | `AUTH_TYPE`   |
| `PROSODY_ENABLE_METRICS`            | 启用 http_openmetrics 模块，在 `/metrics` 处公开 Prometheus 指标 | false         |
| `PROSODY_METRICS_ALLOWED_CIDR`      | 允许访问指标的 CIDR 块                                       | 172.16.0.0/12 |

#### 高级 Jicofo 选项

| 变量                          | 描述                                                         | 默认值        |
| ----------------------------- | ------------------------------------------------------------ | ------------- |
| `JICOFO_COMPONENT_SECRET`     | Jicofo 的 XMPP 组件密码                                      | s3cr37        |
| `JICOFO_AUTH_USER`            | Jicofo 客户端连接的 XMPP 用户                                | focus         |
| `JICOFO_AUTH_PASSWORD`        | Jicofo 客户端连接的 XMPP 密码                                | `<unset>`     |
| `JICOFO_ENABLE_AUTH`          | 启用 Jicofo 的认证                                           | `ENABLE_AUTH` |
| `JICOFO_AUTH_TYPE`            | 为 Jicofo 选择认证类型（internal、jwt 或 ldap）              | `AUTH_TYPE`   |
| `JICOFO_AUTH_LIFETIME`        | 选择经过身份验证的用户的会话超时值                           | 24 hours      |
| `JICOFO_ENABLE_HEALTH_CHECKS` | 启用 Jicofo 内部健康检查，允许使用 REST API 检查 Jicofo 的状态 | false         |

#### 高级 JVB 选项

| 变量                    | 描述                                       | 默认值                                                       |
| ----------------------- | ------------------------------------------ | ------------------------------------------------------------ |
| `JVB_AUTH_USER`         | JVB MUC 客户端连接的 XMPP 用户             | jvb                                                          |
| `JVB_AUTH_PASSWORD`     | JVB MUC 客户端连接的 XMPP 密码             | `<unset>`                                                    |
| `JVB_STUN_SERVERS`      | 用于发现服务器公共 IP 的 STUN 服务器       | stun.l.google.com:19302, stun1.l.google.com:19302, stun2.l.google.com:19302 |
| `JVB_PORT`              | Jitsi Videobridge 使用的媒体 UDP 端口      | 10000                                                        |
| `JVB_COLIBRI_PORT`      | JVB 暴露给本地主机的 COLIBRI REST API 端口 | 8080                                                         |
| `JVB_BREWERY_MUC`       | JVB 池的 MUC 名称                          | jvbbrewery                                                   |
| `COLIBRI_REST_ENABLED`  | 启用 COLIBRI REST API                      | true                                                         |
| `SHUTDOWN_REST_ENABLED` | 启用关闭 REST API                          | true                                                         |

#### 高级 Jigasi 选项

| 变量                           | 描述                              | 默认值        |
| ------------------------------ | --------------------------------- | ------------- |
| `JIGASI_ENABLE_SDES_SRTP`      | 启用 SDES srtp                    | 0             |
| `JIGASI_SIP_KEEP_ALIVE_METHOD` | 保持连接的方法                    | OPTIONS       |
| `JIGASI_HEALTH_CHECK_SIP_URI`  | 健康检查扩展                      |               |
| `JIGASI_HEALTH_CHECK_INTERVAL` | 健康检查间隔                      | 300000        |
| `JIGASI_XMPP_USER`             | Jigasi MUC 客户端连接的 XMPP 用户 | jigasi        |
| `JIGASI_XMPP_PASSWORD`         | Jigasi MUC 客户端连接的 XMPP 密码 | `<unset>`     |
| `JIGASI_BREWERY_MUC`           | Jigasi 池的 MUC 名称              | jigasibrewery |
| `JIGASI_PORT_MIN`              | Jigasi 使用的媒体最小端口         | 20000         |
| `JIGASI_PORT_MAX`              | Jigasi 使用的媒体最大端口         | 20050         |

### 在 NAT 或局域网环境中运行

在局域网环境中运行，或通过 NAT 在公共互联网运行时，应设置 `JVB_ADVERTISE_IPS` 环境变量。此变量允许控制 JVB 将用于 WebRTC 媒体流量的 IP 地址。无论是否使用反向代理，都必须设置它，因为它是接收媒体（音频/视频）的 IP 地址，而不是 HTTP 流量，因此它与反向代理无关。

:::note
此变量以前称为 `DOCKER_HOST_ADDRESS`，但为了清晰起见，它已被重命名以支持 IP 列表。
:::

如果您的用户是通过互联网（而不是通过局域网）访问的，这通常是您的公共 IP 地址。如果未正确设置此项，当超过两名用户加入会议时，通话将崩溃。

尝试通过 [STUN] 发现公共 IP 地址。可以使用 `JVB_STUN_SERVERS` 选项指定 STUN 服务器。

:::note
由于当前在 Debian 仓库中的 Docker 版本（20.10.5）中的一个 bug，[Docker 不会监听 IPv6 端口](https://forums.docker.com/t/docker-doesnt-open-ipv6-ports/106201/2)，因此对于该组合，您需要 [手动获取最新版本](https://docs.docker.com/engine/install/debian/)。
:::

#### 拆分视图(Split horizon)

如果您在拆分视图环境中运行（局域网内部客户端连接到本地 IP，而其他客户端连接到公共 IP），可以通过用逗号分隔来指定多个广告 IP：

```
JVB_ADVERTISE_IPS=192.168.1.1,1.2.3.4
```

#### 离线 / 隔离安装

如果您的设置无法访问互联网，则需要在 JVB 上禁用 STUN，因为发现其自身 IP 地址将失败，但在此类环境中不需要此操作。

```
JVB_DISABLE_STUN=true
```

## 访问服务器日志

`docker-jitsi-meet` 的默认行为是将日志输出到 `stdout`。

虽然日志被发送到 `stdout`，但它们并未丢失：除非配置为丢弃所有日志，否则 Docker 会保留这些日志供将来检索和处理。

如果需要访问容器的日志，有多种方法可供选择。以下是主要方法：

- 通过命令行运行 `docker compose logs -t -f <service_name>`，其中 `<service_name>` 是 `web`、`prosody`、`jvb`、`jicofo` 中的一个。此命令将日志输出到 `stdout`，并带有时间戳。
- 使用标准的 [Docker 日志驱动程序](https://docs.docker.com/config/containers/logging/configure/) 将日志重定向到所需目标（例如 `syslog` 或 `splunk`）。
- 在 [Docker Hub](https://hub.docker.com/search?q=) 搜索第三方 [Docker 日志驱动插件](https://docs.docker.com/config/containers/logging/plugins/)。
- 或者，如果有非常具体的需求，可以[编写自己的日志驱动插件](https://docs.docker.com/engine/extend/plugins_logging/)。

例如，如果希望将与某个 `<service_name>` 相关的所有日志以 `json` 格式输出到 `/var/log/jitsi/<service_name>`，可以使用 [docker-file-log-driver](https://github.com/deep-compute/docker-file-log-driver)，并在 `docker-compose.yml` 文件中为所选 `<service_name>` 添加以下配置块：

```yaml
services:
    <service_name>:
        image: ...
        ...
        logging:
            driver: file-log-driver
            options:
                fpath: "/jitsi/<service_name>.log"
```

如果只想以 `json` 格式显示日志的 `message` 部分，只需执行以下命令（假设 `fpath` 被设置为 `/jitsi/jvb.log`），使用 `jq` 提取日志中的相关部分：

```bash
sudo cat /var/log/jitsi/jvb.log | jq -r '.msg' | jq -r '.message'
```

## 构建说明

构建映像使您能够单独编辑每个映像的配置文件，从而为部署提供更多自定义选项。

可以通过在主仓库文件夹中运行 `make` 命令来构建 Docker 映像。如果需要覆盖现有的远程源映像，使用 `FORCE_REBUILD=1 make`。

如果处于不稳定分支，可以使用 `FORCE_REBUILD=1 JITSI_RELEASE=unstable make` 构建映像。

现在可以像往常一样运行 `docker compose up`。

## 在反向代理后运行

默认情况下，此设置使用 WebSocket 连接来处理两个核心组件：

- 信令 - Signalling（XMPP）
- 桥接通道 - Bridge channel （Colibri）

由于 WebSocket 的逐跳性质(hop-by-hop nature of WebSockets)，反向代理必须正确终止并转发 WebSocket 连接。以下两个路径需要进行处理：

- /xmpp-websocket
- /colibri-ws

使用 nginx，可以通过以下配置片段转发这些路径：

```nginx
location /xmpp-websocket {
    proxy_pass https://localhost:8443;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
location /colibri-ws {
    proxy_pass https://localhost:8443;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

此外，还需要为 `/http-bind` 配置一个路径，因为移动客户端仍然使用基于 BOSH 的 XMPP：

```nginx
location /http-bind {
    proxy_pass https://localhost:8443;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

使用 Apache，需启用 `mod_proxy` 和 `mod_proxy_wstunnel`，并使用以下配置片段转发这些路径：

```apache
<IfModule mod_proxy.c>
    <IfModule mod_proxy_wstunnel.c>
        ProxyTimeout 900
        <Location "/xmpp-websocket">
            ProxyPass "wss://localhost:8443/xmpp-websocket"
        </Location>
        <Location "/colibri-ws/">
            ProxyPass "wss://localhost:8443/colibri-ws/"
        </Location>
        <Location "/http-bind">
            ProxyPass "http://localhost:8443/http-bind"
        </Location>
    </IfModule>
</IfModule>
```

其中 `https://localhost:8443/` 是 Web 服务的入口 URL。

### 禁用 WebSocket 连接

:::note
这不是推荐的设置。
:::

如果不能使用 WebSocket，可以设置以下环境变量以回退到 HTTP 轮询和 WebRTC 数据通道：

```bash
ENABLE_SCTP=1
ENABLE_COLIBRI_WEBSOCKET=0
ENABLE_XMPP_WEBSOCKET=0
```

[S6 Overlay]: https://github.com/just-containers/s6-overlay
[Jitsi repositories]: https://jitsi.org/downloads/
[Prosody]: https://prosody.im/
[Jicofo]: https://github.com/jitsi/jicofo
[Jitsi Videobridge]: https://github.com/jitsi/jitsi-videobridge
[Jigasi]: https://github.com/jitsi/jigasi
[STUN]: https://en.wikipedia.org/wiki/STUN
[jwt.io]: https://jwt.io/#debugger-io
[Etherpad]: https://github.com/ether/etherpad-lite
[Jibri]: https://github.com/jitsi/jibri
[latest release]: https://github.com/jitsi/docker-jitsi-meet/releases/latest
