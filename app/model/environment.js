var mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

var colorSchema = mongoose.Schema({
    type: String,
    color: String
});

var componentSchema = mongoose.Schema({
    name: String,
    templateFile: String,
});

var pageSchema = mongoose.Schema({
    route: String,
    components: [componentSchema],
});

var schema = mongoose.Schema(
    {
        name: String,
        urls: Array,
        colors: [colorSchema],
        pages: [pageSchema],
    }, 
    
    { 
        timestamps: true 
    }
);

schema.plugin(mongoose_delete, { deletedAt : true });

var model = mongoose.model('environment', schema);

module.exports = model;
