import type { Directive, DirectiveBinding } from "vue";
/*
  需求：防止按钮在短时间内被多次点击，使用函数限制规定时间内只能点击一次。

  思路：
    1、第一次点击，立即调用方法并禁用按钮，等延迟结束再次激活按钮
    2、将需要触发的方法绑定在指令上
  
  使用：给 Dom 加上 v-reclick 及回调函数即可
  <button v-reclick="callback">提交</button>
*/
interface DirectiveType extends HTMLElement {
  delay: number;
  callback: () => any;
}

const reclick: Directive = {
  mounted(el: DirectiveType, binding: DirectiveBinding) {
    if (typeof binding.value !== "function") {
      throw "callback must be a function";
    }
    el.delay = Number(binding.arg) || 100;
    el.callback = binding.value;
    el.addEventListener("click", handleClick);
  },
  beforeUnmount(el: DirectiveType) {
    el.removeEventListener("click", handleClick);
  }
};

function handleClick(this: any) {
  let timer: NodeJS.Timeout | null = null;
  if (timer) clearTimeout(timer);
  if (!timer) this.callback();
  timer = setTimeout(() => {
    this.callback();
  }, this.delay);
}

export default reclick;
