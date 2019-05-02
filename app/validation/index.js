
const Extension = require('joi-date-extensions');
const Joi = require('joi-i18n').extend(Extension);
const fs = require('fs');
const ptBR = JSON.parse(fs.readFileSync(__dirname + "/../../locales/pt-br.js", 'utf8')).joi

Joi.addLocaleData('pt_BR', {
    any: ptBR,
    string: ptBR,
    date: ptBR,
    language: ptBR,
})

module.exports = Joi