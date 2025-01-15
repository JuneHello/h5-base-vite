export * from "./login";

export interface Http {
  get<T>(url: string, params?: object, _object?: object): Promise<Result<T>>;
  post<T>(url: string, params?: object | string, _object?: object): Promise<Result<T>>;
  postForm<T>(url: string, params?: object, _object?: object): Promise<Result<T>>;
  upload<T>(url: string, params?: any, _object?: object): Promise<Result<T>>;
  download(url: string, params?: object, _object?: object): Promise<BlobPart>;
}

// 请求响应参数
export type Result<T = any> = T & {
  code?: number;
  msg?: string;
  data?: T;
};
