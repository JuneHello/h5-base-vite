// Read all environment variable configuration files to process.env
export function wrapperEnv(envConf) {
  const ret: any = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (/^\d+$/.test(envConf[envName])) {
      realName = Number(realName);
    }
    if (envName === "VITE_PROXY") {
      try {
        realName = JSON.parse(realName);
      } catch (error) {}
    }
    ret[envName] = realName;
  }
  return ret;
}

export function createProxy(proxyList = []) {
  const proxy = {};
  for (const [key, target] of proxyList) {
    const isHttps = /^https:\/\//.test(target);
    proxy[key] = {
      target,
      changeOrigin: true,
      ...(isHttps ? { secure: false } : {}),
      rewrite: path => path.replace(/^\/api/, "")
    };
  }
  return proxy;
}
