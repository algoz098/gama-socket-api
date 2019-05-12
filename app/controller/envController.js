const Env = require("../model/environment.js");
require('dotenv-safe').load()

const validationEnvSaveSocket = require('../validation/validationEnvSaveSocket.js')

const remove = {
    _id: 0, 
    __v: 0, 
    createdAt: 0,
    updatedAt:0, 
}

module.exports = {
    async save(data, io){
        try {
            let search = {'name': data.name}
            validationEnvSaveSocket(data, io)

            let update = {$set: { ...data } }

            await Env.updateOne(search, update).lean().exec();

            let result = await Env.findOne(search, remove).lean().exec();

            io.broadcast.emit('environmentSet', result)
             io.emit('environmentSet', result)
             io.emit('notify_success', 'environments.success')
        } catch (error) {
            console.log("error", error)
             io.emit('notify_error', 'environments.component.update.error')
        }
    },

    async get(ctx) {
        let search = {name: ctx.params.env || process.env.DEFAULT_ENV}
        
        try {
            let env = await Env.findOne(search, remove).lean().exec();

            ctx.body = env;
        } catch (error) {
            ctx.app.emit('error', error, ctx);
        }
    },
};
