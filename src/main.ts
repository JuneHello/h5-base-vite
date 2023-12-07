import { createApp } from "vue";
import "virtual:svg-icons-register";
// vue Router
import router from "@/router";
// pinia
import pinia from "@/stores";
// 按需引入组件样式 vant css
import "vant/es/toast/style";
import "vant/es/dialog/style";
import "vant/es/notify/style";
import "vant/es/image-preview/style";
import VConsole from "vconsole";
// custom directives
import directives from "./directives";
import App from "./App.vue";
// 自定义icon
import SvgIcon from "./components/SvgIcon.vue";
// 非生产环境开vconsole调试
const env = import.meta.env.VITE_USER_NODE_ENV;
if (env !== "prod") {
  new VConsole();
}

const app = createApp(App);
app.component("SvgIcon", SvgIcon);
app.use(directives).use(router).use(pinia).mount("#app");
