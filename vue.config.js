const path = require('path');
const resolve = dir => path.join(__dirname, dir)
//配置打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
//是否需要生产分析报告
const analyzer = false;
// vue.config.js
module.exports = {
    //部署路径
    publicPath:"./",
    //不需要生产环境的 source map
    productionSourceMap:false,
    //生成的静态资源存放路径
    assetsDir:"static",
    //是否需要生产分析报告
    //调整 webpack 配置
    configureWebpack: {
        
    },
    devServer: {
        proxy: {
            //配置跨域
            '/api': {
                  target: 'https://test.xxx.com', // 接口的域名
                  // ws: true, // 是否启用websockets
                  changOrigin: true, // 开启代理，在本地创建一个虚拟服务端
                  pathRewrite: {
                      '^/api': '/'
                  }
            }
        }
    },
    //vue-cli自动化导入：全局通用css
    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'less',
        patterns: [
            path.resolve(__dirname, './src/style/common.less'),
        ]
      }
    },
    chainWebpack: config => {
        // 添加别名
        config.resolve.alias
        .set('@', resolve('src'));
         // 打包分析
        if( IS_PROD && analyzer ) {
            config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
              {
                analyzerMode: 'static'
              }
            ])
        }
    }
}
