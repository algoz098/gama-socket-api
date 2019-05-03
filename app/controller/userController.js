const User = require("../model/user.js");
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt-nodejs');
const validationLogin = require('../validation/login.js');
const validationLoginSocket = require('../validation/loginSocket.js');

module.exports = {
    // async list(ctx) {
    //     try {
    //         let users = await User.find({}, {password: false}).lean().exec();

    //         ctx.body = users;
    //     } catch (error) {
    //         ctx.app.emit('error', error, ctx);
    //     }
    // },
    
    async me(ctx) {
        try {
            let header = ctx.headers.authorization;

            let code = await jwt.verify(header, process.env.SECRET);
            
            code = JSON.parse(code)

            let user = await User.findById(code).lean().exec();

            ctx.body = user;
        } catch (error) {
            ctx.app.emit('error', error, ctx);
        }
    },

    async meSocket(io) {
        try {
            let header = global.parseIoCookie(io);

            let code = await jwt.verify(header, process.env.SECRET);
            
            code = JSON.parse(code)

            let user = await User.findById(code).lean().exec();

            io.emit('me', user)
        } catch (error) {
            io.emit('error', error);
        }
    },

    async login(ctx) {
        try {
            let request = ctx.request.body;

            validationLogin(request, ctx);

            let search = { email: request.email };
            let user = await User.findOne(search).lean().exec();

            if (!user){
                ctx.throw(400, {
                    message: ctx.i18n.__('user.doesnt.exists')
                })
            }
            
            if (!bcrypt.compareSync(request.password, user.password)) {
                ctx.throw(400, {
                    message: ctx.i18n.__('invalid.password')
                })
            }
            
            let token = jwt.sign(JSON.stringify(user._id), process.env.SECRET, {
                // expiresIn: 0
            });

            ctx.body = token;
        } catch (error) {
            ctx.app.emit('error', error, ctx);
        }
    },

    async loginSocket(request, io) {
        try {
            validationLoginSocket(request, io);

            let search = { email: request.email };
            let user = await User.findOne(search).lean().exec();

            if (!user){
                // ctx.throw(400, {
                //     message: ctx.i18n.__('user.doesnt.exists')
                // })
            }
            
            if (!bcrypt.compareSync(request.password, user.password)) {
                // ctx.throw(400, {
                //     message: ctx.i18n.__('invalid.password')
                // })
            }
            
            let token = jwt.sign(JSON.stringify(user._id), process.env.SECRET, {
                // expiresIn: 0
            });

            io.emit('token', token);
        } catch (error) {
            io.emit('validation.error', error,);
        }

    },

    // async register(ctx, next) {
    //     try {
    //         let request = ctx.request.body;
            
    //         validationRegister(request, ctx);

    //         if (userLib.getByEmail(request.email) == null) {
    //             if(checkPhone != null){
    //                 ctx.throw(403, {
    //                     message: ctx.i18n.__('email.already.registered')
    //                 })
    //             }
    //         }

    //         if (userLib.getByPhone(request.phone) == null) {
    //             if(checkPhone != null){
    //                 ctx.throw(403, {
    //                     message: ctx.i18n.__('phone.already.registered')
    //                 })
    //             }
    //         }

    //         user = await User.findOne({'cards.activation': request.number}).lean().exec()

    //         if (user.cards.filter(o => o.activation == request.number)[0].active) {
    //             ctx.throw(400, {
    //                 message: ctx.i18n.__('card.already.activated')
    //             })
    //         }

    //         user.email          = request.email
    //         user.phone          = request.phone
    //         user.birthdate      = request.birthdate
    //         user.cards.filter(o => o.activation == request.number)[0].active   = 1

    //         await User.updateOne({_id: user._id}, user).lean().exec()

    //         ctx.body = user;
    //     } catch (error) {
    //         ctx.app.emit('error', error, ctx);
    //     }
    // }
};
