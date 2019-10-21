var express = require('express');
var Countries = require('../models/countries');
const db = require('../database');

var router = express.Router();

router.get('/', function(request, response) {
    Countries.retrieveAll(function(err, countries) {
      if (err)
        return response.json(err);
      return response.json(countries);
    });
  })

// GET selected country query
router.get('/:country', function (request, response) {
  const countrySelected = request.params.country;
  const q = `select name from airports where country = '${countrySelected}'`;
  db.query(q,(err, res) => {
    if(err) {
      console.log(err);
    }
    response.json(res);
  });
});
  
//GET selected number of stops
// SELECT f.name FROM airlines f 
// FULL OUTER JOIN routes r on f.airline_id = r.airline_id
// WHERE r.stops = '1';

router.get('/stops/:stops', function (request, response) {
  const stops = request.params.stops;
  const q = `SELECT DISTINCT f.name FROM airlines f FULL OUTER JOIN routes r on f.airline_id = r.airline_id WHERE r.stops = '${stops}'`;
  db.query(q,(err, res) => {
    if(err) {
      console.log(err);
    }
    response.json(res);
  });
});


router.get('/codeshare/:value', function (request, response) {
  const codeshare_value = request.params.value;
  const q = `SELECT DISTINCT f.name FROM airlines f FULL OUTER JOIN routes r on f.airline_id = r.airline_id WHERE r.codeshare = '${codeshare_value}'`;
  db.query(q,(err, res) => {
    if(err) {
      console.log(err);
    }
    response.json(res);
  });
});

router.get('/active/:value', function (request, response) {
  const active_value = request.params.value;
  const q = `SELECT DISTINCT name FROM airlines WHERE active = '${active_value}'`;
  db.query(q,(err, res) => {
    if(err) {
      console.log(err);
    }
    response.json(res);
  });
});



module.exports = router;
