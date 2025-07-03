---
id: devops-guide-quickstart
title: "自托管指南 - Debian/Ubuntu服务器"
sidebar_label: "Debian/Ubuntu server"
---

在 Debian 系统上快速安装 Jitsi-Meet，请按照以下步骤操作。以下发行版开箱即用地得到支持：

- Debian 10（Buster）或更新版本
- Ubuntu 22.04（Jammy Jellyfish）或更新版本（可以使用 Ubuntu 18.04 或 20.04，但必须在安装之前将 Prosody 更新到 0.11+ 版本）

:::note
许多安装步骤需要 `root` 或 `sudo` 权限。因此，建议您拥有系统的 `sudo`/`root` 访问权限。
:::

## 必需的包和软件仓库更新

您需要以下软件包：

* `gnupg2`
* `nginx-full`
* `sudo` => **仅在使用 `sudo` 时需要**
* `curl` => **或者** `wget` **用于[添加 Jitsi 软件包仓库](#add-the-jitsi-package-repository)**

:::note 注意
必须使用 OpenJDK 11。
:::

确保您的系统是最新的，并且已安装所需的软件包：

以 `root` 身份或使用 `sudo` 运行：

```bash
# 检索所有软件仓库中的最新软件包版本
sudo apt update

# 确保支持通过 HTTPS 提供的 apt 软件仓库
sudo apt install apt-transport-https
```

在 Ubuntu 系统上，Jitsi 需要 Ubuntu 的 `universe` 软件包仓库中的依赖项。要确保此功能已启用，请运行以下命令：

```bash
sudo apt-add-repository universe
```

再次检索所有软件仓库中的最新软件包版本：

```bash
sudo apt update
```

## 安装 Jitsi Meet

### 服务器的域名和 DNS 设置

决定您的服务器将使用哪个域名。例如，`meet.example.org`。

为该域名设置一个 DNS A 记录，使用：

- 服务器的公共 IP 地址，如果它有自己的公共 IP；或者
- 路由器的公共 IP 地址，如果您的服务器有私有（RFC1918）IP 地址（例如 192.168.1.2），并通过路由器进行网络地址转换（NAT）。

如果您的计算机/服务器或路由器有动态 IP 地址（IP 地址不断变化），您可以使用动态 DNS 服务。例如 [DuckDNS](https://www.duckdns.org/)。

DNS 记录示例：

| **记录类型** |     **主机名**     |            **公共 IP**            | **TTL（秒）** |
| :----------: | :----------------: | :-------------------------------: | :-----------: |
|     `A`      | `meet.example.org` | 您的会议服务器公共 IP (`x.x.x.x`) |    `1800`     |

### 设置完全合格域名（FQDN）（可选）

如果用于托管 Jitsi Meet 实例的机器在 DNS 中已经设置了 FQDN（例如 `meet.example.org`），您可以使用以下命令设置它：

```bash
sudo hostnamectl set-hostname meet.example.org
```

然后在 `/etc/hosts` 文件中添加相同的 FQDN：

    127.0.0.1 localhost
    x.x.x.x meet.example.org

:::note
`x.x.x.x` 是您的服务器的公共 IP 地址。
:::

最后，在同一台机器上测试您是否可以 ping 通 FQDN：

`ping "$(hostname)"`

如果一切正常，您应该看到：
`meet.example.org`

### 添加 Prosody 软件包仓库

这将添加 Prosody 仓库，以便安装最新的 Prosody，这是实现包括大堂功能在内的功能所必需的。

**Ubuntu 18.04 和 20.04**

```bash
echo deb http://packages.prosody.im/debian $(lsb_release -sc) main | sudo tee -a /etc/apt/sources.list
wget https://prosody.im/files/prosody-debian-packages.key -O- | sudo apt-key add -
sudo apt install lua5.2
```

**Ubuntu 22.04**

```bash
sudo curl -sL https://prosody.im/files/prosody-debian-packages.key -o /etc/apt/keyrings/prosody-debian-packages.key
echo "deb [signed-by=/etc/apt/keyrings/prosody-debian-packages.key] http://packages.prosody.im/debian $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/prosody-debian-packages.list
sudo apt install lua5.2
```

### 添加 Jitsi 软件包仓库

这将把 Jitsi 仓库添加到您的软件包源中，以使 Jitsi Meet 软件包可用。

**Ubuntu 18.04 和 20.04**

```bash
curl https://download.jitsi.org/jitsi-key.gpg.key | sudo sh -c 'gpg --dearmor > /usr/share/keyrings/jitsi-keyring.gpg'
echo 'deb [signed-by=/usr/share/keyrings/jitsi-keyring.gpg] https://download.jitsi.org stable/' | sudo tee /etc/apt/sources.list.d/jitsi-stable.list > /dev/null
```

**Ubuntu 22.04**

```bash
curl -sL https://download.jitsi.org/jitsi-key.gpg.key | sudo sh -c 'gpg --dearmor > /usr/share/keyrings/jitsi-keyring.gpg'
echo "deb [signed-by=/usr/share/keyrings/jitsi-keyring.gpg] https://download.jitsi.org stable/" | sudo tee /etc/apt/sources.list.d/jitsi-stable.list
```

更新所有软件包源：

```bash
sudo apt update
```

### 设置和配置您的防火墙

以下端口需要在您的防火墙中打开，以允许流量访问 Jitsi Meet 服务器：

* `80 TCP` => 用于 SSL 证书验证/续订与 Let's Encrypt。**必需**
* `443 TCP` => 用于一般访问 Jitsi Meet。**必需**
* `10000 UDP` => 用于一般网络音视频会议。**必需**
* `22 TCP` => 用于通过 SSH 访问您的服务器（如果不是 22，请相应更改端口）。**必需**
* `3478 UDP` => 用于查询 STUN 服务器（coturn， 可选，需要更改 `config.js` 来启用它）。
* `5349 TCP` => 用于通过 TCP 进行回退网络视频/音频通信（例如，当 UDP 被阻塞时），由 coturn 提供。**必需**

如果您使用 `ufw`，可以使用以下命令：

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 10000/udp
sudo ufw allow 22/tcp
sudo ufw allow 3478/udp
sudo ufw allow 5349/tcp
sudo ufw enable
```

使用以下命令检查防火墙状态：

```
sudo ufw status verbose
```

#### 使用 SSH

有关使用和增强 SSH 访问的更多详细信息，请参阅相应的 [Debian](https://wiki.debian.org/SSH) 或 [Ubuntu](https://help.ubuntu.com/community/SSH/OpenSSH/Configuring) 文档。

#### 通过路由器转发端口

如果您在 NAT [后面运行 Jitsi Meet](https://jitsi.github.io/handbook/docs/faq#how-to-tell-if-my-server-instance-is-behind-nat)，请在路由器上将端口转发到服务器的 IP 地址。

_注意_：如果参与者无法看到或听到彼此，请仔细检查防火墙 / NAT 规则。

### TLS 证书

为了实现加密通信，您需要一个 [TLS 证书](https://en.wikipedia.org/wiki/Transport_Layer_Security)。

在安装 Jitsi Meet 时，您可以选择不同的选项：

1. 推荐的选项是选择 Let's Encrypt 证书选项。

2. 如果您想使用其他证书，您应该首先获取该证书，然后安装 jitsi-meet 并选择___我想使用我自己的证书___。

3. 您还可以使用自签名证书（___生成新的自签名证书___），但不推荐这样做，原因如下：

   * 使用自签名证书将导致用户浏览器中显示警告，因为他们无法验证您的服务器身份。

   * Jitsi Meet 移动应用 *需要* 一个由受信任的 [证书颁发机构](https://en.wikipedia.org/wiki/Certificate_authority) 签名的有效证书，如果选择自签名证书，将无法连接到您的服务器。

### 安装 Jitsi Meet

_注意_：安装程序将检查 [Nginx](https://nginx.org/) 或 [Apache](https://httpd.apache.org/) 是否存在（按此顺序），并在其找到的 Web 服务器内配置虚拟主机以提供 Jitsi Meet。

如果您已经在同一台机器上以端口 443 运行 Nginx，将跳过 turnserver 配置，因为这将与当前的端口 443 冲突。

```bash
# 安装 jitsi-meet
sudo apt install jitsi-meet
```

**SSL/TLS 证书生成：**
您将被询问关于 SSL/TLS 证书生成的相关信息。有关详细信息，请参阅 [上面](#tls-certificate)。

**主机名：**
您还将被询问输入 Jitsi Meet 实例的主机名。如果您有域名，请使用特定的域名，例如：
`meet.example.org`。
或者，您可以输入机器的 IP 地址（如果它是静态的或不变）。

该主机名将用于 Jitsi Meet 内的虚拟主机配置，您和您的联系人将使用它来访问网络会议。

### 访问控制

**Jitsi Meet 服务器：**
_注意_：默认情况下，任何访问您的 Jitsi Meet 服务器的人都可以启动会议：如果您的服务器向全世界开放，任何人都可以与其他人进行聊天。
如果您希望限制启动会议的能力仅限注册用户，请按照说明设置 [安全域](https://jitsi.github.io/handbook/docs/devops-guide/secure-domain/)。

**会议/房间：**
会议/房间的访问控制在房间内进行管理，您可以在特定房间创建后在网页上设置密码。
有关详细信息，请参见用户指南：[用户指南](https://jitsi.github.io/handbook/docs/user-guide/user-guide-start-a-jitsi-meeting)。

#### 高级配置

如果安装在 [NAT 后面](https://jitsi.github.io/handbook/docs/faq#how-to-tell-if-my-server-instance-is-behind-nat)，jitsi-videobridge 应在启动时自动配置。如果三方通话无法正常工作，则需要对 jitsi-videobridge 进行进一步配置，以使其可以从外部访问。

前提是所有必需的端口已转发到其运行的机器。默认情况下，这些端口是 TCP/443 和 UDP/10000。

需要在文件 `/etc/jitsi/videobridge/sip-communicator.properties` 中添加以下额外行：

```
org.ice4j.ice.harvest.NAT_HARVESTER_LOCAL_ADDRESS=<Local.IP.Address>
org.ice4j.ice.harvest.NAT_HARVESTER_PUBLIC_ADDRESS=<Public.IP.Address>
```

并注释掉现有的 `org.ice4j.ice.harvest.STUN_MAPPING_HARVESTER_ADDRESSES`。

有关详细信息，请参见 [ice4j 文档](https://github.com/jitsi/ice4j/blob/master/doc/configuration.md)。

**Systemd/限制：**
默认部署将对最大进程和打开文件的值设置得很低。对于超过 100 个参与者，请更改 `/etc/systemd/system.conf` 为：

```
DefaultLimitNOFILE=65000
DefaultLimitNPROC=65000
DefaultTasksMax=65000
```

要检查值，只需运行：

```
systemctl show --property DefaultLimitNPROC
systemctl show --property DefaultLimitNOFILE
systemctl show --property DefaultTasksMax
```

要加载值并检查，请参见 [下面](#systemd-details) 的详细信息。

##### Systemd 详情

要在运行的系统上重新加载 systemd 更改，请执行 `sudo systemctl daemon-reload` 和 `sudo systemctl restart jitsi-videobridge2`。
要检查任务部分，请执行 `sudo systemctl status jitsi-videobridge2`，您应该会看到 `Tasks: XX (limit: 65000)`。
要检查文件和进程部分，请执行 ```cat /proc/`cat /var/run/jitsi-videobridge/jitsi-videobridge.pid`/limits```，您应该会看到：

```
最大进程             65000                65000                进程
最大打开文件        65000                65000                文件
```

### 确认您的安装是否正常工作

启动一个 Web 浏览器（例如 Firefox、Chrome 或 Safari），并将前一步中的主机名或 IP 地址输入地址栏。

如果您使用自签名证书（而不是使用 Let's Encrypt），您的 Web 浏览器会询问您确认您信任该证书。如果您正在从 iOS 或 Android 应用测试，这可能会失败，如果您使用的是自签名证书。

您应该看到一个网页，提示您创建一个新会议。  
确保您能够成功创建会议，并且其他参与者能够加入会话。

如果这一切都正常工作，那么祝贺您！您已拥有一个可操作的 Jitsi 会议服务。

## 卸载

```bash
sudo apt purge jigasi jitsi-meet jitsi-meet-web-config jitsi-meet-prosody jitsi-meet-turnserver jitsi-meet-web jicofo jitsi-videobridge2
```

有时，以下软件包将无法正确卸载：

- jigasi
- jitsi-videobridge

当这种情况发生时，只需第二次运行卸载命令，它应该没问题。

失败的原因是，有时卸载脚本的速度快于停止守护进程的过程。第二次运行卸载命令可以解决此问题，因为到那时 jigasi 或 jitsi-videobridge 守护进程已经停止。

## 调试问题

* Web 浏览器：
  您可以尝试使用其他 Web 浏览器。一些浏览器的某些版本已知与 Jitsi Meet 存在问题。

* WebRTC、网络摄像头和麦克风：
  您还可以访问 https://webrtc.github.io/samples/src/content/getusermedia/gum 来测试浏览器的 [WebRTC](https://en.wikipedia.org/wiki/WebRTC) 支持。

* 防火墙：
  如果参与者无法看到或听到彼此，请仔细检查您的防火墙 / NAT 规则。

* Nginx/Apache：
  由于我们优先使用 Nginx 作为 Web 服务器，安装程序首先检查 Nginx 的存在，然后检查 Apache。如果您迫切需要强制使用 Apache，请尝试在 debconf 上预设变量 `jitsi-meet/enforce_apache` 用于软件包 `jitsi-meet-web-config`。

* 日志文件：
  查看各种日志文件：

```
/var/log/jitsi/jvb.log
/var/log/jitsi/jicofo.log
/var/log/prosody/prosody.log
```

## 附加功能

### 向 Jitsi Meet 添加 SIP 网关

#### 安装 Jigasi

Jigasi 是一个服务器端应用程序，充当 Jitsi Meet 会议的网关。它允许常规 [SIP](https://en.wikipedia.org/wiki/Session_Initiation_Protocol) 客户端加入会议并提供转录功能。

```bash
sudo apt install jigasi
```

在安装过程中，您将被要求输入您的 SIP 账户和密码。该账户将用于邀请其他 SIP 参与者。

#### 重新加载 Jitsi Meet

再次启动浏览器并访问 Jitsi Meet URL，您会在工具栏的右侧看到一个电话图标。使用它邀请 SIP 账户加入当前会议。

享受吧！Enjoy!
