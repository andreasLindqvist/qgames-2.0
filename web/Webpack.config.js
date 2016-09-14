module.exports = {
    entry: './src/common.js',
    output: {
        filename: './public/js/common.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
          {
              test: [/\.js$/, /\.jsx$/],
              exclude: /node_modules/,
              loader: 'babel',
              query: {
                  presets: ['es2015', 'stage-0', 'react']
              }
          },
          {
              test: /\.json$/,
              exclude: /node_modules/,
              loader: 'json'
          }
        ]
    }
}