/*
 * @Author: zengmeiting
 * @Date: 2021-01-30 15:52:41
 * @Description: 
 * @FilePath: \webpack-4\webpack.config.js
 */

 // 获取路劲
let path = require('path');

// 引入模板插件
let htmlPlugin = require('html-webpack-plugin');

// 抽离css文件
let minCssExtractPlugin = require('mini-css-extract-plugin');

// 处理css兼容性 高阶函数
let postCss = require('autoprefixer')({
    "overrideBrowserslist":[
        'last 10 Chrome versions',
        'last 5 Firefox versions',
        'Safari >= 6',
        'ie >= 8'
    ]
});

// css压缩
let optimizeCss = require('optimize-css-assets-webpack-plugin');

// js压缩
let uglifyjsPlugin = require('uglifyjs-webpack-plugin');



module.exports = {
    mode:'production', // 模式 development/production
    
    //一个入口文件对应一个模板页面
    // ---单入口配置---
    // entry:'./src/index.js', // 入口文件
    // output:{
    //     filename:'builde.js', // 打包后的文件名
    //     path:path.resolve('dist') //打包所在目录，绝对路劲
    // },

    //多入口
    entry:{
        //key名称自定义命名
        index:'./src/index.js',
        admin:'./src/admin.js'
    },
    output:{
        filename:'static/js/[name].js', // name自动获取entry中的key名称
        path:path.resolve('dist'), //打包所在目录，绝对路劲
        publicPath:'/' // build之后的公共路劲
    },

    devServer:{//开启服务器配置
        port:8080, // 端口
        host:"localhost", //ip地址：localhost本地，0.0.0.0可以访问网络地址
        progress:true, //开启进度条
        contentBase:'./dist/', //默认打开目录
        open:true, //自动打开浏览器
        compress:true, //启动gzp压缩
        //解决跨域，通过代理解决
        proxy:{
            "./api/":{
                target:'http://abc.com/api', //代理的域名
                changeOring:true, //是否跨域
                pathRewrite:{
                    '^/api':'' //需要rewrite的
                }
            }
        }
    },
    plugins:[
        new htmlPlugin({
            template:'./public/index.html',
            filename:'index.html',
            minify:{
                // 折叠换行true不换行
                collapseWhitespace:true
            },
            hash:true, //生产环境下生成hash数
            chunks:['index'], //只引用index.js解决index.html里面有index.js和admin.js的问题
            //生产模式下就只压缩index.html的模板
        }),
        new htmlPlugin({
            template:'./public/admin.html',
            filename:'admin.html',
            minify:{
                // 折叠换行true不换行
                collapseWhitespace:true
            },
            hash:true, //生产环境下生成hash数
            chunks:['admin'], //只引用index.js解决index.html里面有index.js和admin.js的问题
            //生产模式下就只压缩index.html的模板
        }),
        new minCssExtractPlugin({
            filename:'static/css/main.css'
        })
    ],
    module:{
        rules:[ //非js规则配置
            {
                test:/\.css$/, //找.css这个文件
                use:[
                    minCssExtractPlugin.loader, //将css文件都放到static/css/main.css中
                    //配置采用对象写法
                    {
                        //css抽离
                        loader:'css-loader'
                    },
                    {
                        //处理css兼容性
                        loader:'postcss-loader',
                        options:{
                            plugins:[
                                postCss
                            ]
                        }
                    }
                ]
            }
        ]
    },
   optimization:{ // 优化项启动后mode模式代码压缩,不在生效，必须配置js压缩插件
        minimizer:[
            new optimizeCss() //css优化
        ]
    } 
}