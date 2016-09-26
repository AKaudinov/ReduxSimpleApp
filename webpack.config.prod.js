import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production') //node environment variable that sets react for
                                                        // production that gets passed down to the plugin
};

export default {
    //debug info
    debug: true,
    devtool: 'source-map',
    noInfo: false,
    entry: './src/index',
    target:'web',
    output:{
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer:{
        contentBase: './dist'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(), //optimizes the order in which files are bundled
        new webpack.DefinePlugin(GLOBALS), //define variables that are made available to the libraries that webpack is bundling
        //react production mode doesn't include things such as prop type validation which increases performance
        new ExtractTextPlugin('styles.css'), //extract css into a separate file
        new webpack.optimize.DedupePlugin(), //dedupes duplicate packages
        new webpack.optimize.UglifyJsPlugin() //uglifies and minifying the javascript
    ],
    module:{
        loaders:[
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loaders: ['babel']
            },
            {
                test:/\.css$/,
                loader: ExtractTextPlugin.extract("css?sourceMap") //generate sourcemap for css
            },

            //useful for bootstrap
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            {
                test: /\.(woff|woff2)$/,
                loader: "url?prefix=font/&limit=5000"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader:"url?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader:"url?limit=10000&mimetype=image/svg+xml"
            }
        ]
    }
};