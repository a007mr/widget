const path = require('path');
const webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');
const bundleOutputDir = './referral';
const env = require('yargs').argv.env;

module.exports = env => {
  const isDevBuild = !(env && env.prod);

  if (env === 'build') {
    mode = 'production';
  } else {
    mode = 'development';
  }

  return [
    {
      mode: mode,
      entry: './src/components/early-referrals/Referral.js',
      output: {
        filename: 'widget.js',
        path: path.resolve(bundleOutputDir),
        library: 'Referral',
        libraryTarget: 'umd',
        umdNamedDefine: true
      },
      devServer: {
        contentBase: bundleOutputDir
      },
      // plugins: isDevBuild
      //   ? [new webpack.SourceMapDevToolPlugin()]
      //   : [new webpack.optimize.UglifyJsPlugin()],
      module: {
        rules: [
          { test: /\.html$/i, use: 'html-loader' },
          {
            test: /\.css$/i,
            use: [
              'style-loader',
              'css-loader' + (isDevBuild ? '' : '?minimize')
            ]
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader'
              }
            ]
          },
          {
            test: /\.(woff|ttf|otf|eot|woff2|svg)$/i,
            use: [
              {
                loader: 'file-loader'
              }
            ]
          },
          {
            test: /(\.jsx|\.js)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/env',
                    {
                      targets: {
                        browsers: ['ie 6', 'safari 7']
                      }
                    }
                  ]
                ]
              }
            }
          }
        ]
      },
      resolve: {
        modules: [
          path.resolve('./node_modules'),
          path.resolve('./src'),
          path.resolve('./referral')
        ],
        extensions: ['.json', '.js']
      }
    }
  ];
};
