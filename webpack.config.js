const HtmlWebPackPlugin = require("html-webpack-plugin");
const createLodashAliases = require("lodash-loader").createLodashAliases;
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
	entry: "./src/index.js",
	output: {
		path: __dirname + "./dist",
		filename: "main.js"
	},
	module: {
	
		rules: [
			{
				enforce: "pre",
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "eslint-loader",
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {loader: "babel-loader"}
			},
			{
				test: /\.js$/,
				loader: "babel-loader!lodash-loader"
			},
			{
				test: /\.html$/,
				use: [
					{loader: "html-loader"}
				]
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			},
			{
				test: /\.(scss|sass)$/,
				use:[
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "images/"
						}  
					}
				]
			}
		]
	},
	resolve: {alias: createLodashAliases()},
	devServer: {
		historyApiFallback: true,
		contentBase: "./dist",
		port:8080
	},
	plugins: [
		new CopyWebpackPlugin([
			{ from: "./src/index.html" }
		]),
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		})
	]
};
