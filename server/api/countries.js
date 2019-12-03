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
  const q = `Select minroutes.route_id, source.name as source_name, dest.name as dest_name, minroutes.distance, count(distinct stopsV2.source_name) as num_stops, array_agg(stopsV2.source_name) from 
  minroutes
  left join airports as source on source.airport_id = minroutes.source_airport_id
  Left join airports as dest on dest.airport_id = minroutes.destination_airport_id
  Left outer join (Select route_id, source.name as source_name, dest.name as dest_name, distance from stops
  left join airports as source on source.airport_id = stops.source_airport_id
  Left join airports as dest on dest.airport_id = stops.destination_airport_id
  Limit 50) as stopsV2 on minroutes.route_id = stopsV2.route_id
  where source.name = '${source_airport_value}' and dest.name = '${destination_airport_value}' and stopsV2.source_name != source.name
  Group by 1,2,3,4
  limit 10;`;
  db.query(q,(err, res) => {
    console.log(res);
    console.log(q);
    if(err) {
      console.log(err);
    }
    response.json(res);
  });
});


router.get('/num_stops/:source_value/:destination_value/:stops_value', function (request, response) {
  const nums_stops_value = request.params.stops_value;
  const source_airport_value = request.params.source_value;
  const destination_airport_value = request.params.destination_value;
  const q = `Select * from minroutes
  where num_stops < '${nums_stops_value}' and source_airport_id = '${source_airport_value}' and destination_airport_id = '${destination_airport_value}';`;
  
  db.query(q,(err, res) => {
    if(err) {
      console.log(err);
    }
    response.json(res);
  });
});

router.get('/d_hops/:source_value/:stops_value', function (request, response) {
  const nums_stops_value = request.params.stops_value;
  const source_airport_value = request.params.source_value;
  // const destination_airport_value = request.params.destination_value;
  const q = `Select distinct destination_airport_id 
  from minroutes
  where source_airport_id = '${source_airport_value}' and num_stops < '${nums_stops_value}'
  limit 10`;
  
  db.query(q,(err, res) => {
    if(err) {
      console.log(err);
    }
    response.json(res);
  });
});



module.exports = router;


