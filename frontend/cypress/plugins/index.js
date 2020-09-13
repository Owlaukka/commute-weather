const execa = require('execa');
const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const webpackConfig = require('../../webpack/webpack.test');

const findBrowser = () => {
  const browserPath = process.env.BRAVE_PATH || '/usr/bin/brave-nightly';

  return execa(browserPath, ['--version'])
    .then((result) => {
      // STDOUT will be like "Brave Browser 77.0.69.135"
      const [, version] = /Brave Browser (\d+\.\d+\.\d+\.\d+)/.exec(
        result.stdout
      );
      const majorVersion = parseInt(version.split('.')[0], 10);

      return {
        name: 'Brave',
        channel: 'nightly',
        family: 'chromium',
        displayName: 'Brave',
        version,
        path: browserPath,
        majorVersion,
      };
    })
    .catch(() => {
      return {};
    });
};
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  on(
    'file:preprocessor',
    webpackPreprocessor({ webpackOptions: webpackConfig, watchOptions: {} })
  );

  return findBrowser().then((browser) => {
    return {
      ...config,
      browsers: config.browsers.concat(browser),
    };
  });
};
