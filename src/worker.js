var Kinect2 = require('kinect2'),
    express = require('express'),
    fs = require('fs'),
    app = express(),
    server = require('http').createServer(app);

//process.send("worker.js geopend");
var kinect = new Kinect2();
//check if parent dies
process.on('disconnect', function() {
    process.exit();
});

if (kinect.open()) {
    server.listen(8000);
    var i = 0;
    kinect.on('bodyFrame', function(bodyFrame) {
        process.send(JSON.stringify(bodyFrame));
    });
    kinect.openBodyReader();
}