import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { showToast } from "vant";
import { globalLoading } from "@/components/Loading/globalLoading";
import router from "@/router";
import { ResultEnum } from "@/api/helper/httpEnum";
import { checkStatus } from "./checkStatus";
import downloadFile from "./downloadFile";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  loading?: boolean;
}

/**
 * @description: 请求函数公共封装
 * @returns {AxiosInstance} instance
 * @param {AxiosRequestConfig} config
 */
const createAxiosByinterceptors = (config?: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create(config);
  instance.interceptors.request.use(
    (config: CustomAxiosRequestConfig) => {
      const { loading = true } = config;
      if (loading) globalLoading.showLoading();
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      const { code, data, message } = response.data;
      globalLoading.cancelLoading();
      // config设置responseType为blob 处理文件下载
      if (response.data instanceof Blob) {
        return downloadFile(response);
      }
      // 登陆失效
      if (code == ResultEnum.OVERDUE) {
        showToast(message);
        return Promise.reject(data);
      }
      // 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
      if (code && code !== ResultEnum.SUCCESS) {
        showToast(data.msg);
        return Promise.reject(data);
      }
      // 成功请求
      return data;
    },
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
  return instance;
};
export default createAxiosByinterceptors;
