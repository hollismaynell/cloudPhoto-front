const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackChunkHash = require('webpack-chunk-hash')
module.exports = (webpackConfig, env) => {
  webpackConfig.module.loaders[0].exclude.push(/\.ejs$/)    // 注 1
  if (env === 'production') {
    // FilenameHash
    webpackConfig.output.chunkFilename = '[name].[hash].js' // http://webpack.github.io/docs/configuration.html#output-chunkfilename
    // webpackConfig.output.chunkFilename = '[chunkhash].async.js'
    webpackConfig.plugins[3] = new ExtractTextPlugin('[name].[hash].css')    // 注 2
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin({
        template: 'ejs!src/index.ejs',    // 注 3
        inject: true,
        minify: { collapseWhitespace: true },
        production: true,
        hash: true,
        filename: 'index.html'
      }),
      new WebpackChunkHash({ algorithm: 'md5' })
    )
  } else {
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin({
        template: 'ejs!src/index.ejs',
        inject: true,
      }),
    )
  }
  // ClassnameHash
  const cssLoaderOption = {
    importLoaders: 1,
    modules: true,
    localIdentName: '[hash:base64:5]',
  }
  const cssLoaders = webpackConfig.module.loaders[3].loader.split('!')
  webpackConfig.module.loaders[3].loader = cssLoaders.map(item => {
    if (item.startsWith('css')) {
      return `css?${JSON.stringify(cssLoaderOption)}`
    }
    return item
  }).join('!')

  // PreLoaders
  webpackConfig.module.preLoaders = [{
    test: /\.js$/,
    enforce: 'pre',
    loader: 'eslint',
  }]
  webpackConfig.devServer = {
    proxy: {
      '/api/v1/*': {
        target: 'http://dws.XXXXX.com',
        secure: false,
      },
    },
  }
  webpackConfig.resolve.alias = {
    components: `${__dirname}/src/components`,
    utils: `${__dirname}/src/utils`,
    config: `${__dirname}/src/utils/config`,
  }
  return webpackConfig
}
