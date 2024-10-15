---
id: faq
title: FAQ - 常见问题解答
---

## 如何迁移出复用(multiplexing)并启用桥接 WebSockets (bridge websockets)

一段时间以来，我们使用 nginx 复用在 HTTPS（443 端口）上提供 Jitsi Meet 的内容，并使用同一端口运行 TURN 服务器。这被证明是有问题的（在此设置下无法使用 WebSockets），因此我们决定不再使用此方法。以下是如何删除复用并启用 WebSockets 以支持 WebRTC 数据通道的步骤。

1. **删除 nginx 中的复用**

   - 删除 `/etc/nginx/modules-enabled/60-jitsi-meet.conf`
   - 然后转到 `/etc/nginx/sites-available/your-conf` 并将您的虚拟主机改为监听 443 端口，而不是 4444 端口。

2. **编辑 TURN 服务器配置**

   - 确保您的 TURN 服务器在标准 TLS 端口 `5349` 上侦听。在 `/etc/turnserver.conf` 中确保有以下内容：  
     `tls-listening-port=5349`
   - 在 `/etc/prosody/conf.avail/your-conf.cfg.lua` 中，通过添加以下行，指示 Prosody 在 `5349` 端口上宣布 `turns` TURN 服务器：  
     `{ type = "turns", host = "your-domain", port = "5349", transport = "tcp" }`。确保将 `your-domain` 替换为您部署的 DNS。

3. **在 nginx 配置中添加桥接 WebSocket 位置**（在 `location = /xmpp-websocket` 部分之后添加）：

   ```nginx
     # colibri (JVB) websockets for jvb1
     location ~ ^/colibri-ws/default-id/(.*) {
        proxy_pass http://127.0.0.1:9090/colibri-ws/default-id/$1$is_args$args;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        tcp_nodelay on;
     }
   ```

4. **在 Jitsi Videobridge 中启用 WebSockets**。确保在 `/etc/jitsi/videobridge/jvb.conf` 中有：

   ```bash
   videobridge {
     http-servers {
         public {
             port = 9090
         }
     }
     websockets {
         enabled = true
         domain = "your-domain:443"
         tls = true
     }
   }
   ```

   确保将 `your-domain` 替换为您部署的 DNS。

5. **重启服务**  
   在重启桥接 (`systemctl restart jitsi-videobridge2`) 和 nginx (`systemctl restart nginx`) 后，您就可以正常使用了！
