const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const publicPath='/';//定义一个根路径，使出口文件中所有引用文件的路径都是以根路径开始

module.exports = {
	// 配置入口文件，打包目标文件
	entry: {
		src:'./src/index.js'
	},
	// 指定文件是用来开发（production），还是用来上线的（development）
	mode:'development',
	// 出口文件，打包完成后会生成一个最终文件（bundle.js），名字自己指定
	output: {
		filename: '[name].bundle.js',
		publicPath:publicPath,
		path: path.resolve(__dirname, 'dist')
	},
	//配置别名
    resolve:{
        alias:{
            pages:path.resolve(__dirname,'./src/pages'),
            util:path.resolve(__dirname,'./src/util'),
            api:path.resolve(__dirname,'./src/api')
        }
    },
	module: {
		rules: [
			{
			//配置加载css文件
			test: /\.css$/,
				use: [
				  'style-loader',
				  'css-loader'
				]
			},
			//配置加载图片
			{
			test: /\.(png|svg|jpg|gif)$/,
				use: [
			  	'url-loader'
			 	]
			},
			// 处理react
			{
                test:/\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env','es2015','react','stage-3'],
                        //按需加载
                        plugins: [
						    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }] 
						]
                    }
                    
                }               
            }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'My App',
			template:'./index.html',
			filename: 'index.html'
		}),
		// 清除多余文件
		new CleanWebpackPlugin(['dist'])
	],
	devServer:{ 
		contentBase: './dist',
		historyApiFallback:true
	}
};