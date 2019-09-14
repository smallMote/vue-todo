const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')  //非js文件 单独打包
const { VueLoaderPlugin } = require('vue-loader') //webpack4.x必要配置 
const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  stats: {
    children: false
  },
  entry: path.join(__dirname, 'src/main.js'),
  output: {
    filename: 'bundle.[hash: 8].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name]-vue.[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({  //webpack配置中添加判断运行环境
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin()
  ],
}

//判断运行环境
if (isDev) {
  config.module.rules.push(
    {
      test: /\.styl(us)?$/,
      use: [
        'style-loader', 
        'css-loader', 
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader']
    }
  ),
  //ES6代码映射（在浏览器中也能直接定位到我们写到ES6代码）
  config.devtool = '#cheap-module-eval-source-map', 
  config.devServer = {
    port: 10086,
    host: '0.0.0.0',
    overlay: {  //错误显示
      errors: true
    },
    hot: true,  //热更新<组件更新>
    open: false
  },
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  // config.module.entry = { //第三方包单独打包
  //   app: path.join(__dirname, 'src/main.js'),
  //   vendor: ['vue']
  // };
  config.output.filename = '[name].[chunkhash:8].js';
  config.module.rules.push(
    {
      test: /\.styl(us)?$/,
      use: ExtractPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader', 
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      })
    }
  );
  config.plugins.push(
    new ExtractPlugin({
      filename: 'styles.[md5:contenthash:hex:8].css'  //webpack4.x后使用md5
    })
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor'
    // })
  )
}

module.exports = config