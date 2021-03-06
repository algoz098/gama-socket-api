const Joi = require('joi');

const schema = Joi.object().keys({
    password: Joi.string().required().regex(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string().email({ minDomainAtoms: 2 })
});

module.exports = (data, io) => {
    return Joi.validate(data, schema, function(err) {
        if(err) {
            io.emit('validation.error', err.details);
            throw 'validation.error'
        }
    });
};
