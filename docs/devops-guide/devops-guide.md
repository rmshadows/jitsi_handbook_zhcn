---
id: devops-guide-start
title: 自托管指南 - 概述
sidebar_label: Overview
---

:::note
这些指南帮助您**托管(部署)自己的 Jitsi-Meet 服务器**。  
如果您不想设置任何基础设施，直接进行视频会议，请使用 https://meet.jit.si。
:::

## 首先，一些常规建议

由于 Jitsi Meet 基于 [WebRTC](https://en.wikipedia.org/wiki/WebRTC)，因此需要一个加密的通信链接（https）才能实现多媒体功能，并且设置过程并非总是简单的。

最佳选择是使用一个拥有域名和证书的互联网服务器，并在 [DNS](https://en.wikipedia.org/wiki/Domain_Name_System#Domain_name_registration) 中注册域名。

虽然可以在私人网络上设置服务器并使用自签名证书，但这种方法会更复杂，尤其是当您希望既能从私人网络访问，又能从公共互联网访问时。使用手机时可能会遇到更多问题，因为许多手机客户端通常不接受自签名证书。

如果您在使用手机客户端时遇到问题，请[检查您的证书](https://whatsmychaincert.com)。

<hr />

import DocCardList from '@theme/DocCardList';

<DocCardList />
