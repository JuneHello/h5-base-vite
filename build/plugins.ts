import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import eslintPlugin from "vite-plugin-eslint";
import AutoImport from "unplugin-auto-import/vite";
import ViteImages from "vite-plugin-vue-images";
import { createHtmlPlugin } from "vite-plugin-html";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "@vant/auto-import-resolver";
import legacy from "@vitejs/plugin-legacy";

export function createVitePlugins(viteEnv, command) {
  const {} = viteEnv;
  const isBuild = command === "build";
  return [
    isBuild &&
      legacy({
        targets: ["defaults", "chrome 40"]
      }),
    vue(),
    eslintPlugin(),
    AutoImport({
      imports: ["vue"]
    }),
    Components({
      resolvers: [VantResolver()]
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
              title: "vite"
            }
          }
        }
      ]
    })
  ];
}
