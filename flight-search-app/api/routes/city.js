let express = require('express');
let router = express.Router();

/* GET flights listing. */
router.get('/', function(req, res, next) {
  let cityArray = require('../public/json/city.json')
  res.json({cities : cityArray});
});

module.exports = router;