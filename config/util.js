const path = require('path');
const fs = require('fs-extra');
const yaml = require('js-yaml');

const appConfigPath = path.join(__dirname, './config.yaml');

const appConfig = yaml.safeLoad(fs.readFileSync(appConfigPath));

module.exports = {
  getAppConfig: () => {
    return appConfig
  }
}
