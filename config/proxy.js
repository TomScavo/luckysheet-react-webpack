const util = require('./util');
const mock = require('./mock');
const originProxy = require('http-proxy-middleware');

const appConfig = util.getAppConfig();

/**
 *  判断 arr1 是否包含 arr2
 * @param arr1
 * @param arr2
 * @returns {boolean}
 */
const isContained = (arr1, arr2) => {
  if (!(arr1 instanceof Array) || !(arr2 instanceof Array) || ((arr1.length < arr2.length))) {
    return false;
  }
  
  const arr1Str = arr1.toString();
  
  for(let i = 0; i < arr2.length; i++) {
    if (arr1Str.indexOf(arr2[i]) < 0) return false;
  }
  
  return true;
  
};

/**
 * 如果启用mock，mock 的代理优先级比 setupProxy 中的设置高
 * @param context
 * @param opts
 * @returns
 */
const proxy = (context, opts) => {
  let contextArr = Array.isArray(context) ? context : [context.toString()];
  if (mock.isUseMock() && isContained(appConfig.Mock_Context, contextArr)) {
    return (req, res, next) => {
      next();
    };
  } else {
    return originProxy(context, opts);
  }
};

module.exports = proxy;
