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

router.get('/most_airports/airports', function (request, response) {
  // const active_value = request.params.value;
  const q = `SELECT country, COUNT(country) AS Occurrences
  FROM airports
  GROUP BY country
  ORDER BY Occurrences DESC
  LIMIT 5;`;
  db.query(q,(err, res) => {
    if(err) {
      console.log(err);
    }
    response.json(res);
  });
});


router.get('/top_cities/cities', function (request, response) {
  // const active_value = request.params.value;
  const q = `Select a.city, a.country, incoming, outgoing
  from
  (Select city, country, count(distinct airline) as incoming
  from routes
  left join airports on routes.destination_airport_id = airports.airport_id
  group by 1,2) as a
  join 
  (Select city, country,  count(distinct airline) as outgoing
  from routes
  left join airports on routes.source_airport_id = airports.airport_id
  group by 1,2) as b on b.city = a.city and b.country = a.country
  order by 3 desc
  LIMIT 5;`;

  db.query(q,(err, res) => {
    if(err) {
      console.log(err);
    }
    response.json(res);
  });
});


router.get('/find_trip/:source_value/:destination_value', function (request, response) {
  const source_airport_value = request.params.source_value;
  const destination_airport_value = request.params.destination_value;
  const q = `Select * from minroutes
  where source_airport_id = '${source_airport_value}' and destination_airport_id = '${destination_airport_value}'
  limit 1`;
  db.query(q,(err, res) => {
    console.log(res);
    console.log(q);
    if(err) {
      console.log(err);
    }
    response.json(res);
  });
});


router.get('/num_stops/:stops_value/:source_value/:destination_value', function (request, response) {
  const nums_stops_value = request.params.stops_value;
  const source_airport_value = request.params.source_value;
  const destination_airport_value = request.params.destination_value;
  const q = `Select * from min_routes
  where num_stops < '${nums_stops_value}' and source_airport_id = '${source_airport_value}' and destination_airport_id = '${destination_airport_value}'`;
  
  db.query(q,(err, res) => {
    if(err) {
      console.log(err);
    }
    response.json(res);
  });
});

router.get('/d_hops/:stops_value/:source_value', function (request, response) {
  const nums_stops_value = request.params.stops_value;
  const source_airport_value = request.params.source_value;
  // const destination_airport_value = request.params.destination_value;
  const q = `Select destination_airport_id 
  from min_routes
  where source_airport_id = '${source_airport_value}' and num_stops < '${nums_stops_value}'`;
  
  db.query(q,(err, res) => {
    if(err) {
      console.log(err);
    }
    response.json(res);
  });
});





module.exports = router;
