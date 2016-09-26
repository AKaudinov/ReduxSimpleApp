import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

/*eslint-disable no console */
//express is popular and easy to configure with webpack

const port = 3000;
const app = express();  //create an instance of express
const compiler = webpack(config); //call webpack with config of webpack

app.use(require('webpack-dev-middleware')(compiler, { //pass compiled webpack configuration
    noInfo: true, //no info on the command line
    publicPath: config.output.publicPath //webpack config public path
}));

app.use(require('webpack-hot-middleware')(compiler)); //webpack hot middle ware, pass the compiled webpack config

app.get('*', function(req, res){
   res.sendFile(path.join(__dirname, '../src/index.html')); //which files to server upon a request, in here upon any request
    //return index.html
});

app.listen(port, function(err){ //start up express with port 3000, open the browser using the open package from npm.
   if(err){
       console.log(err);
   } else{
       open(`http://localhost:${port}`);
   }
});