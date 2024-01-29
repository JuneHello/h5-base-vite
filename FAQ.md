# 常见问题

## 启动后报Delete `␍`eslint(prettier/prettier)

这是eslint校验换行格式发现的错误。

**原因：**

罪魁祸首是git的一个配置属性：core.autocrlf。由于历史原因，windows下和linux下的文本文件的换行符不一致。
Windows在换行的时候，同时使用了回车符CR(carriage-return character)和换行符LF(linefeed character)
而Mac和Linux系统，仅仅使用了换行符LF
老版本的Mac系统使用的是回车符CR

**解决方法：**
设置git拉代码的时候不要根据系统设置换行
先设置：git config --global core.autocrlf false
最后再拉项目

## rpx单位

rpx 即响应式px，一种根据屏幕宽度自适应的动态单位。以750宽的屏幕为基准，750rpx恰好为屏幕宽度。屏幕变宽，rpx 实际显示效果会等比放大，但在 App 端和 H5 端屏幕宽度达到 960px 时，默认将按照 375px 的屏幕宽度进行计算，具体配置参考：https://uniapp.dcloud.net.cn/collocation/pages.html#globalstyle

## vetur 提示组件引入报错

**原因：**

vue3 配套的 vscode 插件为 volar,vetur 会存在冲突

**解决方法：**

在扩展中搜索 volar 安装,然后搜索 vetur 设置禁用工作区

## git commit 保存代码被拦截

**原因：**

为了规范`git`提交规范，制定了`commitlint`规范。

**解决方法：**

按照 `commitlint.config.js` 文件中定义的规则进行`git commit`操作
示例:`git commit -m "feat: xxxxxx"`

## 如何根据快速定义 ts 接口类型

**原因：**

ts 类型声明在带来类型提示，减少编程过程中 bug 率的同时，也带来了需要声明很多数据类型的心智负担，手动一个一个去声明的话无疑会增加很多的开发成本。

**解决方法：**

- 1 vscode下载JSON to TS插件 或者 https://xiets.gitee.io/json-to-any-web/
- 2 将后端接口返回的json copy到mock-json2ts.ts文件下
- 3 按住快捷键：ctrl + shif + alt + v || s 生成ts接口类型

## husky 未执行

**原因：**

`pre-commit`,`commit-msg`自定义的钩子在执行中权限不足，无法被执行。

**解决方法：**

- 增加文件的执行权限。

  ```shell
  chmod +x ./.husky/pre-commit
  chmod +x ./.husky/commit-msg
  ```
