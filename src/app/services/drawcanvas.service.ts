import { Injectable } from '@angular/core';
import { KinectService } from './kinect.service';

@Injectable()
export class DrawCanvasService {
    private HANDSIZE = 13;
    private HANDCLOSEDCOLOR = "red";
    private HANDOPENCOLOR = "green";
    private HANDLASSOCOLOR = "blue";
    private colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];
    private joints=null; //array with all joints (25)

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
                    self.joints=body.joints; //save all joints to class variable
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
        const excercise = `{
    "name":"exrightshoulder",
    "positions":[
        {
            "x":520,
            "y":120,
            "w":40,
            "h":40,
            "style":"#E88C00",
            "jointtype":11
        },
        {
            "x":420,
            "y":90,
            "w":40,
            "h":150,
            "style":"#FFFFFF",
            "jointtype":21
        }
    ]
}`
        const steps = JSON.parse(excercise);
        steps.positions.forEach((step) => {
            ctx.fillStyle = step.style;
            ctx.fillRect(step.x, step.y, step.w, step.h);
            ctx.fill();
        })

        ///check for collision joint 11 and green thingy with 30 FPS
        setInterval(function () {
            steps.positions.forEach((step) => {
                if (self.joints != null && (parseFloat(self.joints[step.jointtype].depthX) * 640 > step.x && parseFloat(self.joints[step.jointtype].depthX) * 640 < step.x + step.w) && (parseFloat(self.joints[step.jointtype].depthY) * 360 > step.y && parseFloat(self.joints[step.jointtype].depthY) * 360 < step.y + step.h)) {
                    ctx.fillStyle = "#7DFF00";
                    ctx.fillRect(step.x, step.y, step.w, step.h);
                    ctx.fill();
                }
                else {
                    ctx.fillStyle = step.style;
                    ctx.fillRect(step.x, step.y, step.w, step.h);
                    ctx.fill();
                }
            })
        }, 1000 / 30);
    }
}