var path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
    entry: path.resolve(__dirname,'index.js'),
    output: {
    path: path.resolve(__dirname, 'output'),
    filename: 'main.js',
    },
    mode: 'production',
    plugins: [new MiniCssExtractPlugin()],
    module: {
        rules: [
          { 
           test: /\.s[ac]ss$/i,
           use: [MiniCssExtractPlugin.loader, 
            'css-loader',
            'sass-loader'
          ] 
         }
        ]
      },
      optimization: {
        minimizer: [
          // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
          `...`,
          new CssMinimizerPlugin(),
        ],
      },
}