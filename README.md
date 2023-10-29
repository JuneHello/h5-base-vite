## node版本 v16.20.1

## vscode请安装Eslint prettier stylelint 插件

### 打开VScode的设置，打开settings.json在里面配置一下代码，根据需求增减：

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

## 代码commit信息：看commitlint.config.cjs文件的 rules -> type-enum

## 代码提交前会自动进行eslint/stylelint检查，看对应的(\*.cjs)配置文件
