import { createApp } from "vue";
import "virtual:svg-icons-register";
import App from "./App.vue";
import SvgIcon from "./components/SvgIcon.vue";

const app = createApp(App);
app.component("SvgIcon", SvgIcon).mount("#app");
