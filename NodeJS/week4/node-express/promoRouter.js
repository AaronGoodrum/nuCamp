

var express = require('express');
var promoRouter = express.Router();
var bodyParser = require('body-parser');
promoRouter.use(bodyParser.json());


promoRouter.route('/')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Will send all the promotions to you!');
})

.post(function(req, res, next){
    res.end('Will add the promotion: ' + req.body.id + ' with details: ' + req.body.name);    
})

.delete(function(req, res, next){
        res.end('Deleting all promotions');
});

promoRouter.route('/:promotionId')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Will send details of the promotion: ' + req.params.promotionId +' to you!');
})

.put(function(req, res, next){
        res.write('Updating the promotion: ' + req.params.promotionId + '\n');
    res.end('Will update the promotion: ' + req.body.id + 
            ' with details: ' + req.body.name);
})

.delete(function(req, res, next){
        res.end('Deleting promotion: ' + req.params.promotionId);
});
module.exports = promoRouter;