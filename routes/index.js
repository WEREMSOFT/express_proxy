var express = require('express');
var router = express.Router();

var tools = require('../api/showJSON');
var celery = require('../api/celeryCalls');
var naka = require('../api/nakaCalls');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api', tools.showJSONfunction);

router.get('/api/get_products', celery.getProducts);

module.exports = router;
