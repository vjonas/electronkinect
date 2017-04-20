import { Injectable } from '@angular/core';
import { KinectService } from './kinect.service';

@Injectable()
export class DrawCanvasService {
    private HANDSIZE = 13;
    private HANDCLOSEDCOLOR = "red";
    private HANDOPENCOLOR = "green";
    private HANDLASSOCOLOR = "blue";
    private colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];
    private rightHand = null;

    constructor(private kinectService: KinectService) {
    }

    public drawBodyFrame(bodyFrameCanvas: any) {
        const self = this;
        const bodyFrameCtx = bodyFrameCanvas.getContext('2d');
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];

        this.kinectService.getBodyFrames().subscribe(bodyFrame => {
            bodyFrame = JSON.parse(bodyFrame);
            //main rendering process
            bodyFrameCtx.clearRect(0, 0, bodyFrameCanvas.width, bodyFrameCanvas.height);
            var index = 0;
            bodyFrame.bodies.forEach(function (body) {
                if (body.tracked) {
                    //draw the joints
                    for (var jointType in body.joints) {
                        var joint = body.joints[jointType];
                        bodyFrameCtx.fillStyle = colors[index];
                        bodyFrameCtx.fillRect(joint.depthX * 640, joint.depthY * 360, 5, 5);
                    }
                    index++;
                    self.rightHand = body.joints[11]; //
                    //draw the hands
                    //draw hand states
                    self.updateHandState(body.leftHandState, body.joints[7], bodyFrameCtx);
                    self.updateHandState(body.rightHandState, body.joints[11], bodyFrameCtx);
                };
            })
        });
    }

    public drawColorFrame(colorFrameCanvas: any) {
        const colorFrameCtx = colorFrameCanvas.getContext('2d');
        var colorProcessing = false;
        var colorWorkerThread = new Worker("./assets/colorWorker.js");
        colorWorkerThread.addEventListener("message", function (event) {
            if (event.data.message === 'imageReady') {
                colorFrameCtx.putImageData(event.data.imageData, 0, 0);
                colorProcessing = false;
            }
        });
        colorWorkerThread.postMessage({
            "message": "setImageData",
            "imageData": colorFrameCtx.createImageData(colorFrameCanvas.width, colorFrameCanvas.height)
        });
        this.kinectService.getColorFrames().subscribe(imageBuffer => {
            if (!colorProcessing) {
                colorProcessing = true;
                colorWorkerThread.postMessage({ "message": "processImageData", "imageBuffer": imageBuffer });
            }
        });
    }

    //function updatehandstate to draw the bodyFrame
    private updateHandState(handState, jointPoint, bodyFrameCtx) {
        switch (handState) {
            case 3:
                this.drawHand(jointPoint, this.HANDCLOSEDCOLOR, bodyFrameCtx);
                break;
            case 2:
                this.drawHand(jointPoint, this.HANDOPENCOLOR, bodyFrameCtx);
                break;
            case 4:
                this.drawHand(jointPoint, this.HANDLASSOCOLOR, bodyFrameCtx);
                break;
        }
    }

    //function drawhand to draw the bodyFrame
    private drawHand(jointPoint, handColor, bodyFrameCtx) {
        // draw semi transparent hand cicles
        bodyFrameCtx.globalAlpha = 0.75;
        bodyFrameCtx.beginPath();
        bodyFrameCtx.fillStyle = handColor;
        bodyFrameCtx.arc(jointPoint.depthX * 640, jointPoint.depthY * 360, this.HANDSIZE, 0, Math.PI * 2, true);
        bodyFrameCtx.fill();
        bodyFrameCtx.closePath();
        bodyFrameCtx.globalAlpha = 1;
    }

    public drawExcercise(bodyFrameCanvas: any) {
        const self = this;
        const ctx = bodyFrameCanvas.getContext('2d');
        ctx.fillStyle = "#E88C00 ";
        ctx.fillRect(520, 120, 40, 40);
        ctx.fill();
        ctx.closePath();
        ctx.globalAlpha = 1;
        //check for collision joint 11 and green thingy with 30 FPS
        setInterval(function () {
                if (self.rightHand != null && (parseFloat(self.rightHand.depthX) * 640 > 520 && parseFloat(self.rightHand.depthX) * 640 < 520 + 40) && (parseFloat(self.rightHand.depthY) * 360 > 120 && parseFloat(self.rightHand.depthY) * 360 < 120 + 40)) {
                    console.log("ik raak het");
                    ctx.beginPath();
                    ctx.fillStyle = "#7DFF00 ";
                    ctx.fillRect(520, 120, 40, 40);
                    ctx.fill();
                    ctx.closePath();
                    ctx.globalAlpha = 1;
            }
            console.log(self.rightHand)
        }, 1000 / 30);
    }
}