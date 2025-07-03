---
id: dev-guide-contributing
title: Contributing Guidelines - 贡献指南
---

# 🤝 如何贡献

我们非常感谢您愿意贡献 ❤️ 在开始工作之前，请花一点时间阅读并遵循以下简要指南。

# 📥 报告问题和提问

- 我们希望问题首先在[社区论坛](https://community.jitsi.org/)中讨论，确认后再在相关项目的 GitHub 问题追踪器中提交。

- 欢迎随时报告***任何错误、请求新功能或任何其他您需要帮助的事项***。提交问题时，请尽可能提供详细信息。

- 对于一般性和实现特定的问题，请在[社区论坛](https://community.jitsi.org/)上提问以获得支持。

### 🪲 错误报告和其他问题

报告错误时，请遵循以下步骤：

- **提供详细信息：**  
  包括 Jitsi Meet、Jicofo 和 JVB 的版本。

- **问题描述：**  
  清晰地解释所遇到的问题。

- **重现步骤：**  
  提供逐步说明以重现该问题。

- **预期行为：**  
  描述使用软件时的预期结果。

- **实际行为：**  
  解释实际发生的情况，包括任何错误消息。

### 💟 功能请求

如果您对 Jitsi 有新的功能想法或希望改进的地方，请按照以下方式告知我们：

- **描述功能：**  
  指定所需的功能。

- **提供示例：**  
  分享其他应用程序中的类似功能。

- **解释重要性：**  
  论证该功能的相关性。

- **考虑事项：**  
  评估潜在挑战。

- **附加细节：**  
  包括具体的偏好设置。

# 代码贡献

- 访问问题追踪器（例如 [Jitsi Meet 的问题追踪器](https://github.com/jitsi/jitsi-meet/issues)）以查找需要关注的开放问题列表。

- 发现了错误或有功能请求并知道如何修复？太好了！请继续阅读 🔍

- [开发者指南](/docs/category/developer-guide) 将帮助您设置开发环境以开始在 Jitsi Meet 应用程序上工作。

## ✏️ 贡献者许可协议

虽然 Jitsi 项目是在[Apache 许可证 2.0](https://github.com/jitsi/jitsi-meet/blob/master/LICENSE)下发布的，但版权持有者和主要创作者是[8x8](https://www.8x8.com/)。为了确保我们能够继续以开放源代码许可证的形式提供这些项目，我们需要您以[公司](https://jitsi.org/ccla)或[个人](https://jitsi.org/icla)的身份签署我们的基于 Apache 的贡献者许可协议。如果您无法接受协议中规定的条款，我们很抱歉，无法接受您的贡献。

## 🔁 创建拉取请求

- 将仓库分叉到您的 GitHub 账户中。
- 为您的更改创建一个新分支，基于主分支。为您的分支选择一个描述性的名称。
- 每个拉取请求仅包含**一个**逻辑更改，以保持组织性。
- 保持您的提交历史记录干净简明。如有必要，将多个提交合并为一个。
- 在提交拉取请求之前，将您的分支变基到主分支的最新更改上。**永远**不要合并主分支，始终进行变基。

### 📝 提交消息

Jitsi 项目遵循[约定式提交](https://www.conventionalcommits.org)规范，同时使范围成为必需。

也就是说，我们使用 `feat(feature name) 添加某些功能`，而不是 `feat: 添加某些功能`。随着项目的扩大，缩小更改范围会很有帮助。

以下是提交类型的非详尽列表：

```
[
  'build',
  'chore',
  'ci',
  'docs',
  'feat',
  'fix',
  'perf',
  'refactor',
  'revert',
  'style',
  'test'
];
```

对于什么构成“功能”，这可能因项目而异。“子系统”是另一个有效的比喻。例如，在 Jitsi Meet 中，功能名称可以是您所做更改的功能：`react/features/<this>`。在 lib-jitsi-meet 中，模块：`modules/<this>`。

在犹豫时请使用您的判断，并查看提交历史记录。

## ❗️ 对于 8x8 员工

- 请不要链接任何内部资源，例如 Jira 问题，这是一个开源项目。

## 📝 代码风格

### 注释

* 必须对源代码进行文档注释。

  * 自动生成文档的注释**不**受个案决策的影响。例如，类型及其成员的注释就是这种情况。自动从这些注释生成文档的工具示例包括 JSDoc、Javadoc、Doxygen。

  * 强烈鼓励不被自动处理的注释。这些注释在个案决策中是被考虑的，通常在函数体中可以观察到。

* 注释应格式化为完整的英语句子。这样的格式应关注例如大写和标点符号。

### 代码重复

* 不要复制粘贴源代码。要重用它。但是要小心，不要为了重用一小段代码而创建不良抽象。

### 命名

* 抽象在项目内及多个项目中应有一个名称。例如：

  * lib-jitsi-meet 的 `JitsiConnection` 类型的实例应在 jitsi-meet 中命名为 `connection` 或 `jitsiConnection`，而不是 `client`。

  * 类 `ReducerRegistry` 应在 ReducerRegistry.js 中定义，并且其他文件中的导入应使用相同的名称。不要在 ReducerRegistry.js 中定义类 `Registry`，然后在其他文件中将其导入为 `Reducers`。

* 全局常量（包括 ES6 模块全局常量）的名称应使用大写字母，并用下划线分隔单词。例如，`BACKGROUND_COLOR`。

* 名称开头的下划线字符表示相应的变量、函数或属性是非公开的，即私有、受保护或内部。相反，名称开头没有下划线的表示公共 API。

### TypeScript

#### 功能布局

添加新功能时，通常的布局如下所示：

```
react/features/sample/
├── actionTypes.ts
├── actions.ts
├── components
│   ├── AnotherComponent.tsx
│   └── OneComponent.tsx
├── middleware.ts
└── reducer.ts
```

所有新功能必须使用 TypeScript 编写。在处理旧功能时，建议将 JavaScript 文件转换为 TypeScript。

中间件必须在 `react/features/app/` 中导入，具体在 `middlewares.any`、`middlewares.native.js` 或 `middlewares.web.js` 中适当的位置。同样，reducer 也应如此。

一般而言，我们希望避免使用 `index` 文件。我们更倾向于使用完整路径进行导入。然而，在某些情况下，共用文件（用于 Web 和原生，例如 `actions.ts`）需要从组件导入（根据构建平台，可能是 `/native` 或 `/web`）。在这种情况下，我们在 `components/` 中创建两个 `index` 文件：`index.native.ts` 和 `index.web.ts`，仅导出我们需要的组件。然后，共用文件应从 `components/index` 导入。

这并非一直如此，整个代码库也尚未迁移到该模型，但新功能应遵循此新布局。

在处理旧功能时，鼓励添加必要的更改以迁移到新模型。

#### 避免包体膨胀

添加新功能可能会导致由于包大小增加而触发构建失败。我们有防范措施来避免包体不成比例地增长。虽然增加限制是有合理原因的，但请先分析包体，以确保没有意外依赖项被包含，从而导致大小增加。

首先，制作一个启用了包分析的生产构建：

```
npx webpack -p --analyze-bundle
```

然后打开交互式包分析工具：

```
npx webpack-bundle-analyzer build/app-stats.json
```

### Kotlin

- 对于 Kotlin 代码，我们使用[标准约定](https://kotlinlang.org/docs/coding-conventions.html)，并将行长度限制为 120 个字符。我们使用 `ktlint` 来强制执行格式。

## ✅ 代码审查

- **提交您的贡献：** 完成工作后，提交您的贡献。
- **草稿 PR 供讨论：** 考虑提前打开草稿 PR，与团队讨论您的方法，然后再完全实现它。草稿 PR 促进早期合作，确保高效进展。
- **分配审查者：** 根据受影响的代码库和所需的专业知识为适当的审查者分配任务。
- **审查过程：** 审查者将仔细检查您的代码，检查其是否符合编码标准、正确性、性能和潜在问题。
- **反馈和迭代：** 如果在审查过程中发现任何问题或建议，您将收到审查者的反馈。解决提出的任何意见或关注，并对代码进行必要的修订。
- **自动化测试：** 一旦 PR 状态良好，团队成员将触发自动化测试。PR 需要与主分支干净合并，测试失败或此阶段发现的问题需要在 PR 获得合并批准之前解决。
- **批准：** 一旦代码符合所需标准，经过审查并通过测试，就会获得合并到主代码库的批准。

## 🎉 问题关闭(Issue Closing)

- 您可以通过在拉取请求和提交消息中使用关键词自动关闭问题。有关更多信息，请参见“[将拉取请求链接到问题。](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword#linking-a-pull-request-to-an-issue-using-a-keyword)”
