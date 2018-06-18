const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        dishes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dish'
        }],
    },
    {
        timestamps: true
    }
);

const Favorites = mongoose.model('favorite', favoriteSchema);
module.exports = Favorites;
