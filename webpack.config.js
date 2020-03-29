const webpack = require('webpack')
const appDirName = process.cwd()
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

const plugins = [
  new HtmlWebpackPlugin({
    chunks: ['entry', 'vendor'],
    templateParameters: {
      title: '@senwii/toast',
    },
    filename: `index.html`,
    template: `${appDirName}/public/index.html`,
  }),
  new MiniCssExtractPlugin({
    filename: '[name]/main.[contenthash].css',
    chunkFilename: '[name]/[id].[contenthash].css',
    ignoreOrder: true,
  }),
  new CopyWebpackPlugin([
    {
      from: 'public/*.@(png|svg|jpe?g|gif)',
      to: 'assets/',
      flatten: true,
    },
    {
      from: 'public/404.html',
      flatten: true,
    },
  ]),
]

if (IS_PRODUCTION) {
  plugins.unshift(new CleanWebpackPlugin())
}

module.exports = {
  mode: IS_PRODUCTION ? 'production' : 'development',
  devtool: 'source-map',
  entry: {
    entry: `${appDirName}/src/index.tsx`,
  },
	devServer: {
    contentBase: `${appDirName}/dist`,
    // host: '172.23.62.60',
		compress: true,
		historyApiFallback: true,
  },
  output: {
    path: `${appDirName}/dist`,
    filename: 'entry.[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    publicPath: IS_PRODUCTION ? '/toast' : '/',
  },
  resolve: {
    alias: {
      '@': appDirName + '/src/',
      '@@': appDirName,
    },
    extensions: ['.wasm', '.mjs', '.js', '.json', '.ts', '.tsx'],
  },
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules\/(react|react-dom|react-router-dom)\//,
          name: 'vendor',
          chunks: 'all',
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
            {
              loader: 'ts-loader',
            },
        ],
      },
      {
          enforce: "pre",
          test: /\.js$/,
          loader: 'source-map-loader',
      },
      {
				test: /\.(less|css)$/,
				use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]___[hash:base64:5]',
              },
            },
          },
					'postcss-loader',
					'less-loader',
				],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]',
          outputPath: 'assets/',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
		],
	},

  plugins,
}
