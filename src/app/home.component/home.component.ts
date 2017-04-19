import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import { Kinect2 } from 'kinect2';
declare var electron: any;

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit, OnChanges, AfterViewInit {
    private ipc;

    constructor() {
        this.ipc = electron.ipcRenderer;
    }


    ngOnInit() {
    }
    ngAfterViewInit() {
        this.ipc.on('bodyFrame', function (event, bodyFrame) {  
            bodyFrame=JSON.parse(bodyFrame);   
            console.log(bodyFrame); 
            //declaring the needed variables
            // handstate circle size
            var HANDSIZE = 13;
            // closed hand state color
            var HANDCLOSEDCOLOR = "red";
            // open hand state color
            var HANDOPENCOLOR = "green";
            // lasso hand state color
            var HANDLASSOCOLOR = "blue";
            var canvas = <HTMLCanvasElement>document.getElementById('bodyframecanvas');
            var ctx = canvas.getContext('2d');
            var colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];

            //function updatehandstate
            function updateHandState(handState, jointPoint) {
                switch (handState) {
                    case 3:
                        drawHand(jointPoint, HANDCLOSEDCOLOR);
                        break;
                    case 2:
                        drawHand(jointPoint, HANDOPENCOLOR);
                        break;
                    case 4:
                        drawHand(jointPoint, HANDLASSOCOLOR);
                        break;
                }
            }

            //function drawhand
            function drawHand(jointPoint, handColor) {
                // draw semi transparent hand cicles
               ctx.globalAlpha = 0.75;
               ctx.beginPath();
               ctx.fillStyle = handColor;
               ctx.arc(jointPoint.depthX * 640, jointPoint.depthY * 360, HANDSIZE, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.closePath();
                ctx.globalAlpha = 1;
            }

            //main rendering process
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var index = 0;
            bodyFrame.bodies.forEach(function (body) {
                if (body.tracked) {
                    for (var jointType in body.joints) {
                        var joint = body.joints[jointType];
                        ctx.fillStyle = colors[index];
                        ctx.fillRect(joint.depthX * 640, joint.depthY * 360, 5, 5);
                    }
                    //1 raakpunt tekenen
                    ctx.beginPath();
                    ctx.fillStyle = "#E88C00";
                    ctx.fillRect(520, 120, 40, 40);
                    ctx.fill();
                    ctx.closePath();
                    ctx.globalAlpha = 1;
                    //check for collision joint 11 and green thingy
                    var joint = body.joints[11];
                    
                    if((parseFloat(joint.depthX) * 640 > 520 && parseFloat(joint.depthX) * 640 < 520+40) && (parseFloat(joint.depthY) * 360 > 120 && parseFloat(joint.depthY) * 360 < 120+40)){
                        console.log("ik raak het");
                        ctx.beginPath();
                        ctx.fillStyle = "#7DFF00";
                        ctx.fillRect(520, 120, 40, 40);
                        ctx.fill();
                        ctx.closePath();
                        ctx.globalAlpha = 1;
                    }

                    //1 "volglijn" tekenen
                    ctx.beginPath();
                    ctx.fillStyle = "#E88C00";
                    ctx.fillRect(420, 50, 40, 40);
                    ctx.fill();
                    ctx.closePath();
                    ctx.globalAlpha = 1;

                    ctx.beginPath();
                    ctx.fillStyle = "#E88C00";
                    ctx.fillRect(420, 240, 40, 40);
                    ctx.fill();
                    ctx.closePath();
                    ctx.globalAlpha = 1;

                    ctx.beginPath();
                    ctx.globalAlpha= 0.5;
                    ctx.fillStyle = "white";
                    ctx.fillRect(420, 90 ,40 , 150);
                    ctx.fill();
                    ctx.closePath();
                    ctx.globalAlpha = 1;

                    //check for collision joint 11 with "volglijn"
                    if((parseFloat(joint.depthX) * 640 > 420 && parseFloat(joint.depthX) * 640 < 420+40) && (parseFloat(joint.depthY) * 360 > 50 && parseFloat(joint.depthY) * 360 < 240+40)){
                    ctx.beginPath();
                    ctx.fillStyle = "#7DFF00";
                    ctx.fillRect(420, 50, 40, 40);
                    ctx.fill();
                    ctx.closePath();
                    ctx.globalAlpha = 1;

                    ctx.beginPath();
                    ctx.fillStyle = "#7DFF00";
                    ctx.fillRect(420, 240, 40, 40);
                    ctx.fill();
                    ctx.closePath();
                    ctx.globalAlpha = 1;

                    ctx.beginPath();
                    ctx.globalAlpha= 0.5;
                    ctx.fillStyle = "#7DFF00";
                    ctx.fillRect(420, 90 ,40 , 150);
                    ctx.fill();
                    ctx.closePath();
                    ctx.globalAlpha = 1;
                    }



                    //draw hand states
                    updateHandState(body.leftHandState, body.joints[7]);
                    updateHandState(body.rightHandState, body.joints[11]);
                    index++;
                }
            });
        });

        var canvas = <HTMLCanvasElement>document.getElementById('colorframecanvas');
		var ctx = canvas.getContext('2d');

		var colorProcessing = false;
		var colorWorkerThread = new Worker("./assets/colorWorker.js");
		
		colorWorkerThread.addEventListener("message", function (event) {
			if(event.data.message === 'imageReady') {
                ctx.putImageData(event.data.imageData, 0, 0);
                colorProcessing = false;
			}
		});

		colorWorkerThread.postMessage({
			"message": "setImageData",
			"imageData": ctx.createImageData(canvas.width, canvas.height)
		});
		this.ipc.on('colorFrame', function(event,imageBuffer){          
			if(!colorProcessing) {
				colorProcessing = true;
				colorWorkerThread.postMessage({ "message": "processImageData", "imageBuffer": imageBuffer });
			}
		});
        
    }

    ngOnChanges(changes) {
        console.log(changes);
    }


}