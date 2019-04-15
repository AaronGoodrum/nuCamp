// grab the things we need
var mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;
var Schema = mongoose.Schema;

// create a schema
var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: String,
    category: String,
    label: {
        type: String,
        default: ""
    },
    price: {
        type: Currency,
    },
    description: {
        type: String,
        required: true
    },
    comments: [{
        rating: Number,
        comment: String,
        author: String
    }],
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Dishes = mongoose.model('Dish', dishSchema);

// make this available to our Node applications
module.exports = Dishes;