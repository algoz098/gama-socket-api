const Joi = require('./index.js')


const schema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    name: Joi.string().required(),
    birthdate: Joi.string().length(10),
    phone: Joi.string().length(15).required(),
}).options({
    stripUnknown: true
});

module.exports = (data, ctx) => {
    return Joi.validate(data, schema, { abortEarly: false, locale: 'pt_BR' }, function(err) {
        if(!err) {
            return;
        }

        var message = []
        message.push(ctx.i18n.__('validation.failed'))

        var index = err.details.findIndex(x => x.path[0] === 'featuredImage')
        if (index >= 0) {
            err.details.splice(index, 1)
            message.push(ctx.i18n.__('featured.image.not.defined'))
        }
        
        index = err.details.findIndex(x => x.path[0] === 'coverImage')
        if (index >= 0) {
            err.details.splice(index, 1)
            message.push(ctx.i18n.__('cover.image.not.defined'))
        }


        ctx.throw(403, {
            message: message,
            errors: err
        })
    });
};
