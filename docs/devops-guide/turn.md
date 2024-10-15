---
id: turn
title: Setting up TURN - 设置 TURN 服务器
sidebar_label: TURN setup - 设置 TURN 服务器
---

一对一通话应该避免通过 JVB（Jitsi Videobridge）进行，以获得最佳性能和资源利用率。这就是我们添加点对点模式的原因，两个参与者可以直接连接到彼此。不幸的是，参与者之间并不总是可以建立直接连接。在这种情况下，您可以使用 TURN 服务器来中继流量（注意，JVB 的功能远不止于简单地中继流量，因此这与使用 JVB "中继" 流量并不相同）。

本文档描述了如何在 Jitsi Meet 中启用一对一通话的 TURN 服务器支持。尽管它提供了一些配置 [Prosody](https://prosody.im) 和 [coTURN](https://github.com/coturn/coturn) 的提示，但假设您已经正确配置了 TURN 服务器和 XMPP 服务器。

在 Meet 中配置 TURN 支持的一种方法是使用静态配置。您可以简单地填写 `p2p.stunServers` 选项，使用适当的值，例如：

```
    [
        { urls: 'turn:turn.example.com1', username: 'user', credential: 'pass' },
    ]
```

:::warning
这种技术不需要在 XMPP 服务器上进行任何特殊配置，但它暴露了 TURN 服务器的凭据，其他人可以自由使用您的带宽，因此尽管实施简单，但不推荐使用。
:::

这份 [草案](https://tools.ietf.org/html/draft-uberti-behave-turn-rest-00) 描述了一种提议的标准 REST API，通过短期（即时间限制）凭据访问 TURN 服务。这些凭据通过 HTTP 的 Web 服务进行发放，然后通过标准 TURN 协议提供给 TURN 服务器并进行检查。使用短期凭据确保即使用户可以发现凭据，也能控制对 TURN 服务器的访问。

Jitsi Meet 可以通过 [XEP-0215](https://xmpp.org/extensions/xep-0215.html) 从 XMPP 服务器获取 TURN 凭据，这一功能默认通过 [mod_external_services](https://prosody.im/doc/modules/mod_external_services) 进行配置。默认配置的 TURN 服务器使用 UDP 3478 和 TCP（TLS）5349 作为协议的默认端口。

## 在 443 端口上使用 TURN 服务器

默认情况下，TURN 服务器监听标准端口 UDP 3478 和 TCP 5349（用于 TLS 连接）。某些公司网络只允许使用 443（HTTPS）端口的 TCP 连接，因此在 443 端口上监听 TURN 服务器对于处理这种情况是很有用的。以下是在同一台机器上运行 nginx 和 TURN 服务器共享端口的方法。您需要为 TURN 域创建第二个 DNS 记录，指向同一台机器（作为参考，以下我们将使用 `turn-jitsi-meet.example.com`）。

- 您需要基于新 DNS 记录启用多路复用。您需要在 `/etc/nginx/modules` 或 `/etc/nginx/modules-available` 中创建一个文件。如果您将文件放在 `/etc/nginx/modules-available` 中，则需要在 `/etc/nginx/modules-enabled` 中添加一个符号链接。文件内容应如下所示：

```
stream {
    map $ssl_preread_server_name $name {
        jitsi-meet.example.com web_backend;
        turn-jitsi-meet.example.com turn_backend;
    }

    upstream web_backend {
        server 127.0.0.1:4444;
    }

    upstream turn_backend {
        server __your_public_ip__:5349;
    }

    server {
        listen 443;
        listen [::]:443;

        # since 1.11.5 从1.11.5开始
        ssl_preread on;

        proxy_pass $name;

        # Increase buffer to serve video 增加buffer以服务视频
        proxy_buffer_size 10m;
    }
}
```
确保您编辑该文件，并将 `jitsi-meet.example.com` 替换为您的部署域名，将 `turn-jitsi-meet.example.com` 替换为您将用于 TURN 服务器的 DNS 名称，并将 `__your_public_ip__` 替换为您部署的公共 IP 地址。如果您有更多的虚拟主机，请确保在此处添加它们并进行端口更改（下一步）。

- 然后转到 `/etc/nginx/sites-available/your-conf`，将您的虚拟主机更改为监听 4444 端口，而不是 443 端口。

```
server {
    listen 4444 ssl;
    listen [::]:4444 ssl;
    server_name jitsi-meet.example.com;
```

- 接下来，您需要确保 Prosody 广播正确的 DNS 名称和 TURN 服务器的端口。您应该编辑 `/etc/prosody/conf.d/jitsi-meet.example.com.cfg.lua` 文件中使用端口 `5349` 的行，使其看起来像这样（更改端口和地址）：

```
{ type = "turns", host = "turn-jitsi-meet.example.com", port = "443", transport = "tcp" }
```

- 现在，您需要确保 TURN 服务器（coturn）使用受信任的证书。以下是如何从 Let's Encrypt 请求这些证书的方法（确保为域名和电子邮件设置正确的值）：

```
systemctl stop nginx
DOMAIN="turn-jitsi-meet.example.com"
apt install socat
/opt/acmesh/.acme.sh/acme.sh -f --issue -d ${DOMAIN} --standalone --server letsencrypt
/opt/acmesh/.acme.sh/acme.sh -f --install-cert \
    -d ${DOMAIN} \
    --key-file /etc/jitsi/meet/${DOMAIN}.key \
    --fullchain-file /etc/jitsi/meet/${DOMAIN}.crt \
    --reloadcmd "/usr/share/jitsi-meet/scripts/coturn-le-update.sh ${DOMAIN}"
systemctl start nginx
```

- 在重新启动 Prosody (`systemctl restart prosody`) 后，您就可以开始使用了！
