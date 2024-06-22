const path = require('path');
const { webpack } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js', // Point d'entrée de votre application
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.js', '.js'], // Extensions à prendre en charge
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Modifiez le chemin selon votre structure
    }),
    new webpack.DefinePlugin({
      __DEV__: true, // Active le mode développement
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000, // Port sur lequel le serveur de développement sera exécuté
  },
};
