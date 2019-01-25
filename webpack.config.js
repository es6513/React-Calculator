const HtmlWebPackPlugin = require("html-webpack-plugin");
const createLodashAliases = require("lodash-loader").createLodashAliases;
module.exports = {
	output: {
		path: __dirname,
		filename: "index.js"
	},
	module: {
		rules: [
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
	devServer: {contentBase: "./dist"},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		})
	]
};
