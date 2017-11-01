const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    inject: 'body'
})

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.resolve('./client/dist'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
      rules: [
          {
            test: /.js$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                },
              },
            ],
          },
        ],
    },
    plugins: [HtmlWebpackPluginConfig]
}
