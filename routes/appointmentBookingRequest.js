var express = require('express');
var router = express.Router();

var requestType = 1;
var result;

/* GET home page. */
router.post('/serviceorder/:ServiceOrderNo/appointments', function(req, res, next) {
    console.log('');
    console.log('*******************');
    console.log('Call to POST Request - Appointment Request – T18A');
    console.log('req.query : '+JSON.stringify(req.query));
    if (req.query.token){
        console.log('req.query.token exists: '+req.query.token);
    }
    console.log('RequestType = '+requestType);
    switch (requestType) {
        case 1:
            result = '<?xml version="1.0" encoding="UTF-8"?><AppointmentBookingResponse xmlns="http://www.cognitomobile.com/schemas/TBrown/1.0/Appointments"> <Confirmed>true</Confirmed> <NewServiceOrderNo>SO123456</NewServiceOrderNo> <AppointmentOffer> <Level>Morning</Level> <AppointmentDate>2010-09-28</AppointmentDate> <StartTime>09:00:00</StartTime> <EndTime>13:00:00</EndTime></AppointmentOffer></AppointmentBookingResponse>';
            break;
        case 2:
            result = '<?xml version="1.0" encoding="UTF-8"?><AppointmentBookingResponse xmlns="http://www.cognitomobile.com/schemas/TBrown/1.0/Appointments"><Confirmed>false</Confirmed><AppointmentOffer><Level>Morning</Level><AppointmentDate>2010-09-28</AppointmentDate><StartTime>09:00:00</StartTime><EndTime>13:00:00</EndTime></AppointmentOffer></AppointmentBookingResponse>';
            break;
        case 3:
            result = '<?xml version="1.0" encoding="UTF-8"?><AppointmentBookingResponse xmlns="http://www.cognitomobile.com/schemas/TBrown/1.0/Appointments"><Confirmed>false</Confirmed></AppointmentBookingResponse>';
            break;
        case 4:
            break;
    }
    res.set('Content-Type', 'application/xml');
    res.send(result);
});

router.post('/config/BookingRequest',function (req,res,next) {
    console.log('Setting appooint booking response type to: '+req.query.setBookingType);
    requestType = parseInt(req.query.setBookingType);
    if (requestType === 4) {
		result = "";
		req.on("data",function(chunk){
			result += chunk.toString();
		});
		req.on("end",function(){
			res.set('Content-Type', 'application/xml');
			res.send('<Response>Success</Response>');
		});
	} else {
		res.set('Content-Type', 'application/xml');
		res.send('<Response>Success</Response>');
	}
});

module.exports = router;
