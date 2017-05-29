import { DrawCanvasService } from './../../services/drawcanvas.service';
import { TimerService } from './../../services/timer.service';
import { UserService } from './../../services/user.service';
import { ExerciseService } from './../../services/exercise.service';
import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import { Kinect2 } from 'kinect2';
declare var electron: any;
import { User } from '../../models/user.model';
import { Exercise } from "app/models/excercise.model";
import { FullExercise } from "app/models/full.excercise.model";
import { Program } from "app/models/program.model";
import { KinectJoint } from "../../models/kinectJoint.model";

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit, AfterViewInit {
    private ipc;
    private bodyFrameCanvas;
    private colorFrameCanvas;
    private excerciseCanvas;
    private userdata: User;
    private currentFullExercise: FullExercise;
    private userUid: string;
    private fullExercisesOfCurrentProgram: Array<FullExercise> = new Array<FullExercise>();
    private exercisesOfCurrentProgram: Array<Exercise> = new Array<Exercise>();
    private currentProgram: Program;
    private currentStepNr: number = 0;
    private jointList: KinectJoint[] = new Array<KinectJoint>();
    private changes: number = 0;
    private timer: number=null;
    private stepDuration: number;

    constructor(private drawcanvasService: DrawCanvasService, private userService: UserService, private exService: ExerciseService, private timerService: TimerService) {
        this.ipc = electron.ipcRenderer;
        this.drawcanvasService.getCurrentStepNr().subscribe(stepNr => {
            this.stepDuration = this.currentFullExercise.steps[stepNr].duration;
        })
    }

    ngOnInit() {
        this.loadUserData();
        this.fillJointList();
    }

    ngAfterViewInit() {
        //declare canvas & context here after the view is loaded. else canvas = null
        this.bodyFrameCanvas = <HTMLCanvasElement>document.getElementById('bodyframecanvas');
        this.colorFrameCanvas = <HTMLCanvasElement>document.getElementById('colorframecanvas');
        this.excerciseCanvas = <HTMLCanvasElement>document.getElementById('exercisecanvas');
        this.drawcanvasService.drawBodyFrame(this.bodyFrameCanvas, false, "");//draw the bodyframe without mock data(skeleton)        
        this.drawcanvasService.drawColorFrame(this.colorFrameCanvas); //draw the colorframe
    }

    public drawExcercise() {
        this.drawcanvasService.getCurrentStepNr().subscribe(stepNr => this.currentStepNr = stepNr);
        this.drawcanvasService.drawExcercise(this.excerciseCanvas, this.currentFullExercise, this.userdata.currentProgram);
    }

    public playMockData(mockExcerciseNr: number) {
        switch (mockExcerciseNr) {
            case 1:
                {
                    this.drawcanvasService.drawBodyFrame(this.bodyFrameCanvas, true, "lefthand-up-and-down");//draw the bodyframe with mock excercise 1  
                    return;
                }
            case 2:
                {
                    this.drawcanvasService.drawBodyFrame(this.bodyFrameCanvas, true, "righthand-up-and-down");
                    return;
                }
            case 3:
                {
                    this.drawcanvasService.drawBodyFrame(this.bodyFrameCanvas, true, "arrow-to-the-knee");
                    return;
                }
            case 4:
                {
                    this.drawcanvasService.drawBodyFrame(this.bodyFrameCanvas, true, "arrow-to-the-knee2");
                    return;
                }
            case 5:
                {
                    this.drawcanvasService.drawBodyFrame(this.bodyFrameCanvas, true, "full-exercise");
                    return;
                }
        }
    }


    private loadUserData() {
        this.userUid = this.userService.getUserId();
        this.userService.getUserdataById(this.userUid).subscribe((userData: User) => {
            this.exercisesOfCurrentProgram.length = 0;
            this.fullExercisesOfCurrentProgram.length = 0;
            this.userdata = userData;
            if (this.userdata.programs != undefined && this.userdata.programs != null) {
                this.currentProgram = userData.programs[userData.currentProgram];
                if (this.userdata.programs[this.userdata.currentProgram].exercises != null) {
                    Object.keys(this.userdata.programs[this.userdata.currentProgram].exercises).forEach((ex) => {
                        this.exercisesOfCurrentProgram.push(this.userdata.programs[this.userdata.currentProgram].exercises[ex]);
                        this.exService.getFullExerciseById(ex).subscribe(
                            (fullExercise: FullExercise) => {
                                this.fullExercisesOfCurrentProgram.push(fullExercise);
                                this.currentFullExercise = this.fullExercisesOfCurrentProgram[0];
                                this.changes++;
                            }
                        )
                    });
                }
            }
        });
    }

    private onNotify(exercise: FullExercise): void {
        this.currentFullExercise = exercise;
        this.drawExcercise();
        this.timer=0;
        this.timerService.getTimerAsObservable().subscribe(timer => {
            //this.timer = timer.toString() + " / " + this.stepDuration;
            this.timer = Number((this.stepDuration-timer).toFixed(2));
        })
    };

    private fillJointList() {
        this.jointList.push(new KinectJoint(0, "Base of the spine"));
        this.jointList.push(new KinectJoint(1, "Middle of the spine"));
        this.jointList.push(new KinectJoint(2, "Neck"));
        this.jointList.push(new KinectJoint(3, "Head"));
        this.jointList.push(new KinectJoint(4, "Left shoulder"));
        this.jointList.push(new KinectJoint(5, "Left elbow"));
        this.jointList.push(new KinectJoint(6, "Left wrist"));
        this.jointList.push(new KinectJoint(7, "Left hand"));
        this.jointList.push(new KinectJoint(8, "Right shoulder"));
        this.jointList.push(new KinectJoint(9, "Right elbow"));
        this.jointList.push(new KinectJoint(10, "Right wrist"));
        this.jointList.push(new KinectJoint(11, "Right hand"));
        this.jointList.push(new KinectJoint(12, "Left hip"));
        this.jointList.push(new KinectJoint(13, "Left knee"));
        this.jointList.push(new KinectJoint(14, "Left ankle"));
        this.jointList.push(new KinectJoint(15, "Left foot"));
        this.jointList.push(new KinectJoint(16, "Right hip"));
        this.jointList.push(new KinectJoint(17, "Right knee"));
        this.jointList.push(new KinectJoint(18, "Right ankle"));
        this.jointList.push(new KinectJoint(19, "Right foot"));
        this.jointList.push(new KinectJoint(20, "Spine at the shoulder"));
        this.jointList.push(new KinectJoint(21, "Tip of the left hand"));
        this.jointList.push(new KinectJoint(22, "Left thumb"));
        this.jointList.push(new KinectJoint(23, "Tip of the right hand"));
        this.jointList.push(new KinectJoint(24, "Right thumb"));
    }
}