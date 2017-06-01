import { CompletedExercise } from 'app/models/completed.exercise.model';
import { DrawCanvasService } from './../../services/drawcanvas.service';
import { TimerService } from './../../services/timer.service';
import { UserService } from './../../services/user.service';
import { ExerciseService } from './../../services/exercise.service';
import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kinect2 } from 'kinect2';
declare var electron: any;
declare var webcam: any
import { User } from '../../models/user.model';
import { Exercise } from "app/models/excercise.model";
import { FullExercise } from "app/models/full.excercise.model";
import { Program } from "app/models/program.model";
import { KinectJoint } from "../../models/kinectJoint.model";
import { JointService } from "../../services/joint.service";
import { Webcam } from 'webcamjs';


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
    private timer: number = null;
    private stepDuration: number;
    private completedExercise:CompletedExercise;


    constructor(private router: Router, private drawcanvasService: DrawCanvasService, private userService: UserService, private exService: ExerciseService, private timerService: TimerService, private _jointService: JointService) {
        this.ipc = electron.ipcRenderer;
        this.drawcanvasService.getCurrentStepNr().subscribe(stepNr => {
            console.log(stepNr);
            if (this.currentFullExercise.steps[stepNr] != null && this.currentFullExercise.steps[stepNr] != undefined) {
                this.stepDuration = this.currentFullExercise.steps[stepNr].duration;
            }
        })
    }

    ngOnInit() {
        this.loadUserData();
        this.getJointList();
    }

    ngAfterViewInit() {
        this.bodyFrameCanvas = <HTMLCanvasElement>document.getElementById('bodyframecanvas');
        this.colorFrameCanvas = <HTMLCanvasElement>document.getElementById('colorframecanvas');
        this.excerciseCanvas = <HTMLCanvasElement>document.getElementById('exercisecanvas');
        this.drawcanvasService.drawBodyFrame(this.bodyFrameCanvas, false, "");//draw the bodyframe without mock data(skeleton) 
        this.exService.getCompletedExercise().subscribe(completedExercise=>
        {
            this.completedExercise=completedExercise;
        })       
        this.getColorFeed();

    }

    public drawExcercise() {
        this.drawcanvasService.getCurrentStepNr().subscribe(stepNr => this.currentStepNr = stepNr);
        this.drawcanvasService.drawExcercise(this.excerciseCanvas, this.currentFullExercise, this.userdata.currentProgram);
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
            else {
                this.router.navigateByUrl('/no-program');
            }
        });
    }

    private onNotify(exercise: FullExercise): void {
        this.currentFullExercise = exercise;
        this.drawExcercise();
        this.timer = 0;
        this.timerService.getTimerAsObservable().subscribe(timer => {
            //this.timer = timer.toString() + " / " + this.stepDuration;
            this.timer = Number((this.stepDuration - timer).toFixed(2));
        })
    };

    private getJointList() {
        this.jointList = this._jointService.getJointList();
    }

    private getColorFeed() {
        webcam.set({
            width: 960,
            height: 540
        });
        webcam.attach('#webcam');
    }
}