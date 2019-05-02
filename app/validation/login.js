const Joi = require('joi');

const schema = Joi.object().keys({
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string().email({ minDomainAtoms: 2 })
});

module.exports = (data, ctx) => {
    return Joi.validate(data, schema, function(err) {
        if(!err) {
            return;
        }
        
        ctx.status = 403;
        ctx.body = err.details;
    });
};
