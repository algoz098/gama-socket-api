var mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

var colorSchema = mongoose.Schema({
    type: String,
    value: String
});

var metadata = mongoose.Schema({
    titleTemplate: String,
    meta: {},
});

var componentSchema = mongoose.Schema({
    component: String,
    type: String,
    props: {},
});

var pageSchema = mongoose.Schema({
    title: String,
    route: String,
    metadata: metadata,
    components: [componentSchema],
});
    
var schema = mongoose.Schema(
    {
        name: String,
        default: {type: Boolean, default: false},
        metadata: metadata,
        urls: Array,
        layout: componentSchema,
        navbar: componentSchema,
        footer: componentSchema,
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
