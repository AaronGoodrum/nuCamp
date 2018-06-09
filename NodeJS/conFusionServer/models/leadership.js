const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
// var Currency = mongoose.Types.Currency;

// Schema -  organization of data as a blueprint of how the database is constructed
var leaderSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		required: true
	},
	designation: {
		type: String,
		required: true
	},
	abbr: {
		type: String,
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
var Leaders = mongoose.model('Leader', leaderSchema);

// available to our Node app
module.exports = Leaders;