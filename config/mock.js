const util = require('./util');
const chalk = require('react-dev-utils/chalk');

const Default_Mock_Context = ['/api'];

const appConfig = util.getAppConfig();

/**
 * 是否启用 mock
 * @returns {boolean}
 */
const isUseMock = () => process.env.DEBUG_ENV === 'mock';

/**
 *  get mock host and mock base path
 */
const getMockConfig = () => {
  let context = appConfig.Mock_Context ? appConfig.Mock_Context : Default_Mock_Context;
  let basePath = appConfig.Mock_Base_Path;
  if (!basePath) {
    throw new Error(chalk.red.bold('必须指定 mock 接口的 basePath，请在 mock 平台上查询'));
  }

  return [
    {
      context: context,
      target: `http://localhost:${appConfig.Mock_Server_Port}`,
      pathRewrite: {
        '/template': '',
      },
    },
  ];
};

module.exports = {
  isUseMock,
  getMockConfig,
};
