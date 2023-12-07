import { PersistedStateOptions } from "pinia-plugin-persistedstate";
/**
 * @description: pinia 持久化参数配置
 * @returns persist
 * @param {string} key
 * @param {string[]} paths
 */
const piniaPersistConfig = (key: string, paths?: string[]) => {
  const persist: PersistedStateOptions = {
    key,
    storage: localStorage,
    paths
  };
  return persist;
};

export default piniaPersistConfig;
