require('dotenv-safe').load()
var jwt = require('jsonwebtoken');

module.exports = (ctx, next) => {
    let header = ctx.request.header.auth

    if (!header) {
        ctx.throw(401, {
            message: ctx.i18n.__('auth.error')
        })
        return
    }

    try {
        jwt.verify(header, process.env.SECRET)
        
        return next()
    } catch (e) {
        ctx.throw(400, {
            message: ctx.i18n.__('secret.error')
        })
    }
}