// const bcrypt = require('bcrypt-nodejs');
// const faker = require('faker');

module.exports = {
    model: 'environment',
    documents: [
        {
            name: 'webgs',
            urls: 'webgs.com.br',
            
            colors: [
                {
                    type: "accent",
                    color: "pink"
                }
            ],

            pages: [
                {
                    route: '/',
                    componets: [
                        {
                            name: "default",
                            templateFile: "default"
                        }
                    ]
                }
            ]
        }
    ]
};