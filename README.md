## 一、项目描述

- 启动问题看FAQ.md
- h5项目按照 比例设计。
- 项目环境： at least Node.js v16.14

## 二、项目启动

- pnpm i -> pnpm run start
- 打包测试：pnpm run build:test

## 项目注意事项

- store文件夹里面的文件只能平铺，参考现有的文件；直接写文件就行，保存后会自动注册进store并赋值到storeToRefs。如果失败，看下helper文件夹下pinia-auto-refs.ts（不要人为修改）

## 三、vscode请安装Eslint prettier stylelint 插件

## 四、代码commit信息：

- commit格式： <type>: <subject> ，subject是 commit 的简短描述，不能超过50个字符，且结尾不加英文句号。
- 例如 git commit -m "feat: 新增功能";---(注意是双引号)，如果提交不上去，执行pnpm i重新安装下；
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
