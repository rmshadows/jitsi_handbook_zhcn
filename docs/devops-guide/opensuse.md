---
id: devops-guide-opensuse
title: Self-Hosting Guide - openSUSE
sidebar_label: openSUSE
---

本文描述了在 openSUSE Leap 15.2 上快速安装 Jitsi-Meet 的步骤，包括单个 Videobridge 和单个 Jicofo。

__注意__：许多安装步骤需要 root 访问权限。

## 安装

1. 添加 OBS 仓库：  
   __注意：__ 当 Jitsi-Meet 合并到 openSUSE Factory 时，这将不再需要。

```shell
zypper addrepo https://download.opensuse.org/repositories/home:/SchoolGuy:/jitsi/openSUSE_Leap_15.2/home:SchoolGuy:jitsi.repo
```

2. 刷新软件仓库：

```shell
zypper refresh
```

3. 安装 Jitsi-Meet 及其依赖项：

```shell
zypper install nginx prosody lua51-zlib jitsi-meet jitsi-videobridge jitsi-jicofo
```

### 可选附加组件

* 安装 Jibri 附加组件： `zypper install jitsi-jibri`
* 安装 Jigasi 附加组件： `zypper install jitsi-jigasi`

## 配置

以下部分描述如何配置不同的软件包。  
将 `<FQDN>` 替换为您的域名，将 `YOURSECRET3` 替换为一个强密码。

### Prosody

* 打开并调整位于 `/etc/prosody/prosody.cfg.lua` 的 Prosody 配置文件：

```lua
---------- Server-wide settings ----------
admins = { "focus@auth.<FQDN>" }
cross_domain_bosh = true;
modules_enabled = {
        -- HTTP modules
                "bosh"; -- 启用 BOSH 客户端，即 "Jabber over HTTP"
        -- jitsi
                "smacks";
                "mam";
                "lastactivity";
                "offline";
                "pubsub";
                "adhoc";
                "websocket";
                "http_altconnect";
                "compression";
}
```

* 在 `/etc/prosody/conf.avail/` 下创建一个名为 `<FQDN>.cfg.lua` 的新配置文件，内容如下：

```lua title="/etc/prosody/conf.avail/meet.example.org.cfg.lua"
plugin_paths = { "/usr/share/jitsi-meet/prosody-plugins/" }

-- 根据 https://prosody.im/doc/setting_up_bosh#proxying_requests
consider_bosh_secure = true

-- 域名映射器选项，必须至少设置域名基础以使用映射器
muc_mapper_domain_base = "<FQDN>";

turncredentials_secret = "YOURSECRET3";

turncredentials = {
  { type = "stun", host = "<FQDN>", port = "3478" },
  { type = "turn", host = "<FQDN>", port = "3478", transport = "udp" },
  --  { type = "turns", host = "<FQDN>", port = "443", transport = "tcp" }
};

VirtualHost "<FQDN>"
    authentication = "anonymous"
    ssl = {
        key = "/var/lib/prosody/<FQDN>.key";
        certificate = "/var/lib/prosody/<FQDN>.crt";
    }
    speakerstats_component = "speakerstats.<FQDN>"
    conference_duration_component = "conferenceduration.<FQDN>"
    modules_enabled = {
        "bosh";
        "pubsub";
	    "speakerstats";
	    "turncredentials";
        "conference_duration";
    }
    c2s_require_encryption = false

Component "conference.<FQDN>" "muc"
    modules_enabled = {
        "muc_meeting_id";
        "muc_domain_mapper";
    }
    admins = { "focus@auth.<FQDN>" }
    muc_room_locking = false
    muc_room_default_public_jids = true

-- 内部 muc 组件
Component "internal.auth.<FQDN>" "muc"
    modules_enabled = {
      "ping";
    }
    admins = { "focus@auth.<FQDN>" }
    muc_room_locking = false
    muc_room_default_public_jids = true
    muc_room_cache_size = 1000

Component "jitsi-videobridge.<FQDN>"
    component_secret = "YOURSECRET3"

VirtualHost "auth.<FQDN>"
    ssl = {
        key = "/var/lib/prosody/auth.<FQDN>.key";
        certificate = "/var/lib/prosody/auth.<FQDN>.crt";
    }
    authentication = "internal_plain"

Component "focus.<FQDN>"
    component_secret = "YOURSECRET3"

Component "speakerstats.<FQDN>" "speakerstats_component"
    muc_component = "conference.<FQDN>"

Component "conferenceduration.<FQDN>" "conference_duration_component"
    muc_component = "conference.<FQDN>"
```

* 创建配置的符号链接：  
  `ln --symbolic /etc/prosody/conf.avail/<FQDN>.cfg.lua /etc/prosody/conf.d/<FQDN>.cfg.lua`

* 通过 `prosodyctl cert generate <DOMAIN>` 创建证书。  
  `<DOMAIN>` 表示以下 URL。

    * `auth.<FQDN>`
    * `conference.<FQDN>`
    * `conferenceduration.<FQDN>`
    * `internal.auth.<FQDN>`
    * `FQDN`
    * `focus.<FQDN>`
    * `jitsi-videobridge.<FQDN>`
    * `callcontrol.<FQDN>` __注意：__ 仅在您部署 Jigasi 时需要此项
    * `recorder.<FQDN>` __注意：__ 仅在您部署 Jibri 时需要此项
* `/var/lib/prosody/`：将所有生成的 `*.crt` 和 `*.key` 文件的符号链接指向 `/etc/prosody/certs/`。

:::note
请不要链接其他证书。
:::

* 将证书添加到系统密钥库：
  * `ln --symbolic --force /var/lib/prosody/auth.<FQDN>.crt /usr/local/share/ca-certificates/auth.<FQDN>.crt`
  * `update-ca-certificates --fresh`
* 创建会议焦点用户： `prosodyctl register focus auth.<FQDN> YOURSECRET3`

### Nginx

编辑 `/etc/nginx/vhosts.d/` 中的 `jitsi-meet.conf` 文件（与 `jitsi-meet` 一起安装），并执行以下操作：

* 检查 `server_name` 的值。
* 检查 TLS 证书（生产环境使用 Let's Encrypt，测试时可以使用 Prosody 的证书）。

__注意：__ 如果您使用的是现有服务器，请确保也调整 websocket 和 bosh 部分。

### Jitsi-Meet

* 转到 `/srv/jitsi-meet` 并编辑 `config.js`：

```js title="/srv/jitsi-meet/config.js"
var config = {
    hosts: {
        domain: '<FQDN>',
        muc: 'conference.<FQDN>',
        bridge: 'jitsi-videobridge.<FQDN>',
        focus: 'focus.<FQDN>'
    },
    useNicks: false,
    bosh: '//<FQDN>/http-bind',
};
```

__注意：__ 请注意，这是最小配置。

### Jitsi-Videobridge

__注意：__ 我们结合了 [新 Videobridge 配置](https://github.com/jitsi/jitsi-videobridge/blob/master/doc/muc.md#videobridge-configuration) 和包含 `sip-communicator.properties` 文件的旧配置。我们必须这样做是因为 `STATISTICS_TRANSPORT` 属性。

如果我们从 `sip-communicator.properties` 中删除 `org.jitsi.videobridge.STATISTICS_TRANSPORT=muc,colibri`，视频桥将无法工作！

* 转到目录 `/etc/jitsi/videobridge`
* 编辑文件 `jitsi-videobridge.conf`
  * 将 `JVB_HOSTNAME` 设置为您的 `<FQDN>`。
  * 将 `JVB_SECRET` 设置为您自己的密钥。
* 编辑文件 `application.conf`，并调整 `apis` 和 `websockets` 下的值，尤其是使用 `uuidgen` 设置唯一 ID 作为 `muc_nickname`。

```HUCON
apis {
    xmpp-client {
      configs {
        xmpp-server-1 {
          hostname="localhost"
          domain = "auth.${FQDN}"
          username = "focus"
          password = "YOURSECRET3"
          muc_jids = "JvbBrewery@internal.auth.${FQDN}"
          # The muc_nickname must be unique across all jitsi-videobridge instances
          # muc_nickname 必须在所有 jitsi-videobridge 实例中唯一
          muc_nickname = "unique-id"
          disable_certificate_verification = true
        }
      }
    }
}
websockets {
  enabled=true
  server-id="default-id"
  domain="${FQDN}"
}
```

### Jitsi-Jicofo

* 转到目录 `/etc/jitsi/jicofo`
* 编辑文件 `jitsi-jicofo.conf`
  * 将属性 `JICOFO_HOSTNAME` 设置为 `<FQDN>`。
  * 将属性 `JICOFO_SECRET` 设置为上面设置中 Prosody 用户的密码。
  * 将属性 `JICOFO_AUTH_DOMAIN` 设置为 `auth.<FQDN>`。
  * 将属性 `JICOFO_AUTH_USER` 设置为上面设置中的 Prosody 用户。
* 编辑文件 `sip-communicator.properties`
  * 将属性 `org.jitsi.jicofo.BRIDGE_MUC` 设置为 `JvbBrewery@internal.auth.<FQDN>`。
  * 将属性 `org.jitsi.jicofo.jibri.BREWERY` 设置为 `JibriBrewery@internal.auth.<FQDN>`。
  * 根据您的证书设置，将 `org.jitsi.jicofo.ALWAYS_TRUST_MODE_ENABLED` 设置为 `true` 或 `false`。

## 附加组件：Jitsi-Jibri

* 在文件 `/etc/prosody/conf.avail/<FQDN>.cfg.lua` 的末尾添加以下代码段。

```lua
VirtualHost "recorder.<FQDN>"
  modules_enabled = {
    "ping";
  }
  authentication = "internal_plain"
```

* 运行 `prosodyctl register jibri auth.<FQDN> YOURSECRET3`，并将 `YOURSECRET3` 替换为适当的值。
* 运行 `prosodyctl register recorder recorder.<FQDN> YOURSECRET3`，并将 `YOURSECRET3` 替换为适当的值。
* 转到目录 `/etc/jitsi/jibri`，编辑以下属性，其他保持不变。

```HUCON
jibri{
    api{
        environments = [
            {
                xmpp-domain = "<FQDN>"
                control-muc {
                    domain = "internal.<FQDN>"
                }
                control-login {
                    domain = "recorder.<FQDN>"
                    username = "recorder"
                    password = "YOURSECRET3"
                }   
                call-login {
                    domain = "recorder.<FQDN>"
                    username = "recorder"
                    password = "YOURSECRET3"
                }
            }
        ]
    }
}
```

* 编辑文件 `/etc/jitsi/jicofo/sip-communicator.properties` 并添加以下属性：

```HUCON
org.jitsi.jicofo.jibri.BREWERY=JibriBrewery@internal.auth.<FQDN>
org.jitsi.jicofo.jibri.PENDING_TIMEOUT=90
```

* 编辑文件 `/srv/jitsi-meet/config.js` 并设置以下属性：

```js
fileRecordingsEnabled: true, // 如果您想启用文件录制
liveStreamingEnabled: true, // 如果您想启用直播
hiddenDomain: 'recorder.<FQDN>',
```

* 编辑 `/srv/jitsi-meet/interface_config.js` 并确保 `TOOLBAR_BUTTONS` 数组包含 `recording` 和 `livestreaming` 值，以便您希望启用这些功能。

```js
TOOLBAR_BUTTONS: [
        'microphone', 'camera', 'closedcaptions', 'desktop', 'embedmeeting', 'fullscreen',
        'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
        'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
        'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
        'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone', 'security'
],
```

## 附加组件：Jitsi-Jigasi

__来自 openSUSE 打包者的说明：__ 我们已经打包了它，但没有基础设施来设置这个组件。因此我们目前无法提供指南。

## 服务

现在一切应该都可以正常工作了。这意味着您准备好启动所有服务：

1. `systemctl start prosody`
2. `systemctl start jitsi-videbridge`
3. `systemctl start jitsi-jicofo`
4. `systemctl start jitsi-jibri`（如果之前已配置和安装）
5. `systemctl start jitsi-jigasi`（如果之前已配置和安装）
6. `systemctl start nginx`

## 最后注意事项

* Jitsi 软件有很多依赖项，因此我们建议在专用主机上运行 Jitsi。
* 更新 Jitsi 对消除错误和更新可能的安全修复至关重要。
* 尽管通过 Chrome 有诱惑：不要为此安装完整的 X11 堆栈，如 KDE 或 Gnome。
* 不要将 `rpms` 或 `debs` 与相同组件的源安装混合。
* 安全备份您的配置，最好使用版本控制系统（VCS）。这可以节省时间，并在回滚或处理其他问题时减轻痛苦。
