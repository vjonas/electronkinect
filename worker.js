var Kinect2 = require('kinect2'),
    express = require('express'),
    fs = require('fs'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

console.log("child working- na initialisatie");


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
    //server.listen(9001);
    console.log('Server listening on port 8000 in worker.js');
    console.log('Point your browser to http://localhost:8000');

    var i = 0;
    kinect.on('bodyFrame', function (bodyFrame) {
        //process.send(bodyframe);
        //io.sockets.emit('bodyFrame', bodyFrame);
        //ipc.send('kinect-bodyframe', bodyFrame);
        
        console.log(bodyFrame);
    });
    //try some mockcode here
    console.log("mock code");
    i=0;    
	/*while(1)
    {   
        console.log("while loop:"+i);
        i++;
    }*/ 
    console.log("na while loop, zonder IPC");
    //ipc.send('kinect-bodyframe', bodyFrame);
    kinect.openBodyReader();
}
