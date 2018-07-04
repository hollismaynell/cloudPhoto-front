const path = require('path')

const svgSpriteDirs = [
  path.resolve(__dirname, 'src/svg/'),
  require.resolve('antd').replace(/index\.js$/, ''),
]

export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  "theme": "./theme.config.js",
  /*"proxy": {
    "/api/v1": {
      "target": "http://10.10.10.86:8080/amp-web/",
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1" : "" }
    },
    "/api/v2": {
      "target": "http://localhost:8007/",
      "changeOrigin": true,
      "pathRewrite": { "^/api/v2" : "" }
    },
    "/api/v2": {
      "target": "http://localhost:8007/",
      "changeOrigin": true,
      "pathRewrite": { "^/api/v2" : "" }z
    },
    },*/
  publicPath: `/poros/`,
  outputPath: `./dist/`,
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": true, }]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": true}]
      ]
    },
  }
}
