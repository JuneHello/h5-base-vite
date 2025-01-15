import axios, { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { showToast, showNotify } from "vant";
import { globalLoading } from "@/components/Loading/globalLoading";
import router from "@/router";
import { ResultEnum } from "@/api/helper/httpEnum";
import { envApi } from "@/api/config/apiUrl";
import { checkStatus } from "./checkStatus";
import downloadFile from "./downloadFile";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  loading?: boolean;
  url?: string;
}

const baseURL = process.env.NODE_ENV === "production" ? envApi.apiBaseUrl : "/api";
const commenPrefix = "/route/rest";
const { token } = useStore("user");

const defaultConfig = {
  baseURL,
  // 设置超时时间
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true
};

/**
 * @description: 请求函数公共封装
 * @returns {AxiosInstance} service
 * @param {AxiosRequestConfig} config
 */
export const axiosInstance = <T>(
  url: string,
  type: "get" | "post" | "put" | "delete" | "patch",
  data?: any,
  headers?: Record<string, string>
): Promise<T> => {
  // api是正常接口, map是method方式的接口
  const mode = url.includes("/") ? "api" : "map";
  const requestData = {
    api: {
      url,
      data
    },
    map: {
      url: commenPrefix, // url是映射，要在传参里面赋值给method的值
      data: {
        method: url,
        app_key: null,
        session: token.value,
        partner_id: null,
        data
      }
    }
  };
  const configObj = Object.assign({}, defaultConfig, {
    method: type,
    headers: headers || {},
    ...requestData[mode]
  });
  // 创建实例
  const service = axios.create(configObj);
  // 请求拦截
  service.interceptors.request.use(
    (config: CustomAxiosRequestConfig) => {
      const { loading = true } = config;
      if (loading) globalLoading.showLoading();
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );
  // 响应拦截
  service.interceptors.response.use(
    (r: AxiosResponse) => {
      if (mode === "map") {
        const response = url + "_response";
        const { data = {} } = r;
        for (const key in data) {
          if (key === response) {
            return Promise.resolve(data[response]);
          }
          /* 代码优化开始 */
          if (key === "error_response") {
            const subCode = data[key].sub_code;
            const message = data?.error_response?.sub_msg;
            if (subCode === "check_token_failed" || subCode === "login_timout") {
              showToast(message);
              router.replace({
                path: "/login",
                query: {
                  originHref: window.location.href
                }
              });
            } else {
              showNotify({
                type: "danger",
                background: "#FFD9DA",
                color: "#F53F3F",
                message,
                duration: 3 * 1000
              });
            }
            return Promise.reject(message);
          }
          /* 代码优化结束 */
        }
      } else {
        const { code, data, msg } = r.data;
        globalLoading.cancelLoading();
        // config设置responseType为blob 处理文件下载
        if (data instanceof Blob) {
          return downloadFile(r);
        }
        // 登陆失效
        if (code == ResultEnum.OVERDUE) {
          showToast(msg);
          return Promise.reject(data);
        }
        // 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
        if (code && code !== ResultEnum.SUCCESS) {
          showToast(msg);
          return Promise.reject(data);
        }
        // 成功请求
        return data;
      }
    },
    // 错误的响应
    async (error: AxiosError) => {
      const { response } = error;
      globalLoading.cancelLoading();
      // 请求超时 && 网络错误单独判断，没有 response
      if (error.message.indexOf("timeout") !== -1) showToast("请求超时！请您稍后重试");
      if (error.message.indexOf("Network Error") !== -1) showToast("网络错误！请您稍后重试");
      // 根据服务器响应的错误状态码，做不同的处理
      if (response) checkStatus(response.status);
      // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
      if (!window.navigator.onLine) router.replace("/500");
      return Promise.reject(error);
    }
  );
  return service(configObj);
};
