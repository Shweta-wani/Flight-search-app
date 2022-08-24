const express = require('express');
const router = express.Router();

/* GET cities listing. */
router.get('/', function(req, res, next) {
  let flightsArray = require('../public/json/flights.json');

  flightsArray.map(flight => {
    flight.uuid = create_UUID();
  })

  res.json({flights : flightsArray});
});

/* GET flights listing with origin, destination, departure date and return date*/
router.get('/:origin/:destination', function(req, res, next) {
  let flightsArray = require('../public/json/flights.json');

  if(!req.params.origin || !req.params.destination) {
    res.status(400).send("Origin or Destination required");
    return
  }

  if (Number(req.params.origin.length) !== 3 || Number(req.params.destination.length !== 3)) {
    res.status(400).send("Origin and Destination should have 3 characters");
    return;
  }

  if (!isValidDateFormat(req.query.departureDate) || !isValidDateFormat(req.query.returnDate)) {
    res.status(400).send("Date should be in YYYY-MM-DD format");
    return;
  }

  if (!isValidDate(req.query.departureDate) || !isValidDate(req.query.returnDate)) {
    res.status(400).send("Given date is not valid");
    return;
  }

  if(req.query.service) {
    flightsArray = flightsArray.filter(flight =>
        flight.origin === req.params.origin &&
        flight.destination === req.params.destination &&
        Date.parse(flight.departureDate) === Date.parse(req.query.departureDate) &&
        Date.parse(flight.returnDate) === Date.parse(req.query.returnDate) &&
       `amadeus${flight.offerType}` === req.query?.service
    )

    flightsArray.sort(function(a, b) {
      return parseFloat(a.price.amount) - parseFloat(b.price.amount);
    });
  } else {
    flightsArray = flightsArray.filter(flight =>
        flight.origin === req.params.origin &&
        flight.destination === req.params.destination &&
        Date.parse(flight.departureDate) === Date.parse(req.query.departureDate) &&
        Date.parse(flight.returnDate) === Date.parse(req.query.returnDate)
    )
  }

  res.json({flights : flightsArray});
});

function create_UUID(){
  let dt = new Date().getTime();
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (dt + Math.random()*16)%16 | 0;
    dt = Math.floor(dt/16);
    return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

function isValidDate(dateString) {
  let d = new Date(dateString);
  let dNum = d.getTime();
  if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return true;
}

function isValidDateFormat(dateString) {
  let regEx = /^\d{4}-\d{2}-\d{2}$/;
  if(!dateString.match(regEx)) return false;
  return true;
}

module.exports = router;
