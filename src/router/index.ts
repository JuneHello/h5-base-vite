import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { staticRouter } from "./staticRouter";
import NProgress from "../nprogress";

const mode = import.meta.env.VITE_ROUTER_MODE;

const routerMode = {
  history: createWebHistory,
  hash: createWebHashHistory
};

const router = createRouter({
  history: routerMode[mode](),
  routes: staticRouter,
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 })
});
/**
 * @description: 路由拦截 beforeEach
 */
router.beforeEach(async (to, from, next) => {
  // NProgress 开始
  NProgress.start();
  // 正常访问页面
  next();
});

/**
 * @description 路由跳转错误
 * */
router.onError(error => {
  NProgress.done();
  console.warn("路由错误", error.message);
});

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  NProgress.done();
});

export default router;
