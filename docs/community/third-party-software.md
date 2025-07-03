---
id: third-party-software
title: Third-Party Software - 第三方软件
---

此页面包含与Jitsi Meet相关的项目链接，但这些项目并不是由Jitsi团队维护的。

请保持此列表按字母顺序排列。

:::警告
由于这些软件包不是由Jitsi团队维护，如果您发现问题，请在其相应的论坛或问题跟踪系统中寻求帮助。
:::

## Cketti's Jitsi Hacks

一些使用注入脚本的额外功能。

https://jitsi-hacks.cketti.eu/

## Flutter plugin

适用于 Flutter 的插件。

https://pub.dev/packages/jitsi_meet

## Galaxy

Galaxy 是一个为 Jitsi 管理员和用户设计的网络应用程序，用于组织 Jitsi 会议、会议安排和与会者管理。支持 [JaaS](https://jaas.8x8.vc/) 和自托管的 Jitsi 部署。

GitHub: https://github.com/emrahcom/galaxy

Demo: https://eparto.net

## Galaxy-kc

这是使用 `Keycloak` 作为身份提供者的 `Galaxy` 版本。

https://github.com/emrahcom/galaxy-kc

## GStreamer pipeline integration

将 Jitsi Meet 会议与 GStreamer 管道集成。

https://github.com/avstack/gst-meet

## Jitok: Jitsi Token generator

用于生成与 Jitsi Meet 兼容的 JWT 的辅助网络工具和 API。

GitHub: https://github.com/jitsi-contrib/jitok

Demo: https://jitok.emrah.com/

Discussion: https://community.jitsi.org/t/jitok-jitsi-token-generator/94683

## Jitsi-Admin

一个用于组织会议的开源平台，包含所有大型会议工具中的功能：

- 规划会议
- 使用用户登录凭据保护会议
- 为访问您的会议的每个用户生成报告
- 创建预约投票并一键将其转换为会议
- Docker 化以便于安装

Github: https://github.com/H2-invent/jitsi-admin

Demo: https://jitsi-admin.de

Docker:
https://github.com/H2-invent/jitsi-admin/wiki/Install-jitsi-admin-in-docker

## Jitsi Config Differ

一个用于比较不同 Jitsi 版本之间参考配置的网络应用程序。旨在帮助用户识别升级部署时配置键和默认值的潜在变化。

https://shawnchin.github.io/jitsi-config-differ/

Github: https://github.com/shawnchin/jitsi-config-differ

## Jitsi URL Generator

一个简单的工具，用于展示如何组合 URL 参数以自定义 Jitsi。虽然它只展示了一小部分可能性，但希望能帮助用户熟悉，以便应用到白名单中的其他配置值。

https://shawnchin.github.io/jitsi-url-generator/

Github: https://github.com/shawnchin/jitsi-url-generator

## KeyCloak adapter

允许 Jitsi 使用 Keycloak 作为身份和 OIDC 提供者。

https://github.com/nordeck/jitsi-keycloak-adapter

## KeyCloak integration

用于身份验证的 KeyCloak 集成。

https://github.com/D3473R/jitsi-keycloak

## Outlook Plugin

为 Microsoft Outlook 添加 "安排 Jitsi 会议" 按钮的插件。

GitHub: https://github.com/timetheoretical/jitsi-meet-outlook

## Outlook Pluigin

根据 Microsoft 的现代架构编写的插件，添加 "安排 Jitsi 会议" 按钮到 Microsoft Outlook。

GitHub: https://github.com/diggsweden/jitsi-outlook

## Prosody Plugins

社区贡献的 Prosody 插件集合，可添加到自托管的 Jitsi 部署中。

https://github.com/jitsi-contrib/prosody-plugins

- **event_sync**: 在占用者或房间事件触发时向外部 API 发送 HTTP POST 请求。
- **frozen_nick**: 如果使用 JWT 认证且令牌上下文中提供了名称，则阻止用户更改显示名称。
- **jibri_autostart**: 当主持人进入房间时自动开始录制。
- **lobby_autostart**: 自动为所有房间启用大厅。
- **per_room_max_occupants**: 根据房间名称和子域设置不同的最大参与人数。
- **secure_domain_lobby_bypass**: 允许经过安全域认证的用户绕过大厅。
- **time_restricted**: 设置房间的时间限制，时间到后终止会议。
- **token_affiliation**: 根据令牌 (JWT) 中的隶属属性将用户提升为主持人。
- **token_lobby_bypass**: 根据令牌 (JWT) 中的标志允许某些用户绕过大厅。
- **token_lobby_ondemand**: 根据令牌 (JWT) 中的标志按需激活大厅。
- **token_owner_party**: 防止未经授权的用户创建房间，并在房间所有者离开时终止会议。

## SAML 到 Jitsi JWT 认证

通过 Shibboleth 将 SAML 认证集成到 Jitsi Meet JWT 生成器中。

Github: https://github.com/Renater/Jitsi-SAML2JWT

## Unity 插件

在 Unity 环境（WebGL）中使用 lib-jitsi-meet 的插件。

https://github.com/avstack/jitsi-meet-unity-demo

在 Unity 环境（Android 和 iOS）中使用 lib-jitsi-meet 的插件。

https://github.com/SariskaIO/Sariska-Media-Unity-Demo

## 通用 OIDC 和 SAML 适配器

为 Jitsi 添加 OIDC 和 SAML 支持，激活 JWT 和匿名域。认证会议主持人，允许访客无需身份验证即可加入。

Github: https://github.com/aadpM2hhdixoJm3u/jitsi-OIDC-SAML-adapter

Github: https://github.com/aadpM2hhdixoJm3u/jitsi-OIDC-adapter

