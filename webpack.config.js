const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js', // Where does the app start?
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};