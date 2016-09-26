import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

/*eslint-disable no console*/

const port = 3000;
const app = express ();

app.use(compression()); //enables gzip compression, file size decreases
app.use(express.static('dist')); //configure express to server static files

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, err => {
    if(err){
        console.log(err);
    }else{
        open(`http://localhost:${port}`);
    }
});