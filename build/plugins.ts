import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import eslintPlugin from "vite-plugin-eslint";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import AutoImport from "unplugin-auto-import/vite";
import ViteImages from "vite-plugin-vue-images";
import { createHtmlPlugin } from "vite-plugin-html";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

export function createVitePlugins(viteEnv) {
  const {} = viteEnv;
  return [
    vue(),
    eslintPlugin(),
    VueSetupExtend(),
    AutoImport({
      imports: ["vue"]
    }),
    ViteImages({
      dirs: ["src/assets/images"] // 指明图片存放目录
    }),
    // 使用 svg 图标
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]"
    }),
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          entry: "src/main.ts",
          filename: "index.html",
          template: "index.html",
          injectOptions: {
            data: {
              title: "index"
            }
          }
        }
      ]
    })
  ];
}
