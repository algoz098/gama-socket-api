require('dotenv-safe').load()
var jwt = require('jsonwebtoken');

module.exports = (io, token = null) => {
    let result = false

    try {
        token = global.parseIoCookie(io, token)

        if (jwt.verify(token, process.env.SECRET)) {
            result = true
        }
    } catch (error) {
        console.log('socket middleware error:', error);
    }

    return result 
}