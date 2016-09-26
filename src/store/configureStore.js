if(process.env.NODE_ENV === 'production'){
    module.exports = require('./configureStore.prod');
}else{
    module.exports = require('./configureStore.dev');
}

//dynamic imports aren't supported by ES6, use require instead of import