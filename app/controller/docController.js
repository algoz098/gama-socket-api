require('dotenv-safe').load()
const fs = require('fs')

module.exports = {
    async index(ctx) {
        let response = fs.readFileSync('~/../docs/.vuepress/dist/index.html', {'encoding': 'utf8'})

        ctx.body = response
    },
};
