---
id: devops-guide-scalable
title: DevOps Guide - Scalable setup - 可扩展性配置
sidebar_label: Scalable setup - 可扩展性配置
---

对于Jitsi的单服务器安装，适用于有限数量的并发会议。首个限制因素是**videobridge**组件，它负责处理实际的视频和音频流量。你可以通过水平扩展视频桥（videobridges）来应对更大的流量需求。在云环境中，还可以根据需求动态地增加或减少视频桥的数量。

:::warning
[Youtube上关于扩展的教程](https://www.youtube.com/watch?v=LyGV4uW8km8)已经过时，描述的是旧的配置方法。当前默认的Jitsi Meet安装已经配置为支持水平扩展。
:::

:::note
构建可扩展的基础架构并不适合初学的Jitsi管理员。此说明假设你已成功安装了单节点版本，并且对Linux软件的安装、配置和调试感到熟悉。这并不是逐步的指导，而是展示需要安装哪些软件包以及需要更改哪些配置。强烈建议使用配置管理工具（如Ansible或Puppet）来管理安装和配置过程。
:::

## 架构（单个Jitsi-Meet，多个videobridges）

首个步骤是将中心Jitsi-Meet实例的功能（包括nginx、prosody和jicofo）与videobridges分离。

以下是一个简化的安装示意图，其中包含一个Jitsi-Meet实例和三个负载均衡的视频桥。每个方框代表一台服务器或虚拟机（VM）。

```
               +                                       +
               |                                       |
               |                                       |
               v                                       v
          80, 443 TCP                          443 TCP, 10000 UDP
       +--------------+                     +---------------------+
       |  nginx       |  5222 TCP           |                     |
       |  Jitsi Meet  |<-------------------+|  jitsi-videobridge  |
       |  prosody     |         |           |                     |
       |  jicofo      |         |           +---------------------+
       +--------------+         |
                                |           +---------------------+
                                |           |                     |
                                +----------+|  jitsi-videobridge  |
                                |           |                     |
                                |           +---------------------+
                                |
                                |           +---------------------+
                                |           |                     |
                                +----------+|  jitsi-videobridge  |
                                            |                     |
                                            +---------------------+
```

## 服务器规格

Jitsi-Meet服务器的负载通常不会太大（除非你同时有许多会议）。通常，4个CPU和8GB内存的机器已经足够。

相对而言，videobridge的负载更大，4或8个CPU以及8GB内存是一个不错的配置。

### Jitsi-Meet的安装

假设安装将运行在以下FQDN：`meet.example.com`，并且你已将SSL证书和密钥存放在`/etc/ssl/meet.example.com.{crt,key}`。

在安装这些软件包之前，设置如下DebConf变量。（我们并不安装`jitsi-meet`包，它会为我们处理这些设置）

首先安装`debconf-utils`包：

```
$ cat << EOF | sudo debconf-set-selections
jitsi-videobridge	jitsi-videobridge/jvb-hostname	string	meet.example.com
jitsi-meet	jitsi-meet/jvb-serve	boolean	false
jitsi-meet-prosody	jitsi-videobridge/jvb-hostname	string	meet.example.com
jitsi-meet-web-config	jitsi-meet/cert-choice	select	I want to use my own certificate
jitsi-meet-web-config	jitsi-meet/cert-path-crt	string	/etc/ssl/meet.example.com.crt
jitsi-meet-web-config	jitsi-meet/cert-path-key	string	/etc/ssl/meet.example.com.key
jitsi-meet-web-config	jitsi-meet/jaas-choice	boolean	false
EOF
```

如果你需要启用与[Jitsi Meet组件](https://jaas.8x8.vc/#/components)的集成以支持电话功能，将上述`jitsi-meet/jaas-choice`选项设为`true`。

在jitsi-meet服务器上，安装以下软件包：

* `nginx`
* `prosody`
* `jicofo`
* `jitsi-meet-web`
* `jitsi-meet-prosody`
* `jitsi-meet-web-config`

### 安装视频桥（Videobridge）

为了简化起见，设置与前面相同的`debconf`变量并安装：

* `jitsi-videobridge2`

### Jitsi-Meet的配置

#### 防火墙

打开以下端口：

对外开放：

* 80 TCP
* 443 TCP

仅对视频桥开放：

* 5222 TCP（用于Prosody）

#### NGINX

像往常一样创建 `/etc/nginx/sites-available/meet.example.com.conf`

#### Jitsi-Meet

根据你的具体需求修改 `/usr/share/jitsi-meet/config.js` 和 `/usr/share/jitsi-meet/interface-config.js`

#### Jicofo

无需对默认安装进行任何更改。

### 视频桥的配置

#### 防火墙

打开以下端口：

对外开放：

* 10000 UDP（用于媒体传输）

#### jitsi-videobridge2

无需对默认设置进行更改。

## 测试

重启所有服务（`prosody`、`jicofo`和所有`jitsi-videobridge2`）后，你可以在`/var/log/prosody/prosody.log`和`/var/log/jitsi/jicofo.log`中看到视频桥连接到Prosody，Jicofo也会识别到它们。

当新的会议开始时，Jicofo会选择一个视频桥并在其上安排会议。
