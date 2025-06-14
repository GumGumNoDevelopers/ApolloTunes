const path = require('path');

module.exports = {
  entry: './src/client/index.tsx',
  output: {
    path: path.resolve(__dirname, 'public/client'),
    filename: 'index.js',
    publicPath: '/client/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
       {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: 'source-map',
  mode: 'development',
};