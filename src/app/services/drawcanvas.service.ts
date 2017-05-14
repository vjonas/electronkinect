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
    private COLOR_ACTION_CURRENT = "#E88C00";
    private COLOR_ACTION_NEXT = "rgba(255,255,255,0.1)";
    private COLOR_ACTION_COMPLETED = "#7DFF00";
    private colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];
    private joints = null; //array with all recognised joints (25)
    private intervalOfCurrentExcercise = null;
    private stepColors: string[] = new Array();
    private currentStepNr: number = 0;
    private ctx;
    private hasToFollowTrackingLine: boolean;

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
        this.ctx = excerciseCanvas.getContext('2d');
        this.stepColors = new Array();
        this.currentStepNr = 0;
        const steps = newExcercise.steps;
        //clear the current excercise if a new one is started
        if (this.intervalOfCurrentExcercise != null) {
            clearInterval(this.intervalOfCurrentExcercise);
            this.ctx.clearRect(0, 0, excerciseCanvas.width, excerciseCanvas.height);
        }
        //loop over every step in the excercise and define the right color
        this.initializeExercise(newExcercise);
        ///check for collision with a kinect-joint and a point in the excercise with 30 FPS        
        this.intervalOfCurrentExcercise = setInterval(function () {
            newExcercise.steps.forEach((step, index) => {
                //check if the step is a TouchPoint or TrackingLine then do collision detection
                console.log(self.currentStepNr);
                if (step.stepNr == self.currentStepNr && self.joints != null) {
                    if (step.stepType == 0)
                        self.detectCollisionWithTouchPoint(step, index, steps, excerciseCanvas, false);
                    else if (step.stepType == 1)
                        self.detectCollisionWithTrackingLine(step, index, steps, excerciseCanvas);
                    else if (step.stepType == 2) {
                        self.detectCollisionWithTouchPoint(step, index, steps, excerciseCanvas, true);
                    }
                }
                if (self.currentStepNr >= newExcercise.steps.length)
                    clearInterval(self.intervalOfCurrentExcercise);
            })
        }, 1000 / 30);
    }

    private drawTouchPoint(x: number, y: number, radius: number, color: string) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    private drawTrackingLine(step: Step, lineColor: string) {
        this.ctx.beginPath();
        this.ctx.moveTo(step.x0, step.y0);
        this.ctx.bezierCurveTo(step.x1, step.y1, step.x2, step.y2, step.x3, step.y3);
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = lineColor;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    private detectCollisionWithTouchPoint(step: Step, index, steps, canvas: HTMLCanvasElement, hasSecondTouchPoint: boolean) {
        var mousex = this.joints[step.jointType].depthX * canvas.width;
        var mousey = this.joints[step.jointType].depthY * canvas.height;
        //calculate the distance between the circle and the mousepointer            
        var distanceToFirstTrackingPoint = Math.sqrt((mousex - step.x0) * (mousex - step.x0) + (mousey - step.y0) * (mousey - step.y0));
        var distanceToSecondTrackingPoint = Math.sqrt((mousex - step.x1) * (mousex - step.x1) + (mousey - step.y1) * (mousey - step.y1));
        console.log(hasSecondTouchPoint);
        if (hasSecondTouchPoint) {
            if (distanceToFirstTrackingPoint < step.radius) //you may drag the circle now
            {
                this.drawTouchPoint(step.x0, step.y0, step.radius, this.COLOR_ACTION_COMPLETED);
            } else
                this.drawTouchPoint(step.x0, step.y0, step.radius, this.COLOR_ACTION_CURRENT);
            if (distanceToSecondTrackingPoint < step.radius) {
                this.drawTouchPoint(step.x1, step.y1, step.radius, this.COLOR_ACTION_COMPLETED);
            }
            else
                this.drawTouchPoint(step.x1, step.y1, step.radius, this.COLOR_ACTION_CURRENT);
            if (distanceToSecondTrackingPoint < step.radius && distanceToFirstTrackingPoint < step.radius) {
                this.drawTouchPoint(step.x0, step.y0, step.radius, this.COLOR_ACTION_COMPLETED);
                this.drawTouchPoint(step.x1, step.y1, step.radius, this.COLOR_ACTION_COMPLETED);
                if (steps[index + 1] != null) {
                    this.drawTouchPoint(steps[index + 1].x0, steps[index + 1].y0, steps[index + 1].radius, this.COLOR_ACTION_CURRENT);
                }
                this.currentStepNr++;
            }
        }
        else {
            console.log("no second touchpoint if")
            if (distanceToFirstTrackingPoint < step.radius) //you may drag the circle now
            {
                this.drawTouchPoint(step.x0, step.y0, step.radius, this.COLOR_ACTION_COMPLETED);
                if (steps[index + 1] != null) {
                    this.drawTouchPoint(steps[index + 1].x0, steps[index + 1].y0, steps[index + 1].radius, this.COLOR_ACTION_CURRENT);
                }
                this.currentStepNr++;
            }
        }
    }

    private detectCollisionWithTrackingLine(step: Step, index, steps, canvas: HTMLCanvasElement) {
        var mouseX = this.joints[step.jointType].depthX * canvas.width;
        var mouseY = this.joints[step.jointType].depthY * canvas.height;
        //calculate the distance between the circle and the mousepointer
        //calculate the bezier-distance
        var curve: Bezier = new Bezier(step.x0, step.y0, step.x1, step.y1, step.x2, step.y2, step.x3, step.y3);
        var mouseCoordinates = { x: mouseX, y: mouseY };
        var distanceOfJointFromTrackingLine = curve.project(mouseCoordinates);
        var distanceFromStartingPoint = Math.sqrt((mouseX - step.x0) * (mouseX - step.x0) + (mouseY - step.y0) * (mouseY - step.y0));
        var distanceFromEndingPoint = Math.sqrt((mouseX - step.x3) * (mouseX - step.x3) + (mouseY - step.y3) * (mouseY - step.y3));
        //First check if the user touched the starting point of the TrackingLine
        if (distanceFromStartingPoint < step.radius) {
            this.drawTrackingLine(step, this.COLOR_ACTION_CURRENT);
            this.drawTouchPoint(step.x0, step.y0, step.radius, this.COLOR_ACTION_COMPLETED);
            this.drawTouchPoint(step.x3, step.y3, step.radius, this.COLOR_ACTION_NEXT);
            this.hasToFollowTrackingLine = true;
        } else if (distanceFromStartingPoint < step.radius && !this.hasToFollowTrackingLine) {
            this.drawTrackingLine(step, this.COLOR_ACTION_NEXT);
            this.drawTouchPoint(step.x0, step.y0, step.radius, this.COLOR_ACTION_COMPLETED);
            this.drawTouchPoint(step.x3, step.y3, step.radius, this.COLOR_ACTION_NEXT);
            this.hasToFollowTrackingLine = true;
        }
        //user has to stay between the TrackingLineOffset
        if (distanceOfJointFromTrackingLine.d < step.trackingLineOffset && this.hasToFollowTrackingLine) {
            //check if the user touches the endpoint and completed the TrackingLine => step IS COMPLETE!!
            if (distanceFromEndingPoint < step.radius) {
                this.drawTrackingLine(step, this.COLOR_ACTION_COMPLETED);
                this.drawTouchPoint(step.x3, step.y3, step.radius, this.COLOR_ACTION_COMPLETED);
                if (steps[index + 1] != null) {
                    this.drawTouchPoint(steps[index + 1].x0, steps[index + 1].y0, steps[index + 1].radius, this.COLOR_ACTION_CURRENT);
                }
                this.hasToFollowTrackingLine = false;
                this.currentStepNr++;
            }
        }
        else if (distanceOfJointFromTrackingLine.d > step.trackingLineOffset && this.hasToFollowTrackingLine) {
            //if the user is out of reach from the offset => reset the TrackingLine step. The user now has to retry the step.
            this.drawTrackingLine(step, "white");
            this.drawTouchPoint(step.x0, step.y0, step.radius, this.COLOR_ACTION_CURRENT);
            this.drawTouchPoint(step.x3, step.y3, step.radius, this.COLOR_ACTION_NEXT);
            this.hasToFollowTrackingLine = false;
        }
    }

    private initializeExercise(exercise: FullExercise) {
        exercise.steps.forEach((step, stepNr) => {
            if (step.stepType == 0) {
                if (stepNr <= 0)
                    this.drawTouchPoint(step.x0, step.y0, step.radius, this.COLOR_ACTION_CURRENT);
                else
                    this.drawTouchPoint(step.x0, step.y0, step.radius, this.COLOR_ACTION_NEXT);
            }
            else if (step.stepType == 1) {
                this.drawTrackingLine(step, this.COLOR_ACTION_NEXT);
                if (stepNr <= 0)
                    this.drawTouchPoint(step.x0, step.y0, step.radius, this.COLOR_ACTION_CURRENT);
                else
                    this.drawTouchPoint(step.x0, step.y0, step.radius, this.COLOR_ACTION_NEXT);
            }
            else if (step.stepType == 2) {
                if (stepNr <= 0)
                    this.drawTouchPoint(step.x0, step.y0, step.radius, this.COLOR_ACTION_CURRENT);
                else
                    this.drawTouchPoint(step.x1, step.y1, step.radius, this.COLOR_ACTION_CURRENT);
            }
        });
    }
}