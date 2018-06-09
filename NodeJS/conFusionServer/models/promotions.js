const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// Schema -  organization of data as a blueprint of how the database is constructed
var promoSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		required: true
	},
	label: {
		type: String,
		default: ""
	},
	price: {
		type: Currency,
		required: true
	},
	description: {
		type: String,
		required: true
	},
}, {
	timestamps: true
});

// Models are responsible for creating and reading documents from the underlying MongoDB database
var Promos = mongoose.model('Promo', promoSchema);

// available to our Node app
module.exports = Promos;