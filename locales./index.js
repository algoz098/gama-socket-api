const i18n = require('koa-i18n')

let locales = function(app){
    app.use(i18n(app, {
        directory: __dirname + './',
        locales: ['pt-br'],       //  `pt-br` defualtLocale
        query: true      
    }))
}

module.exports =  locales


  