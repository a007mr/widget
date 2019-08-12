// const webpack = require('webpack');
// const path = require('path');
// // const libraryName = 'library';
// const widgetName = 'referral';
// // const outputFile = widgetName + '.js';

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const env = process.env.WEBPACK_ENV;
// const plugins = [];
// let outputFile;
// // let minimizer = [];

// if (env === 'build') {
//   // minimizer = new UglifyJsPlugin({ minimize: true });
//   // plugins.push(new UglifyJsPlugin({ minimize: true }));
//   // plugins.push(new config.optimization.minimize());
//   outputFile = widgetName + '.min.js';
// } else {
//   outputFile = widgetName + '.js';
// }

// const isDevBuild = !(env && env.prod);

// const config = {
//   entry: __dirname + '/src/index.js',
//   devtool: 'inline-source-map',
//   output: {
//     path: __dirname + '/widget',
//     filename: outputFile
//     // widget: widgetName,
//     // widgetTarget: 'umd',
//     // umdNamedDefine: true,
//     // globalObject: "typeof self !== 'undefined' ? self : this"
//   },
//   plugins: isDevBuild
//     ? [new webpack.SourceMapDevToolPlugin()]
//     : [new webpack.optimize.UglifyJsPlugin()],
//   module: {
//     rules: [
//       { test: /\.html$/i, use: 'html-loader' },
//       {
//         test: /\.css$/i,
//         use: ['style-loader', 'css-loader' + (isDevBuild ? '' : '?minimize')]
//       },
//       {
//         test: /(\\.jsx|\\.js)$/,
//         loader: 'babel',
//         exclude: /(node_modules|bower_components)/
//       },
//       {
//         test: /(\\.jsx|\\.js)$/,
//         loader: 'eslint-loader',
//         exclude: /node_modules/
//       }
//     ]
//   },
//   resolve: {
//     modules: [path.resolve('./node_modules'), path.resolve('./src')],
//     extensions: ['.json', '.js']
//   }
// };

// module.exports = config;

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
      // entry: './src/index.js',
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
          // {
          //   test: /(\.jsx|\.js)$/,
          //   loader: 'eslint-loader',
          //   exclude: /node_modules/
          // }
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
