import { envApiMap, urlMap } from "./constant";

type ApiEnv = keyof typeof envApiMap;
type Env<T extends ApiEnv> = {
  env: T;
  apiBaseUrl: string;
};

function createEnv(env: ApiEnv): Env<typeof env> {
  const envData = envApiMap[env];
  if (!envData) {
    throw new Error(`Environment ${env} not found in envApiMap`);
  }
  return {
    env,
    apiBaseUrl: envData.apiBaseUrl
  };
}

type urlEnv = keyof typeof urlMap;
type Env2<T extends urlEnv> = {
  env: T;
  urlOrigin: string;
  cH5: string;
};

function createUrl(env: urlEnv): Env2<typeof env> {
  const urlData = urlMap[env];
  if (!urlData) {
    throw new Error(`Environment ${env} not found in urlMap`);
  }
  return {
    env,
    urlOrigin: urlData.urlOrigin,
    cH5: urlData.cH5
  };
}

export const env: ApiEnv = (import.meta as any).env.VITE_USER_NODE_ENV;
export const envApi = createEnv(env);
export const envUrl = createUrl(env);
