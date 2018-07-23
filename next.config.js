const withTypescript = require('@zeit/next-typescript')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

require('./env-vars')

const { ANALYZE, GRAPHQL_API_URL } = process.env

const webpackPart = withTypescript({
  webpack(config, options) {
    // add BundleAnalyzerPlugin
    if (ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: true
        })
      )
    }

    return config
  }
})

const publicRuntimeConfig = {
  GRAPHQL_API_URL
  // Will be available on both server and client
}

const serverRuntimeConfig = {
  // Will only be available on the server side
}

module.exports = {
  ...webpackPart,
  exportPathMap: function () {
    return {
      '/': { page: '/' }
    }
  },
  publicRuntimeConfig,
  serverRuntimeConfig
}
