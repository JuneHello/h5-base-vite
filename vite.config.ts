import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import path from "path";
import { wrapperEnv, createProxy } from "./build/getEnv";
import { createVitePlugins } from "./build/plugins";
const resolve = (dir: string) => path.join(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const viteEnv = wrapperEnv(env);
  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    resolve: {
      extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue", ".mjs"],
      alias: {
        "@": resolve("src")
      }
    },
    server: {
      port: viteEnv.VITE_PORT,
      open: false,
      cors: true,
      proxy: createProxy(viteEnv.VITE_PROXY)
    },
    // css: {
    //   preprocessorOptions: {
    //     scss: {}
    //   }
    // },
    plugins: createVitePlugins(viteEnv, command),
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    },
    build: {
      outDir: "dist",
      minify: "esbuild",
      target: ["ios11"],
      // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
      // minify: "terser",
      // terserOptions: {
      // 	compress: {
      // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
      // 		drop_debugger: true
      // 	}
      // },
      sourcemap: false,
      // 禁用 gzip 压缩大小报告，可略微减少打包时间
      reportCompressedSize: false,
      // 规定触发警告的 chunk 大小
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  };
});
