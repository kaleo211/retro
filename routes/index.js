var router = require('express').Router();
var models = require('../models');
var controllers = require('../controllers');

router.use(function (req, res, next) {
  next();
});

router.get('/', function (req, res) {
  res.status(200).render('index');
});

router.get('/board', function(req, res) {
  controllers.board.get().then(function(boards) {
    res.status(200).send(JSON.stringify(boards));
  });
});

router.post('/board', function(req, res) {
  controllers.board.post(req.body).then(function(board) {
    res.status(200).send(JSON.stringify(board));
  });
});

router.post('/board/item', function (req, res) {
  var body = req.body;
  controllers.transaction.add(
    body.type,
    body.title,
    body.total
  ).then(function (transaction) {
    res.status(200).json(transaction);
  });
});

module.exports = router;
