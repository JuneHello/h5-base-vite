export * from "./login";

export interface Http {
  get<T>(url: string, params?: object, _object?: object): Promise<ResultData<T>>;
  post<T>(url: string, params?: object | string, _object?: object): Promise<ResultData<T>>;
  postForm<T>(url: string, params?: object, _object?: object): Promise<ResultData<T>>;
  put<T>(url: string, params?: object, _object?: object): Promise<ResultData<T>>;
  delete<T>(url: string, params?: any, _object?: object): Promise<ResultData<T>>;
  upload<T>(url: string, params?: any, _object?: object): Promise<ResultData<T>>;
  download(url: string, params?: object, _object?: object): Promise<BlobPart>;
}

// 请求响应参数（不包含data）
export interface Result {
  code?: string;
  message?: string;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
  data: T;
}
