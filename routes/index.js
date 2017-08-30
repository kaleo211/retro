var router = require('express').Router();
var models = require('../models');
var controllers = require('../controllers');

router.use((req, res, next) => {
  next();
});

router.get('/', (req, res) => {
  res.status(200).render('index');
});

router.delete('/board/:boardID/item/:itemID', (req, res) => {
  controllers.item.delete(req.params.boardID, req.params.itemID).then(items => {
    res.status(200).json(items);
  });
});

router.put('/board/:boardID/item/:itemID', (req, res) => {
  controllers.item.put(req.params.boardID, req.params.itemID, req.body).then(items => {
    res.status(200).json(items);
  });
});

router.get('/board', (req, res) => {
  controllers.board.get().then(boards => {
    res.status(200).json(boards);
  });
});

router.get('/board/:id/item', (req, res) => {
  controllers.item.get(req.params.id).then(items => {
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
