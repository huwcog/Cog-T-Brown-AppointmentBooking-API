var express = require('express');
var router = express.Router();

var createOffers = function (params){
    var xml;
    if (params){
        //TODO - write code to provide custom response back for more realistic appointments
    } else {
        xml =  '<?xml version="1.0" encoding="UTF-8"?><AppointmentOffers xmlns="http://www.cognitomobile.com/schemas/TBrown/1.0/Appointments"><AppointmentOffer><Level>Morning</Level><AppointmentDate>2010-09-28</AppointmentDate><StartTime>09:00:00</StartTime> <EndTime>13:00:00</EndTime> </AppointmentOffer> <AppointmentOffer> <Level>Afternoon</Level> <AppointmentDate>2010-09-28</AppointmentDate> <StartTime>14:00:00</StartTime> <EndTime>17:00:00</EndTime> </AppointmentOffer> </AppointmentOffers>';
    }
    return xml;
};

/* GET home page. */
router.get('/serviceorder/:ServiceOrderNo/appointments', function(req, res, next) {
    console.log('');
    console.log('*******************');
    console.log('Call to GET Request - Appointment Request – T16');
    console.log('req.query : '+JSON.stringify(req.query));
    if (req.query.token){
        console.log('req.query.token exists: '+req.query.token);
    }
    console.log('Response to GET Request - Appointment Offers - T18');

    var result = createOffers(req.query);
    res.set('Content-Type', 'application/xml');
    res.send(result);
});

module.exports = router;
