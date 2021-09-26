import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': {
      VUE_APP_API_BASE : '/carservice'
    }
  },
  publicPath: './',
  server: { 
    port: 3000,
    open: true,
    proxy: {
      '/carservice': {
        target: 'https://t.rsscc.com',
        changeOrigin: true,  // 是否跨域
        ws: true,
        // pathRewrite: {
        //   '^/nocarservice' : '/carservice'  // 重写路径
        // }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }

  }
})


// const path = require('path');
// function resolve (dir) {
//     return path.join(__dirname, dir)
// }
// module.exports = {
//     lintOnSave: true,
//     chainWebpack: (config)=>{
//         config.resolve.alias
//             .set('@',resolve('src'))
//             // .set('@file',resolve('src/file'))
//     }
// }


// const publicPath = {
//   production: '/carservice/',
//   development: '/'
// };

// const UglifyJS = require('uglify-es');  // js压缩
// const CopyWebpackPlugin = require('copy-webpack-plugin');   // 文件复制
// const TerserPlugin = require('terser-webpack-plugin');

// module.exports = {
//   lintOnSave: true,
//   assetsDir: 'assets',
//   publicPath: publicPath[process.env.NODE_ENV],
//   productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
//   devServer: {
//     proxy: {
//       '/carservice': {
//         target: 'https://t.rsscc.com',
//         changeOrigin: true,  // 是否跨域
//         ws: true,
//         // pathRewrite: {
//         //   '^/nocarservice' : '/carservice'  // 重写路径
//         // }
//       }
//     }
//   },
//   pages: {
//     index: {
//       entry: 'src/main.js',
//       title: process.env.VUE_APP_TITLE,
//       // 模板来源
//       template: `public/index.html`,
//     },
//     login: {
//       entry: 'src/pages/login/build/main.js',
//       title: '用户登录',
//       // 模板来源
//       template: `public/login.html`,
//     },
//   },
//   configureWebpack: config => {
//     Object.assign(config,{
//       externals: {
//         'AMap': 'AMap',
//       }
//     })
//     config.plugins.push(
//       new CopyWebpackPlugin([{
//         from: 'src/js',
//         to:   process.env.VUE_APP_JS_LIB,
//         transform: content => UglifyJS.minify(content.toString()).code
//       }])
//     );
//     if (process.env.NODE_ENV === 'production') {
//       // 为生产环境修改配置
//       config.plugins.push(
//           new TerserPlugin({
//             cache: true,
//             parallel: true,
//             sourceMap: false,
//             terserOptions: {
//               compress: {
//                 drop_console: true,
//                 drop_debugger: true
//               }
//             }
//           })
//       );
//     }
//   },
//   chainWebpack: config => {
//     config.module
//     .rule('images')
//     .use('image-webpack-loader')
//     .loader('image-webpack-loader');
//   }

// };