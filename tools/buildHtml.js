import fs from 'fs'; //from node and interacts with the file system
import cheerio from 'cheerio'; //gives a way to interact with in memory dom using jquery selectors
import colors from 'colors';

/*eslint-disable no console */

fs.readFile('src/index.html', 'utf8', (err, markup) => { //read the html file
    if (err) {
        return console.log(err);
    }

    const $ = cheerio.load(markup);//pass the read html file to cheerio, creates an in memory dom

    //since a separate spreadsheet is only utilized for the production build
    $('head').prepend('<link rel="stylesheet" href="styles.css">'); //reference the head, and add a link to the stylesheet

    fs.writeFile('dist/index.html', $.html(), 'utf8', err => {//write results to the dist folder
        if(err){
            return console.log(err);
        }
        console.log('index.html written to /dist'.green); //inform the console
    });
});