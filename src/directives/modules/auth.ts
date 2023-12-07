import type { Directive, DirectiveBinding } from "vue";
const auth: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    console.log("🚀 ~ file: auth.ts:4 ~ mounted ~ el:", el, binding);
  }
};
export default auth;
