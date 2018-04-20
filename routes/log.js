var router = require('express').Router()
var sequelize = require('../db')
var Log = sequelize.import('../models/log.js')
var User = sequelize.import('../models/user.js')
var Definition = sequelize.import('../models/definition.js')

router.post('/', function(req, res){
  var description = req.body.log.description
  var novel = req.body.log.novel
  var author = req.body.log.author
  var url = req.body.log.url
  var review = req.body.log.review
  var user = req.user
  var definition = req.body.log.def

  Log.create({
    description: description,
    novel: novel,
    author: author,
    url: url,
    review: review,
    owner: user.id,
    def: definition
  }).then(
    function createSuccess(log){
      res.json(log)
    },
    function createError(err) {
      res.send(500, err.message)
    }
  )
})

router.get('/', function(req, res){
  var userid = req.user.id
  Log.findAll({
    where:{owner: userid}
  }).then(
    function findAllSuccess(data){
      res.json(data)
    },
    function findAllError(err){
      res.send(500, err.message)
    }
  )
})
router.get('/:id', function(req, res){
  var data = req.params.id
  Log.findOne({
    where: {id: data}
  }).then(
    function getSuccess(updateData){
      res.json(updateData)
    },
    function getError(err){
      res.send(500, err.message)
    }
  )
})
router.put('/', function(req, res){
  console.log(req.body.log)
  var description = req.body.log.description
  var novel = req.body.log.novel
  var author = req.body.log.author
  var url = req.body.log.url
  var review = req.body.log.review
  var data = req.body.log.id
  var definition = req.body.log.def
  Log.update({
    description: description,
    novel: novel,
    author: author,
    review: review,
    url: url,
    def: definition
  },
  {where: {id: data}}
  ).then(
    function updateSuccess(updatedLog){
      res.json(updatedLog)
    },
    function updateError(err){
      res.send(500, err.message)
    }
  )
})
router.delete('/', function(req, res){
  var data = req.body.log.id
  Log.destroy({
    where: {id: data}
  }).then(
    function deleteLogSuccess(data){
      res.send("you removed a log")
    },
    function deleteLogError(err){
      res.send(500, err.message)
    }
  )
})

module.exports = router