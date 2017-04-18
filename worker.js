var Kinect2 = require('kinect2'),
    express = require('express'),
    fs = require('fs'),
    app = express(),
    server = require('http').createServer(app);
    //io = require('socket.io').listen(server);

console.log("child working- na initialisatie");
 process.send("worker.js geopend");

//messaging with parent
var kinect = new Kinect2();
console.log("na new Kinect2: "+kinect);
/*process.on('message', (m) => {
  console.log('CHILD got message:', m);
});
process.send({ foo: 'bar' });*/

//check if parent dies
process.on('disconnect', function() {
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
        process.send(JSON.stringify(bodyFrame));
        
    });
    //try some mockcode here
    i=0;    
	/*while(1)
    {   
        console.log("while loop:"+i);
        i++;
    }*/ 
    //ipc.send('kinect-bodyframe', bodyFrame);
    kinect.openBodyReader();
}
