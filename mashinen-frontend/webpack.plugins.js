const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        STOCK_INTERVAL: JSON.stringify(process.env.STOCK_INTERVAL),
        STOCK_DATABASE: JSON.stringify(process.env.STOCK_DATABASE)
      }
    })
  ]
}
