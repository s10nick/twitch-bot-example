const path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, '../public'),
  filenameHashing: false,
  productionSourceMap: false,
  css: {
    modules: true
  },
  lintOnSave: true
}
