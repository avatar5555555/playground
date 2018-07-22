const withTypescript = require('@zeit/next-typescript')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

require('../env')

const { ANALYZE } = process.env

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

module.exports = {
  ...webpackPart,
  exportPathMap: function() {
    return {
      '/': { page: '/' }
    }
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  }
}
