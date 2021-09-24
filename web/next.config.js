const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
  webpack5: true,
  webpack(config) {
    config.resolve.modules.push(__dirname);
    return config;
  },
};
