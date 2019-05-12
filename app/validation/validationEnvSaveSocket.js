const Joi = require('joi');

const schema = Joi.object().keys({
    name: Joi.string().required(),
}).unknown(true);

module.exports = (data, io) => {
    return Joi.validate(data, schema, function(err) {
        if(err) {
            console.log(err)
            io.emit('validation.error', err.details);
            throw 'validation.error'
        }
    });
};
