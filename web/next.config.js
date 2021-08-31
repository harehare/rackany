module.exports = {
  webpack5: true,
  webpack(config) {
    config.resolve.modules.push(__dirname);
    return config;
  },
};
