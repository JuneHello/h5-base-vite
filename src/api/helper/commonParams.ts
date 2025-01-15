const { token } = useStore("user");

const commonParams = {
  isLoading: true,
  timestamp: new Date().getTime(),
  v: "0.0.1",
  session: token.value
};

export function getCommonParams() {
  return Object.assign({}, commonParams);
}

export function setCommonParams(params: Object) {
  Object.assign(commonParams, params);
}
