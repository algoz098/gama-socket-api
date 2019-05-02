const bcrypt = require('bcrypt-nodejs');
// const faker = require('faker');

module.exports = {
    model: 'user',
    documents: [
        {
            name: 'artur',
            email: 'algoz098@gmail.com',
            password: bcrypt.hashSync('123456'),
            access: [
                {
                    env: 'default',
                    level: 'max'
                }
            ],
        }
    ]
};