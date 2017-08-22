var router = require('express').Router();
var models = require('../models');
var controllers = require('../controllers');

router.use((req, res, next) => {
  next();
});

router.get('/', (req, res) => {
  res.status(200).render('index');
});

router.get('/board', (req, res) => {
  controllers.board.get().then(boards => {
    res.status(200).json(boards);
  });
});

router.get('/board/:boardID/item', (req, res) => {
  controllers.item.get(req.params.boardID).then(items => {
    res.status(200).json(items);
  });
});

router.post('/board', (req, res) => {
  controllers.board.post(req.body).then(board => {
    res.status(200).json(board);
  });
});

router.post('/board/item', (req, res) => {
  controllers.item.post(req.body).then(items => {
    res.status(200).json(items);
  });
});

module.exports = router;
