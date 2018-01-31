const path = require('path')
const resolve = require.resolve
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// https://webpack.js.org/configuration/
// https://webpack.js.org/guides/migrating/
// https://webpack.js.org/guides/migrating/#loaders-in-configuration-resolve-relative-to-context

const relativeFileLoader = (ext = '[ext]') => {
  return [
    {
      loader: resolve('file-loader'),
      options: {
        publicPath: '',
        useRelativePath: true,
        name: `[name].${ext}`,
        emitFile: false,
      },
    },
    {
      loader: resolve('file-loader'),
      options: {
        publicPath: '',
        context: path.resolve('src'),
        name: `[path][name].${ext}`,
      },
    },
  ]
}

module.exports = function ({entry}) {
  return {
    entry: entry,
    output: {
      path: path.resolve('lib'),
      filename: '[name].js',
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.(js|mjs)?$/,
          loader: resolve('babel-loader'),
          options: {
            presets: [require('@babel/preset-env')]
          },
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: resolve('style-loader'),
            use: [resolve('css-loader')]
          }),
        },
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: resolve('style-loader'),
            use: [resolve('css-loader'), resolve('less-loader')]
          }),
        },
        {
          test: /\.wxml$/,
          // include: resolve('src'),
          use: [
            ...relativeFileLoader('wxml'),
            {
              loader: resolve('wxml-loader'),
              // options: {
              //   root: resolve('src'),
              // },
            },
          ],
        }, {
          test: /\.(json|png|jpg|gif|wxss)$/,
          // include: resolve('src'),
          use: [
            {
              loader: resolve('file-loader'),
              options: {
                publicPath: '',
                context: path.resolve('src'),
                name: '[path][name].[ext]',
              },
            }
          ],
        }
      ]
    },
    watchOptions: {
      ignored: /node_modules/
    },
    plugins: [
      new CleanWebpackPlugin([
        path.resolve('lib'),
      ], {allowExternal: true}),
      new ExtractTextPlugin('[name].wxss'),
    ]
  }
}
