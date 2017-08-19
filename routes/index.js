var router = require('express').Router();
var models = require('../models');
var controllers = require('../controllers');

router.use(function (req, res, next) {
  next();
});

router.get('/', function (req, res) {
  res.status(200).render('index');
});

router.get('/summary', function(req, res){
  controllers.summary.get().then(function(debts) {
    res.status(200).send(JSON.stringify(debts));
  });
});

router.get('/members', function(req, res) {
  controllers.member.get().then(function(members) {
    res.status(200).send(JSON.stringify(members));
  });
});

router.get('/transactions', function(req, res) {
  controllers.transaction
      .search({order: {field:'date',order:'desc'}})
      .then(transactions => {
        res.status(200).send(JSON.stringify(transactions));
      });
});

router.post('/transactions/search', function(req, res) {
  var body = req.body;
  console.log('body', body);
  controllers.transaction.search(body).then(transactions => {
    res.status(200).send(JSON.stringify(transactions));
  })
});

router.post('/transactions', function (req, res) {
  var body = req.body;
  console.log("body", body);
  controllers.transaction.add(
    body.from,
    body.to,
    body.total,
    body.date,
    body.memo,
    body.type,
    body.category
  ).then(function (transaction) {
    res.status(200).json(transaction);
  });
});

module.exports = router;
