import { Component, OnInit, Input, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
declare var electron: any;

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit, OnChanges, AfterViewInit {
    @ViewChild('kinectcanvas') canvasElement;
    private ctx;
    private ipc;

    constructor() {
        this.ipc = electron.ipcRenderer;
    }


    ngOnInit() {
    }
    ngAfterViewInit() {
        console.log(this.canvasElement);
        this.ctx = this.canvasElement.nativeElement.getContext('2d');
        console.log("voor de ON methode:" + this.ctx);       
        this.ipc.on('bodyframe', function (event, bodyFrame) {            
            //variables
            // handstate circle size
            var HANDSIZE = 20;
            // closed hand state color
            var HANDCLOSEDCOLOR = "red";
            // open hand state color
            var HANDOPENCOLOR = "green";
            // lasso hand state color
            var HANDLASSOCOLOR = "blue";
            var canvas = <HTMLCanvasElement>document.getElementById('bodyCanvas');
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
               ctx.arc(jointPoint.depthX * 512, jointPoint.depthY * 424, HANDSIZE, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.closePath();
                ctx.globalAlpha = 1;
            }

            //main rendering process
            console.log(JSON.parse(bodyFrame));
            bodyFrame = JSON.parse(bodyFrame);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var index = 0;
            bodyFrame.bodies.forEach(function (body) {
                if (body.tracked) {
                    for (var jointType in body.joints) {
                        var joint = body.joints[jointType];
                        ctx.fillStyle = colors[index];
                        ctx.fillRect(joint.depthX * 512, joint.depthY * 424, 10, 10);
                    }
                    //draw hand states
                    updateHandState(body.leftHandState, body.joints[7]);
                    updateHandState(body.rightHandState, body.joints[11]);
                    index++;
                }
            });
            console.log("homecomponent - ipcrenderer method")
        });
    }

    ngOnChanges(changes) {
        console.log(changes);
    }


}