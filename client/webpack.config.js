const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'Development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'JATE',
        template: './src/index.html'
      }),
      new WebpackPwaManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      }),
      new InjectManifest({
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E.',
        description: 'PWA text editor',
        fingerprints: false,
        inject: true,
        ios: true,
        orientation: 'portrait',
        display: 'standalone',
        start_url: '.',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        }
      ],
    },
  };
};
