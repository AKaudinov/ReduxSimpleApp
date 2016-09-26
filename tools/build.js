/*eslint-disable no console*/
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import colors from 'colors';

process.env.NODE_ENV = 'production'; //this assures the babel dev config(for hot reloading) doesn't apply


console.log('Generating minified bundle for production via Webpack');

webpack(webpackConfig).run((err, stats) => { //call webpack and display any errors or info it provides using the prod webpack config
    if (err) { //stop here incase of fatal error
        console.log(err.bold.red);
        return 1;
    }

    const jsonStats = stats.toJson();

    if(jsonStats.hasErrors){
        return jsonStats.errors.map(error => console.log(error.red));
    }

    if(jsonStats.hasWarnings){
        console.log('Webpack generated the following warnings: '.bold.yellow);
        jsonStats.warnings.map(warning => console.log(warning.yellow));
    }

    console.log(`Webpack stats: ${stats}`);

    //if the build got this far, it succeeded
    console.log('The app has been compiled in production mode and written to /dist.'.green);
    return 0;
});