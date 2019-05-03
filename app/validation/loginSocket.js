const Joi = require('joi');

const schema = Joi.object().keys({
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string().email({ minDomainAtoms: 2 })
});

module.exports = (data, io) => {
    return Joi.validate(data, schema, function(err) {
        if(!err) {
            return;
        }
        
        io.emit('validation.error', err.details)
    });
};
