require('dotenv-safe').load()
var jwt = require('jsonwebtoken');

module.exports = (io) => {
    let result = false
    
    try {
        let header = io.handshake.headers['authorization'];

        if (jwt.verify(header, process.env.SECRET)) {
            result = true
        }
    } catch (error) {
        console.log('socket middleware error:', error);
    }

    return result 
}