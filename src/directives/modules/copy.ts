import { showToast } from "vant";
import type { Directive, DirectiveBinding } from "vue";

interface DirectiveType extends HTMLElement {
  copyData: string | number;
  __handleClick__: () => any;
}
/**
 * @description: copy
 * @returns {Directive} None
 */
const copy: Directive = {
  mounted(el: DirectiveType, binding: DirectiveBinding) {
    el.copyData = binding.value;
    el.__handleClick__ = async function () {
      try {
        await navigator.clipboard.writeText(this.copyData);
      } catch (error) {
        showToast("复制操作不被支持或失败");
        console.error("复制操作不被支持或失败: ", error);
      }
      showToast("复制成功");
    };
    el.addEventListener("click", el.__handleClick__);
  },
  updated(el, binding: DirectiveBinding) {
    el.copyData = binding.value;
  },
  beforeUnmount(el) {
    el.removeEventListener("click", el.__handleClick__);
  }
};

export default copy;
