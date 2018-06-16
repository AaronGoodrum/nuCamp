var express = require('express');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
const cors = require('./cors');

var router = express.Router();

/* GET users listing. */
router.get('/', authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  User.find({}, (err, user) => {
    if (err) throw err;
    res.json(user);
  });
});

router.post('/login',(req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }

      var token = authenticate.getToken(user);
      res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

router.get('/facebook', passport.authenticate('facebook'),
    (req, res) =>{});

router.get('/facebook/callback', (req,res,next) =>{
  passport.authenticate('facebook', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      var token = authenticate.getToken(user);
      res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

router.post('/register', (req, res) => {
  User.register(new User({ username : req.body.username }),
      req.body.password, (err, user) => {
        if (err) {
          return res.status(500).json({err: err});
        }
        if(req.body.firstname) {
          user.firstname = req.body.firstname;
        }
        if(req.body.lastname) {
          user.lastname = req.body.lastname;
        }
        user.save(function(err,user) {
          passport.authenticate('local')(req, res, function () {
            return res.status(200).json({status: 'Registration Successful!'});
          });
        });
      });
});

module.exports = router;



















// router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
//   if (req.user) {
//     var token = authenticate.getToken({_id: req.user._id});
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json');
//     res.json({success: true, token: token, status: 'You are successfully logged in!'});
//   }
// });

// router.post('/signup', cors.corsWithOptions, (req, res, next) => {
//   User.register(new User({username: req.body.username}), 
//     req.body.password, (err, user) => {
//     if(err) {
//       res.statusCode = 500;
//       res.setHeader('Content-Type', 'application/json');
//       res.json({err: err});
//     }
//     else {
//       if (req.body.firstname)
//         user.firstname = req.body.firstname;
//       if (req.body.lastname)
//         user.lastname = req.body.lastname;
//       user.save((err, user) => {
//         if (err) {
//           res.statusCode = 500;
//           res.setHeader('Content-Type', 'application/json');
//           res.json({err: err});
//           return ;
//         }
//         passport.authenticate('local')(req, res, () => {
//           res.statusCode = 200;
//           res.setHeader('Content-Type', 'application/json');
//           res.json({success: true, status: 'Registration Successful!'});
//         });
//       });
//     }
//   });
// });

// router.post('/login', cors.corsWithOptions, passport.authenticate('local'), (req, res) => {

//   var token = authenticate.getToken({_id: req.user._id});
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'application/json');
//   res.json({success: true, token: token, status: 'You are successfully logged in!'});
// });

// router.get('/logout', cors.corsWithOptions, (req, res) => {
//   if (req.session) {
//     req.session.destroy();
//     res.clearCookie('session-id');
//     res.redirect('/');
//   }
//   else {
//     var err = new Error('You are not logged in!');
//     err.status = 403;
//     next(err);
//   }
// });

// module.exports = router;
