const cookie = require('cookie')

global.parseIoCookie = function(io, token = null){
    if(token == null) token = io.handshake.headers.cookie;
    else return token

    return cookie.parse(token).token
}

