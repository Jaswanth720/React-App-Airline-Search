var express = require('express');
var Countries = require('../models/countries');

var router = express.Router();

router.get('/', function(req, res) {
    Countries.retrieveAll(function(err, countries) {
      if (err)
        return res.json(err);
      return res.json(countries);
    });
  });
module.exports = router;
