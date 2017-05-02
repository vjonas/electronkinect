var Kinect2 = require('kinect2'),
	express = require('express'),
	fs = require('fs'),
	app = express(),
	server = require('http').createServer(app);
zlib = require('zlib');

console.log("child working- na initialisatie");
process.send("worker.js geopend");

//messaging with parent
var kinect = new Kinect2();
console.log("na new Kinect2: " + kinect);
/*process.on('message', (m) => {
  console.log('CHILD got message:', m);
});
process.send({ foo: 'bar' });*/

//check if parent dies
process.on('disconnect', function () {
	console.log('parent exited')
	process.exit();
});

if (kinect.open()) {
	server.listen(8000);

	var i = 0;
	kinect.on('bodyFrame', function (bodyFrame) {
		//process.send(bodyframe);
		//io.sockets.emit('bodyFrame', bodyFrame);
		//ipc.send('kinect-bodyframe', bodyFrame);
		//console.log(JSON.stringify(bodyFrame));
		process.send("0" + JSON.stringify(bodyFrame));

	});

	var compression = 2;
	process.send("compression:" + compression.toString());

	var origWidth = 1920;
	var origHeight = 1080;
	var origLength = 4 * origWidth * origHeight;
	var compressedWidth = origWidth / compression;
	var compressedHeight = origHeight / compression;
	process.send("compressedwidth:" + compressedWidth);
	process.send("compressedheight:" + compressedHeight);
	var resizedLength = 4 * compressedWidth * compressedHeight;
	//we will send a smaller image (1 / 10th size) over the network
	var resizedBuffer = new Buffer(resizedLength);
	var compressing = false;

	kinect.on('colorFrame', function (data) {
		//compress the depth data using zlib
		if (!compressing) {
			compressing = true;
			//data is HD bitmap image, which is a bit too heavy to handle in our browser
			//only send every x pixels over to the browser
			var y2 = 0.0;
			for (var y = 0.0; y < origHeight; y += compression) {
				y2++;
				var x2 = 0.0;
				for (var x = 0.0; x < origWidth; x += compression) {
					var i = 4 * (y * origWidth + x);
					var j = 4 * (y2 * compressedWidth + x2);
					resizedBuffer[j] = data[i];
					resizedBuffer[j + 1] = data[i + 1];
					resizedBuffer[j + 2] = data[i + 2];
					resizedBuffer[j + 3] = data[i + 3];
					x2++;
				}
			}

			zlib.deflate(resizedBuffer, function (err, result) {
				if (!err) {
					//VERANDEREN
					process.send('1' + result.toString('base64'));
				}
				compressing = false;
			});
		}
	});
	kinect.openColorReader();
	kinect.openBodyReader();
}
