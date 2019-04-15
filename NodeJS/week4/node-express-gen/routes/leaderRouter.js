

var express = require('express');
var leaderRouter = express.Router();
var bodyParser = require('body-parser');
leaderRouter.use(bodyParser.json());


leaderRouter.route('/')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Will send all the leaders to you!');
})

.post(function(req, res, next){
    res.end('Will add the leader: ' + req.body.id + ' with details: ' + req.body.name);    
})

.delete(function(req, res, next){
        res.end('Deleting all leaders');
});

leaderRouter.route('/:leadershipId')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Will send details of the leader: ' + req.params.leadershipId +' to you!');
})

.put(function(req, res, next){
        res.write('Updating the leader: ' + req.params.leadershipId + '\n');
    res.end('Will update the leader: ' + req.body.id + 
            ' with details: ' + req.body.name);
})

.delete(function(req, res, next){
        res.end('Deleting leader: ' + req.params.leadershipId);
});
module.exports = leaderRouter;