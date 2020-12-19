const withSourceMaps = require('@zeit/next-source-maps');
const Dotenv = require('dotenv-webpack');

const nextConfig = withSourceMaps({
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    config.plugins.push(new Dotenv({ silent: true }));

    return config;
  },
});

module.exports = nextConfig;
