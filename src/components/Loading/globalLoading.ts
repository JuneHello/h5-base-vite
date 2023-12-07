import { showLoadingToast, closeToast } from "vant";

interface Loading {
  message?: string;
  forbidClick?: boolean;
  needLoadingRequestCount?: number;
}

/**
 * @description: 全局loading
 * @returns {Loading}
 */
export const createLoad = class createLoad {
  needLoadingRequestCount: number;
  message: string;
  forbidClick: boolean;
  constructor(params?: Loading) {
    const { needLoadingRequestCount = 0, message = "加载中...", forbidClick = true } = params;
    this.needLoadingRequestCount = needLoadingRequestCount;
    this.message = message;
    this.forbidClick = forbidClick;
  }
  showLoading() {
    this.needLoadingRequestCount++;
    if (this.needLoadingRequestCount === 1) {
      const toast = showLoadingToast({
        message: this.message,
        forbidClick: this.forbidClick,
        loadingType: "spinner"
      });
      return toast;
    }
  }
  cancelLoading() {
    if (this.needLoadingRequestCount <= 0) return;
    this.needLoadingRequestCount--;
    closeToast();
  }
};
export const globalLoading = new createLoad();
