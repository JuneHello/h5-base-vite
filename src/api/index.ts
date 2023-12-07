import { ResultEnum } from "@/api/helper/httpEnum";
import qs from "qs";
import createAxiosByinterceptors from "./helper/axiosInstance";
import { Http } from "./types";
import { ContentTypeEnum } from "./helper/httpEnum";

const defaultConfig = {
  // 默认地址请求地址，可在 .env.** 文件中修改
  baseURL: import.meta.env.VITE_API_URL as string,
  // 设置超时时间
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true
};
const axiosInstance = createAxiosByinterceptors(defaultConfig);

const http: Http = {
  get(url: string, params?: object, _object = {}) {
    return axiosInstance.get(url, { params, ..._object });
  },
  post(url: string, params?: object, _object = {}) {
    return axiosInstance.post(url, params, _object);
  },
  postForm(url: string, params?: object, _object = {}) {
    return axiosInstance.post(url, qs.stringify(params), {
      headers: { "Content-Type": ContentTypeEnum.FORM_URLENCODED },
      ..._object
    });
  },
  upload(url: string, params?: object, _object = {}) {
    return axiosInstance.post(url, params, { headers: { "Content-Type": ContentTypeEnum.FORM_DATA }, ..._object });
  },
  download(url: string, params?: object, _object = {}) {
    return axiosInstance.post(url, params, { ..._object, responseType: "blob" });
  },
  put(url: string, params?: object, _object = {}) {
    return axiosInstance.put(url, params, _object);
  },
  delete(url: string, params?: object, _object = {}) {
    return axiosInstance.delete(url, { params, ..._object });
  }
};
// 请求例子
// http.post(`/login`, params, { loading: false }); // 正常 post json 请求  ==>  application/json
// http.post(`/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
// http.postForm(`/login`, params); // post 请求携带表单参数  ==>  application/x-www-form-urlencoded
// http.get(`/login?${qs.stringify(params, { arrayFormat: "repeat" })}`); // get 请求可以携带数组等复杂参数

export default http;
