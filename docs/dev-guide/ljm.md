---
id: dev-guide-ljm
title: Modifying lib-jitsi-meet - 修改lib-jitsi-meet
---

# 修改 `lib-jitsi-meet`

默认情况下，该库作为GitHub发布中的预构建工件进行引用。包并未发布到npm。`package.json`中的默认依赖路径为：

```json
"lib-jitsi-meet": "https://github.com/jitsi/lib-jitsi-meet/releases/download/v<version>+<commit-hash>/lib-jitsi-meet.tgz",
```

要使用本地副本，您可以将路径更改为：

```json
"lib-jitsi-meet": "file:///Users/name/local-lib-jitsi-meet-packed-copy.tgz",
```

为了创建打包文件，在 `lib-jitsi-meet` 项目目录中运行 `npm pack`。

要使项目生效，您必须强制它将源视为“npm更新”：

```
npm install lib-jitsi-meet --force && make
```

或者如果您只对库进行更改：

```
npm install lib-jitsi-meet --force && make deploy-lib-jitsi-meet
```

另一种方法是使用 [npm link](https://docs.npmjs.com/cli/link)。它允许将 `lib-jitsi-meet` 依赖项链接到本地源，步骤如下：

```bash
cd lib-jitsi-meet

#### 为lib-jitsi-meet包创建全局符号链接
npm link

cd ../jitsi-meet

#### 从本地node_modules文件夹创建指向全局lib-jitsi-meet符号链接的符号链接
npm link lib-jitsi-meet
```

:::note
在构建移动应用程序时，链接将不起作用。
:::

在您对本地 `lib-jitsi-meet` 仓库进行更改后，可以使用 `npm run build` 重新构建它，并且您的 `jitsi-meet` 仓库将使用该修改后的库：

```bash
cd node_modules/lib-jitsi-meet
npm run build
```

如果您不再想使用本地仓库，则应运行：

```bash
cd jitsi-meet
npm unlink lib-jitsi-meet
npm install
```
