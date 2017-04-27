import { Injectable } from '@angular/core';
import { KinectService } from './kinect.service';

@Injectable()
export class DrawCanvasService {
    private HANDSIZE = 13;
    private HANDCLOSEDCOLOR = "red";
    private HANDOPENCOLOR = "green";
    private HANDLASSOCOLOR = "blue";
    private colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];
    private joints = null; //array with all recognised joints (25)

    constructor(private kinectService: KinectService) {
    }

    public drawBodyFrame(bodyFrameCanvas: any) {
        const self = this;
        const bodyFrameCtx = bodyFrameCanvas.getContext('2d');
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];

        //set mockdata true
        this.kinectService.getBodyFrames(true).subscribe(bodyFrame => {
            bodyFrame = JSON.parse(bodyFrame);
            console.log("drawcanvasService");
            //main rendering process
            bodyFrameCtx.clearRect(0, 0, bodyFrameCanvas.width, bodyFrameCanvas.height);
            var index = 0;
            bodyFrame.bodies.forEach(function (body) {
                if (body.tracked) {
                    //draw the joints
                    for (var jointType in body.joints) {
                        var joint = body.joints[jointType];
                        bodyFrameCtx.fillStyle = colors[index];
                        bodyFrameCtx.fillRect(joint.depthX * bodyFrameCtx.canvas.width, joint.depthY * bodyFrameCtx.canvas.height, 5, 5);
                    }
                    index++;
                    self.joints = body.joints; //save all joints to class variable
                    self.joints.push(body.bodyIndex);
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
            "imageData": colorFrameCtx.createImageData(colorFrameCtx.canvas.width, colorFrameCtx.canvas.height)
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
        bodyFrameCtx.arc(jointPoint.depthX * bodyFrameCtx.canvas.width, jointPoint.depthY * bodyFrameCtx.canvas.height, this.HANDSIZE, 0, Math.PI * 2, true);
        bodyFrameCtx.fill();
        bodyFrameCtx.closePath();
        bodyFrameCtx.globalAlpha = 1;
    }

    public drawExcercise(excerciseCanvas: any) {
        const self = this;
        const ctx = excerciseCanvas.getContext('2d');
        var counter: number = 0;
        var currentStepNr: number = 0;
        var stepColors: string[] = new Array();
        const excercise = `{
    "name":"exrightshoulder",
    "positions":[
        {
            "stepnr":0,
            "x":520,
            "y":120,
            "w":40,
            "h":40,
            "style":"#E88C00",
            "jointtype":11
        },
        {
            "stepnr":1,
            "x":420,
            "y":90,
            "w":40,
            "h":150,
            "style":"#FFFFFF",
            "jointtype":21
        },{
            "stepnr":2,
            "x":420,
            "y":240,
            "w":40,
            "h":40,
            "style":"#FFFFFF",
            "jointtype":21
        }
        
    ]
}`
        const steps = JSON.parse(excercise); //loop over every step in the excercise and define the right color
        steps.positions.forEach((step) => {
            if (counter == 0) {
                stepColors.push("#E88C00");
            }
            else {
                stepColors.push("#FFFFFF");
            }
            //the first step begins with color orange, the next step(s) are white. when the first step is done it becomes green and the next step will become orange.
            ctx.fillStyle = stepColors[counter];
            ctx.fillRect(step.x, step.y, step.w, step.h);
            ctx.fill();
            counter++;
        })
        ///check for collision with a kinect-joint and a point in the excercise with 30 FPS
        setInterval(function () {
            var i = 0;
            steps.positions.forEach((step, index) => {
                if (self.joints != null &&
                    (parseFloat(self.joints[step.jointtype].depthX) * ctx.canvas.width > step.x &&
                        parseFloat(self.joints[step.jointtype].depthX) * ctx.canvas.width < step.x + step.w) &&
                    (parseFloat(self.joints[step.jointtype].depthY) * ctx.canvas.height > step.y &&
                        parseFloat(self.joints[step.jointtype].depthY) * ctx.canvas.height < step.y + step.h &&
                        step.stepnr == currentStepNr)) {
                    stepColors[i] = "#7DFF00"; //if currentStep is achieved -> set color green.
                    if (stepColors[i + 1] != null) { //if there is a next step, set the next step to orange
                        stepColors[i + 1] = "#E88C00";
                        ctx.fillStyle = stepColors[i + 1]; //if currentStep is achieved -> set color green.
                        ctx.fillRect(steps.positions[index + 1].x, steps.positions[index + 1].y, steps.positions[index + 1].w, steps.positions[index + 1].h);
                        ctx.fill();
                    } //set the color of next step to orange                     
                    ctx.fillStyle = stepColors[i]; //if currentStep is achieved -> set color green.
                    ctx.fillRect(step.x, step.y, step.w, step.h);
                    ctx.fill();
                    currentStepNr++;
                    i++;
                }
                i++;
            })
        }, 1000 / 30);
    }
}