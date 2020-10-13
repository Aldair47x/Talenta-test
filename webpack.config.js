const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const htmlPlugin = new HtmlWebPackPlugin({
    template: "./app/index.html",
    filename: "./index.html"
});
module.exports = {
    entry: "./app/index.js",
    output: { 
        path: path.join(__dirname, 'dist'),
        filename: "[name].js"
    }, 
    resolve:{
        extensions:['.js','.jsx']
    },
    plugins: [htmlPlugin],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                }
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: "file-loader",
                options: { name: '/static/[name].[ext]' }
            },
            
        ]
    }
};