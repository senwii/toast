const appDirName = process.cwd()
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
  mode: IS_PRODUCTION ? 'production' : 'development',
  entry: './src/Toast/index.tsx',
  output: {
    path: `${appDirName}/lib`,
    filename: 'index.js',
    library: 'toast',
    libraryTarget: 'umd',
  },
  resolve: {
    alias: {
      '@': appDirName + '/src/',
      '@@': appDirName,
      'react': `${appDirName}/node_modules/react`,
      'react-dom': `${appDirName}/node_modules/react-dom`,
    },
    extensions: ['.wasm', '.mjs', '.js', '.json', '.ts', '.tsx'],
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
				test: /\.(less|css)$/,
				use: [
          'style-loader',
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
	externals: {
		react: {
      root: 'React',
      amd: 'react',
      commonjs2: 'react',
      commonjs: 'react',
    },
		'react-dom': {
      root: 'ReactDOM',
      amd: 'react-dom',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
    }
	},
  plugins: [
    new CleanWebpackPlugin(),
  ],
}
