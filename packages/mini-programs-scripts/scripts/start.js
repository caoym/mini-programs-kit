const webpack = require('webpack')

const {getEntries} = require('./unities/entries')
const config = require('../config/webpack.config.dev')
const {assetsPath, componentPath, entriesPaths, pagePath, srcRoot} = require('../scripts/config.js')

// console.log(getEntries(srcRoot, entriesPaths))

const compiler = webpack(config({
  entry : getEntries(srcRoot, entriesPaths),
}))

compiler.watch({}, (err, stats) => {

  console.log(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }))

})
