const bodyParser = require('body-parser');
const express = require('express');
const favoriteRouter = express.Router();
const Favorites = require('../models/favorites');
const authenticate = require('../authenticate');
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
  .get(authenticate.verifyOrdinaryUser, (req, res, next) => {
    Favorites.find({
        "postedBy": req.decoded._doc._id
      })
      .populate('postedBy')
      .populate('dishes')
      .exec((err, favorite) => {
        if (err) throw err;
        res.json(favorite);
      });
  })

  .post(authenticate.verifyOrdinaryUser, (req, res, next) => {
    Favorites.find({
      "postedBy": req.decoded._doc._id
    }).exec((err, favorite) => {
      if (err) throw err;
      if (favorite.length === 0) {
        req.body.postedBy = req.decoded._doc._id;
        req.body.dishes = req.body._id;
        req.body._id = null;
        Favorites.create(req.body, (err, favoriteDish) => {
          if (err) throw err;
          res.json(favoriteDish);
        });
      } else {
        var dish = favorite[0];
        dish.dishes.push(req.body._id);
        dish.save((err, favorite) => {
          if (err) throw err;
          res.json(favorite);
        });
      }
    });
  })

  .delete(authenticate.verifyOrdinaryUser, (req, res, next) => {
    Favorites.find({
      "postedBy": req.decoded._doc._id
    }).exec((err, favorite) => {
      if (err) throw err;
      if (favorite.length === 0) {
        res.json(favorite);
      } else {
        if (favorite[0].dishes.length > 0) {
          favorite[0].remove((err, result) => {
            if (err) throw err;
            res.writeHead(200, {
              'Content-Type': 'text/plain'
            });
            res.end("Deleted all Favorites");
          });
        }
      }
    });
  });

favoriteRouter.route('/:dishId')
  .delete(authenticate.verifyOrdinaryUser, (req, res, next) => {
    Favorites.find({
      "postedBy": req.decoded._doc._id
    }).exec((err, favorite) => {
      if (err) throw err;
      var index = favorite[0].dishes.indexOf(req.params.dishId);
      if (index > -1) {
        favorite[0].dishes.splice(index, 1);
        favorite[0].save((err, favorite) => {
          if (err) throw err;
          res.json(favorite);
        });
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end("No such Dish");
      }
    });
  });
module.exports = favoriteRouter;
