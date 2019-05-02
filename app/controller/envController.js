const Env = require("../model/environment.js");
require('dotenv-safe').load()

module.exports = {
    async get(ctx) {
        let remove = {
            _id: 0, 
            __v: 0, 
            createdAt: 0,
            updatedAt:0, 
        }

        let search = {name: ctx.params.env || process.env.DEFAULT_ENV}
        
        try {
            let env = await Env.findOne(search, remove).lean().exec();

            ctx.body = env;
        } catch (error) {
            ctx.app.emit('error', error, ctx);
        }
    },
};
