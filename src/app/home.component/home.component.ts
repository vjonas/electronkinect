import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
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
            //declaring the needed variables
            // handstate circle size
            var HANDSIZE = 20;
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
                        ctx.fillRect(joint.depthX * 640, joint.depthY * 360, 10, 10);
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