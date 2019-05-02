require('dotenv-safe').load()
var jwt = require('jsonwebtoken');

module.exports = (ctx, next) => {
    let result = false

    let header = ctx.headers.authorization;

    if (!header) {
        ctx.throw(401, {
            message: ctx.i18n.__('auth.error')
        })
        
        return
    }

    try {
        jwt.verify(header, process.env.SECRET)

        return next()
    } catch (error) {
        ctx.throw(400, {
            message: ctx.i18n.__('secret.error')
        })
    }
}