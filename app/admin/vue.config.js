const path = require('path');

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, '.'))
      .set('@src', path.resolve(__dirname, 'src'))
      .set('@router', path.resolve(__dirname, 'src/router'))
      .set('@components', path.resolve(__dirname, 'src/components'))
      .set('@store', path.resolve(__dirname, 'src/store'))
      .set('@pages', path.resolve(__dirname, 'src/pages'))
      .set('@layouts', path.resolve(__dirname, 'src/layouts'))

  },
};
