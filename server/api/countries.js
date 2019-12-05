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
  const q = `select name from airports where country like '%${countrySelected}%'`;
  db.query(q,(err, res) => {
    if(err) {
      console.log(err);
    }
    response.json(res);
  });
});
  
//GET selected number of stops
// SELECT f.name, count(distinct r.dest_airport_id) as number_of_airports_serviced FROM airlines f 
// left OUTER JOIN routes r on f.airline_id = r.airline_id
// having count(distinct r.dest_airport_id) >= 50
// order by count(distinct r.dest_airport_id)
// limit 50;

router.get('/stops/:stops', function (request, response) {
  const stops = request.params.stops;
  const q = `SELECT f.name, count(distinct r.destination_airport_id) as number_of_airports_serviced FROM airlines f 
  left OUTER JOIN routes r on f.airline_id = r.airline_id
  Group by 1
  having count(distinct r.destination_airport_id) >= '${stops}'
  order by count(distinct r.destination_airport_id)
  limit 50;`;
  db.query(q,(err, res) => {
    if(err) {
      console.log(err);
    }
    response.json(res);
  });
});


router.get('/codeshare/:value', function (request, response) {
  const codeshare_value = request.params.value;
  const q = `SELECT DISTINCT f.name FROM airlines f LEFT OUTER JOIN routes r on f.airline_id = r.airline_id WHERE r.codeshare = '${codeshare_value}'`;
  db.query(q,(err, res) => {
    if(err) {
      console.log(err);
    }
    response.json(res);
  });
});

router.get('/active/:value', function (request, response) {
  const active_value = request.params.value;
  const q = `SELECT DISTINCT name FROM airlines WHERE active = 'Y' and country = '${active_value}'`;
  db.query(q,(err, res) => {
    if(err) {
      console.log(err);
    }
    response.json(res);
  });
});

// router.get('/active/:value', function (request, response) {
//   const active_value = request.params.value;
//   const q = `SELECT DISTINCT name FROM airlines WHERE active = '${active_value}'`;
//   db.query(q,(err, res) => {
//     if(err) {
//       console.log(err);
//     }
//     response.json(res);
//   });
// });

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
  ) as stopsV2 on minroutes.route_id = stopsV2.route_id
  where source.name = '${source_airport_value}' and dest.name = '${destination_airport_value}' and stopsV2.source_name != source.name
  Group by 1,2,3,4;`;
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
  const q = `Select minroutes.route_id, source.name as source_name, dest.name as dest_name, minroutes.distance, count(distinct stopsV2.source_name) as num_stops, array_agg(stopsV2.source_name) as layover_stops
  from minroutes
  left join airports as source on source.airport_id = minroutes.source_airport_id
  Left join airports as dest on dest.airport_id = minroutes.destination_airport_id
  Left outer join (Select route_id, source.name as source_name, dest.name as dest_name, distance from stops
  left join airports as source on source.airport_id = stops.source_airport_id
  Left join airports as dest on dest.airport_id = stops.destination_airport_id) as stopsV2 on minroutes.route_id = stopsV2.route_id
  where source.name = '${source_airport_value}' and dest.name = '${destination_airport_value}' and  stopsV2.source_name != source.name
  Group by 1,2,3,4
  Having count(distinct stopsV2.source_name) < ${nums_stops_value};`;
  
  db.query(q,(err, res) => {
    console.log(q);
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
  /*const q = `Select distinct destination_airport_id 
  from minroutes
  where source_airport_id = '${source_airport_value}' and num_stops < '${nums_stops_value}'
  limit 10`;*/
  const q = `Select airport_id as id, iata, name, city, country, tz_database_timezone as timezone, type, min(num_stops) + 1 as num_stops
  from
  (Select minroutes.route_id, source.name as source_name, dest.name as dest_name, minroutes.distance, count(distinct stopsV2.source_name) as num_stops, array_agg(stopsV2.source_name) as layover_stops
  from minroutes
     left join airports as source on source.airport_id = minroutes.source_airport_id
    Left join airports as dest on dest.airport_id = minroutes.destination_airport_id
     Left outer join (Select route_id, source.name as source_name, dest.name as dest_name, distance from stops
    left join airports as source on source.airport_id = stops.source_airport_id
     Left join airports as dest on dest.airport_id = stops.destination_airport_id) as stopsV2 on minroutes.route_id = stopsV2.route_id
   where source.name = '${source_airport_value}' and  stopsV2.source_name != source.name
   Group by 1,2,3,4) as a
  Left join airports on a.dest_name = airports.name
  Group by 1,2,3,4,5,6, 7
  Having min(num_stops) + 1 <= '${nums_stops_value}'
  Order by min(num_stops) desc
  Limit 25;`
  db.query(q,(err, res) => {
    if(err) {
      console.log(err);
    }
    response.json(res);
  });
});



module.exports = router;


