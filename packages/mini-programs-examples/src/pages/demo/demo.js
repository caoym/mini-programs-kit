require('./demo.less')
require('./demo.wxml')
// require('./demo.wxml')

Page({
  data: {
    text: 'This is page data.'
  },
  onLoad: function (options) {
    console.log(options)
  },
})
