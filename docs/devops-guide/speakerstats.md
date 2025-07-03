---
id: speakerstats
title: Enabling Speaker Stats - 启用发言者统计
sidebar_label: Speaker Stats - 启用发言者统计
---

要启用发言者统计功能，我们需要在主虚拟主机下启用 `speakerstats` 模块，这将启用发言者统计组件的广告。组件的地址需要在 `speakerstats_component` 选项中指定。

此外，我们还需要启用组件，地址需要在 `speakerstats_component` 中指定。组件还需要包含 `muc_component` 选项，该选项中包含 MUC（多用户聊天）组件的地址。

```lua
VirtualHost "jitsi.example.com"
    speakerstats_component = "speakerstats.jitsi.example.com"
    modules_enabled = {
        "speakerstats";
    }

Component "speakerstats.jitsi.example.com" "speakerstats_component"
    muc_component = "conference.jitsi.example.com"

Component "conference.jitsi.example.com" "muc"
```
