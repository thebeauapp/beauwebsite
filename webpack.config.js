const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Add the polyfill for crypto
  config.resolve.fallback = {
    ...config.resolve.fallback, // inherit existing fallbacks
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    vm: false,
  };
  config.performance = {
    maxEntrypointSize: 1024000, // Set the limit for entry points (1MB)
    maxAssetSize: 1024000,      // Set the limit for assets (1MB)
    hints: false                // Disable performance hints
  };

  return config;
};
