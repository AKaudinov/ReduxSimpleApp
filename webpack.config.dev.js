import webpack from 'webpack';
import path from 'path';

export default {
    //debug info
    debug: true,
    devtool: 'source-map', //creates source map.
    noInfo: false, //noInfo is false - webpack will display all files that it bundles.
    entry: [ //entry points for the application
        'eventsource-polyfill', //this is necessary for hot reloading with IE/internet explorer
        'webpack-hot-middleware/client', //reloads the page if hot module reloading fails
        './src/index' //app entry point should be last - index.js - no file extension is needed here since its implied
    ],
    target:'web', //webpack understands that it needs to bundle the code that browsers will understand
    output:{
        path: __dirname + '/dist', //Physical files are only output by production build task 'npm run build'
        publicPath: '/',            //with development config, it wont create any physical files, but serve them from memory.
        filename: 'bundle.js'
    },
    devServer:{
        contentBase: './src'  //where the code is, main index.html will serve this request
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //you can replace modules without browser refresh
        new webpack.NoErrorsPlugin() //error message in the browser
    ],
    module:{   //This section tells webpack what file types it should handle
        loaders:[
            { test: /\.js$/,   //handle javascript
              include: path.join(__dirname, 'src'),
              loaders: ['babel']
            }, //use bable to transpile the javascript
            {
                test:/\.css$/, //handle css
             loaders: ['style', 'css']
            }, //transpile using css, and then style loaders.

            //{
            //  test:/\.less$/,
            //    loaders:['style', 'css', 'less-loader']
            //},

            //useful for bootstrap
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
             loader: "file"},

            {test: /\.(woff|woff2)$/,
             loader: "url?prefix=font/&limit=5000"},

            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
             loader:"url?limit=10000&mimetype=application/octet-stream"},

            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
             loader:"url?limit=10000&mimetype=image/svg+xml"}
        ]
    }
};