import { Injectable } from '@angular/core';
import { KinectService } from './kinect.service';
import { FullExercise } from "app/models/full.excercise.model";
import { Step } from "app/models/step.model";
import Bezier from 'bezier-js';

@Injectable()
export class DrawCanvasService {
    private HANDSIZE = 13;
    private HANDCLOSEDCOLOR = "red";
    private HANDOPENCOLOR = "green";
    private HANDLASSOCOLOR = "blue";
    private colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];
    private joints = null; //array with all recognised joints (25)
    private intervalOfCurrentExcercise = null;
    private stepColors: string[] = new Array();
    private currentStepNr: number = 0;

    constructor(private kinectService: KinectService) {
    }

    /**
         * param2: boolean to set when playing mockdata
         * param3: filename without .json that needs to be played
         */
    public drawBodyFrame(bodyFrameCanvas: any, mock: boolean, fileName: string) {
        const self = this;
        const bodyFrameCtx = bodyFrameCanvas.getContext('2d');
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];
        this.kinectService.getBodyFrames(mock, fileName).subscribe(bodyFrame => {
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

    public drawExcercise(excerciseCanvas: any, newExcercise: FullExercise) {
        const self = this;
        const ctx = excerciseCanvas.getContext('2d');
        //var counter: number = 0;        
        this.stepColors = new Array();
        this.currentStepNr = 0;
        const steps = newExcercise.steps;
        //clear the current excercise if a new one is started
        if (this.intervalOfCurrentExcercise != null) {
            clearInterval(this.intervalOfCurrentExcercise);
            ctx.clearRect(0, 0, excerciseCanvas.width, excerciseCanvas.height);
        }
        //loop over every step in the excercise and define the right color
        newExcercise.steps.forEach((step, counter) => {
            if (counter == 0) {
                this.stepColors.push("#E88C00");
            }
            else {
                this.stepColors.push("#FFFFFF");
            }
            //the first step begins with color orange, the next step(s) are white. when the first step is done it becomes green and the next step will become orange.
            //check if the step is a TouchPoint or a TrackingLine
            if (step.stepType == 0)
                this.drawTouchPoint(step, ctx, this.stepColors[counter]);
            else
                this.drawTrackingLine(step, ctx);
            //counter++;
        })
        ///check for collision with a kinect-joint and a point in the excercise with 30 FPS        
        this.intervalOfCurrentExcercise = setInterval(function () {
            var i = 0;
            newExcercise.steps.forEach((step, index) => {
                //check if the step is a TouchPoint or TrackingLine then do collision detection
                if (step.stepNr == self.currentStepNr && self.joints != null && step.stepType == 0)
                    self.detectCollisionWithTouchPoint(step, index, i, steps, ctx, excerciseCanvas);
                else
                    self.detectCollisionWithTrackingLine(step, index, i, steps, ctx, excerciseCanvas);
                //i++;

                /*if (self.joints != null
                    && ((parseFloat(self.joints[step.jointType].depthX) * ctx.canvas.width > step.x)
                        && step.stepNr == currentStepNr
                        && 
                        )) {*/
                i++;
            })
        }, 1000 / 30);
    }

    private drawTouchPoint(step: Step, context: any, color: string) {
        context.beginPath();
        context.arc(step.x0, step.y0, step.radius, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.fill();
        context.closePath();
    }

    private drawTrackingLine(step: Step, context: any) {
        context.beginPath();
        context.moveTo(step.x0, step.y0);
        context.bezierCurveTo(step.x1, step.y1, step.x2, step.y2, step.x3, step.y3);
        context.lineWidth = 2;
        context.strokeStyle = 'white';
        context.stroke();
        context.closePath();
    }

    private detectCollisionWithTouchPoint(step: Step, index, i, steps, ctx, canvas: HTMLCanvasElement) {
        var mousex = this.joints[step.jointType].depthX * canvas.width;
        var mousey = this.joints[step.jointType].depthY * canvas.height;
        //calculate the distance between the circle and the mousepointer            
        var distance = Math.sqrt((mousex - step.x0) * (mousex - step.x0) + (mousey - step.y0) * (mousey - step.y0));
        console.log("jointtype:" + step.jointType + " mousex:" + mousex + " mousey:" + mousey + " distance:" + distance + " radius:" + step.radius);
        if (distance < step.radius) //you may drag the circle now
        {
            this.stepColors[i] = "#7DFF00"; //if currentStep is achieved -> set color green.
            if (this.stepColors[i + 1] != null) { //if there is a next step, set the next step to orange
                this.stepColors[i + 1] = "#E88C00";
                this.drawTouchPoint(steps[index + 1], ctx, this.stepColors[i + 1]);
            }
            //if currentStep is achieved -> set color green.            
            this.drawTouchPoint(step, ctx, this.stepColors[i]);
            this.currentStepNr++;
        }
    }

    private detectCollisionWithTrackingLine(step: Step, index, i, steps, ctx, canvas: HTMLCanvasElement) {
        var mouseX = this.joints[step.jointType].depthX * canvas.width;
        var mouseY = this.joints[step.jointType].depthY * canvas.height;
        //calculate the distance between the circle and the mousepointer
        //calculate the bezier-distance
        var curve: Bezier = new Bezier(step.x0, step.y0, step.x1, step.y1, step.x2, step.y2, step.x3, step.y3);
        var mouseCoordinates = { x: mouseX, y: mouseY };
        var distanceOfJoint = curve.project(mouseCoordinates);
        //user has to stay between the trackingLineOffset
        if (distanceOfJoint.d < step.trackingLineOffset) {
             console.log("inside the offset");

        }
        //console.log("jointtype:" + step.jointType + " mousex:" + mouseX + " mousey:" + mouseY + " distance:" + distanceOfJoint.d + " trackinglineOffset:" + step.trackingLineOffset);

        /*this.stepColors[i] = "#7DFF00"; //if currentStep is achieved -> set color green.
        if (this.stepColors[i + 1] != null) { //if there is a next step, set the next step to orange
            this.stepColors[i + 1] = "#E88C00";
            this.drawTouchPoint(steps[index + 1], ctx, this.stepColors[i + 1]);
        }
        //if currentStep is achieved -> set color green.            
        this.drawTouchPoint(step, ctx, this.stepColors[i]);
        this.currentStepNr++;*/

    }
}