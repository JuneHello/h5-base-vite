import { defineStore } from "pinia";

interface UserInfo {
  token?: string;
  user_id?: string;
  phone?: string;
  touxiangImg?: string;
  name?: string;
  openid?: string;
}
interface State {
  userInfo: UserInfo;
}

export default defineStore("user", {
  persist: true,
  state: (): State => {
    return {
      userInfo: {
        token: "",
        user_id: "",
        phone: "",
        touxiangImg: "",
        name: "",
        openid: ""
      }
    };
  },
  getters: {
    logged: state => {
      const { token, user_id } = state.userInfo;
      return !!(token && user_id);
    },
    token: state => {
      return state.userInfo.token;
    },
    phone: state => {
      return state.userInfo.phone;
    },
    userId: state => {
      return state.userInfo.user_id;
    },
    touxiangImg: state => {
      return state.userInfo.touxiangImg;
    },
    name: state => {
      return state.userInfo.name;
    },
    openid: state => {
      return state.userInfo.openid;
    }
  },
  actions: {
    setUserInfo(userInfo: UserInfo) {
      Object.assign(this.userInfo, userInfo);
    },
    resetUserInfo() {
      Object.assign(this.userInfo, {
        token: "",
        user_id: "",
        phone: "",
        touxiangImg: "",
        name: "",
        openid: ""
      });
    }
  }
});
