const withSourceMaps = require('@zeit/next-source-maps');

const nextConfig = withSourceMaps({
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    return config;
  },
});

module.exports = nextConfig;
