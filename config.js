/**
 * Load app configurations
 */

const fs = require('fs');
const configPath = './config.json';
let configInfo = {};

try {
  fs.statSync(configPath);
} catch (e) {
  fs.writeFileSync(configPath, fs.readFileSync(configPath + '.sample'));
  console.log('creating config file finished');
} finally {
  configInfo = JSON.parse(fs.readFileSync(configPath));
}

function getConfigProperty(key) {
  var valueFormEnv = process.env[key];
  return valueFormEnv ? valueFormEnv : configInfo[key];
}

module.exports = {
  getListeningPort: () => {
    return getConfigProperty('NODE_PORT');
  },
  getNodeEnv: () => {
    return getConfigProperty('NODE_ENV');
  },
  isDevMode: () => {
    var env = getConfigProperty('NODE_ENV');
    return 'dev' === env || 'development' === env;
  },
  isProdMode: () => {
    var env = getConfigProperty('NODE_ENV');
    return 'prod' === env || 'production' === env;
  },
  isNodeProxyEnabled: () => {
    return !!getConfigProperty('NODE_PROXY');
  },
  getStaticAssetsEndpoint: () => {
    //AKA, get CDN domain
    return getConfigProperty('STATIC_ENDPOINT');
  },
  getApiEndPoints: () => {
    return getConfigProperty('API_ENDPOINTS');
  },
  getProxyDebugLevel: () => {
    return getConfigProperty('PROXY_DEBUG_LEVEL');
  },
  getEnv: (key) => {
    return getConfigProperty(key);
  }
};
