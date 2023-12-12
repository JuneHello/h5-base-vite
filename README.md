## 一、项目描述

- h5项目按照 比例设计。
- 拉取项目之后，建议按照自己的功能区域重命名文件，现以简单的位置进行区分。
- 项目环境： at least Node.js v16.14

## 二、项目启动

- pnpm i -> pnpm run dev
- 打包测试：pnpm run build:test

## 三、vscode请安装Eslint prettier stylelint 插件

- 打开VScode的设置，打开settings.json在里面配置一下代码，根据需求增减：

  //开启自动修复
  "editor.codeActionsOnSave": {
  "source.fixAll": true, // 开启自动修复
  "source.fixAll.stylelint": true, // 开启stylelint自动修复
  },
  // 配置stylelint检查的文件类型范围
  "stylelint.validate": [
  "css",
  "less",
  "postcss",
  "scss",
  "sass",
  "vue"
  ],
  "stylelint.enable": true,
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,

## 四、代码commit信息：

- commit格式： <type>: <subject> ，subject是 commit 的简短描述，不能超过50个字符，且结尾不加英文句号。
- 例如 git commit -m 'feat: 新增功能';
- 标准类型，看commitlint.config.cjs文件的 rules -> type-enum
  feat：新功能（feature）
  fix：修补bug
  docs：文档（documentation）
  style： 格式方面的优化
  refactor：重构
  test：测试
  chore：构建过程或辅助工具的变动
  等等

- 代码提交前会自动进行eslint/stylelint检查，看对应的(\*.cjs)配置文件
