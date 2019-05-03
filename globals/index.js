global.parseIoCookie = function(io, token = null){
    if(token == null) token = io.handshake.headers.cookie;
    else return token

    if(token.includes('token=') != true) return false

    token = token.replace('token=', '')

    if(token.includes(';')){
        token = token.split(';')[0]
    }

    return token
}

