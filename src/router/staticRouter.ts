import { RouteRecordRaw } from "vue-router";
/**
 * staticRouter (静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home/home.vue"),
    meta: {
      title: "home"
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/components/ErrorMessage/404.vue"),
    meta: {
      title: "404"
    }
  }
];
