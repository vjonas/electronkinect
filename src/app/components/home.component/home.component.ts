import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import { Kinect2 } from 'kinect2';
import { KinectService } from '../../services/kinect.service';
import { DrawCanvasService } from '../../services/drawcanvas.service';
import { DatabaseService } from '../../services/database.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AngularFireAuth } from 'angularfire2';
declare var electron: any;
import { User } from '../../models/user.model';
import { Subject } from 'rxjs/Subject';
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
    private currentExercise = null;
    private userUid: string;
    private exercisesOfCurrentProgram: Array<FullExercise> = new Array<FullExercise>();
    private currentProgram: Program;
    private currentStepNr: number = 0;
    private jointList: KinectJoint[] = new Array<KinectJoint>();;

    constructor(private kinectService: KinectService, private drawcanvasService: DrawCanvasService, private af: AngularFire, private dbService: DatabaseService, private auth: AngularFireAuth) {
        this.ipc = electron.ipcRenderer;
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

    onChangeProgram(newProgramId) {
        //get all the excerciseIds in the currentTraject of the user
        this.exercisesOfCurrentProgram.length = 0;
        //this.excercisesOfCurrentTraject.splice(0,this.excercisesOfCurrentTraject.length);
        Object.keys(this.userdata.programs[newProgramId].exercises).forEach(ex => {
            this.dbService.getExerciseByUid(ex).subscribe(
                ex2 => {
                    this.exercisesOfCurrentProgram.push(ex2);
                }
            )
        });
    }

    onChangeExcercise(newExerciseId) {
        this.loadExcercise(newExerciseId);
    }

    public drawExcercise() {
        this.drawcanvasService.getCurrentStep().subscribe(stepNr => this.currentStepNr = stepNr);
        this.drawcanvasService.drawExcercise(this.excerciseCanvas, this.currentExercise);    
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
                }
        }
    }


    private loadUserData() {
        this.userUid = JSON.parse(localStorage.getItem('currentUser')).uid;
        this.dbService.getUserdataById(this.userUid).subscribe((userData: User) => {
            this.userdata = userData;
            this.currentProgram = userData.programs[userData.currentProgram];
            if (this.userdata.programs != undefined) {
                Object.keys(this.userdata.programs[this.userdata.currentProgram].exercises).forEach(ex => {
                    this.dbService.getExerciseByUid(ex).subscribe(
                        ex2 => {
                            this.exercisesOfCurrentProgram.push(ex2);
                            this.currentExercise = this.exercisesOfCurrentProgram[0];
                        }
                    )
                });
            }
        });
    }

    private loadExcercise(excerciseId) {
        this.exercisesOfCurrentProgram.forEach(ex => {
            if (ex["$key"] == excerciseId)
                this.currentExercise = ex;
        })
    }

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