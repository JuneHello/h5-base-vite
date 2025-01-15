// 登录模块
export namespace Login {
  export interface ReqLoginForm {
    username: string;
    password: string;
  }
  export interface ResLogin {
    access_token: string;
  }
  export interface ResAuthButtons {
    [key: string]: string[];
  }

  export interface agreementApi {
    protocolName: string;
    resourceId: string;
    sort: number;
    protocolVersion: string;
    id: string;
    fileUrl: string;
    platform?: any;
    productNo?: any;
    productName?: any;
  }
}
