var express = require('express');
var router = express.Router();

var xml;

var createOffers = function (params){
    if (xml){

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

router.post('/config/RequestAppointments',function (req,res,next) {
    xml = "";
    req.on("data",function(chunk){
        xml += chunk.toString();
    });
    req.on("end",function(){
        res.set('Content-Type', 'application/xml');
        res.send('<Response>Success</Response>');
    });
});

module.exports = router;