import { getCommonParams } from "@/api/helper/commonParams";
import qs from "qs";
import { axiosInstance } from "./helper/axiosInstance";
import { Http } from "./types";
import { ContentTypeEnum } from "./helper/httpEnum";

const http: Http = {
  get(url: string, params?: object, _object = {}) {
    return axiosInstance(url, "get", { ...params, ..._object, ...getCommonParams() });
  },
  post(url: string, params?: object, _object = {}) {
    return axiosInstance(url, "post", { ...params, ..._object, ...getCommonParams() });
  },
  postForm(url: string, params?: object, _object = {}) {
    return axiosInstance(url, "post", qs.stringify({ ...params, ...getCommonParams(), ..._object }), {
      "Content-Type": ContentTypeEnum.FORM_URLENCODED
    });
  },
  upload(url: string, params?: object, _object = {}) {
    return axiosInstance(
      url,
      "post",
      { ...params, ..._object, ...getCommonParams() },
      { "Content-Type": ContentTypeEnum.FORM_DATA }
    );
  },
  download(url: string, params?: object, _object = {}) {
    return axiosInstance(url, "post", { params, ..._object, ...getCommonParams(), responseType: "blob" });
  }
};
// 请求例子
// http.post(`/login`, params, { loading: false }); // 正常 post json 请求  ==>  application/json
// http.post(`/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
// http.postForm(`/login`, params); // post 请求携带表单参数  ==>  application/x-www-form-urlencoded
// http.get(`/login?${qs.stringify(params, { arrayFormat: "repeat" })}`); // get 请求可以携带数组等复杂参数

export default http;
