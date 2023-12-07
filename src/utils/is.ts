const toString = Object.prototype.toString;
/**
 * @description: 判断值是否未某个类型
 * @returns {*} None
 * @param {unknown} val
 * @param {string} type
 */
export const is = (val: unknown, type: string): boolean => {
  return toString.call(val) === `[object ${type}]`;
};
export function isFunction<T = Function>(val: unknown): val is T {
  return is(val, "Function");
}
/**
 * @description:  是否为字符串
 */
export function isString(val: unknown): val is string {
  return is(val, "String");
}
/**
 * @description:  是否为数组
 */
export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}
