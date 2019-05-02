var mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

var accessSchema = mongoose.Schema({
    env: String,
    level: String,
});

var schema = mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        access: [accessSchema],
    }, 
    
    { 
        timestamps: true 
    }
);

schema.plugin(mongoose_delete, { deletedAt : true });

var model = mongoose.model('user', schema);

module.exports = model;
