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
    private item: FirebaseObjectObservable<any>;
    private items: any;
    private userdata: User;
    private oefeningNr = new Subject();
    private exerciseObservable;
    private currentExercise = null;
    private userUid: string;
    private exercisesOfCurrentProgram: Array<FullExercise> = new Array<FullExercise>();

    constructor(private kinectService: KinectService, private drawcanvasService: DrawCanvasService, private af: AngularFire, private dbService: DatabaseService, private auth: AngularFireAuth) {
        this.ipc = electron.ipcRenderer;
    }

    ngOnInit() {
        this.loadUserData();
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
        console.log(newExerciseId);
        this.loadExcercise(newExerciseId);
    }

    public drawExcercise() {
        //KINECT OPZETTEN
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
                    this.drawcanvasService.drawBodyFrame(this.bodyFrameCanvas,true,"arrow-to-the-knee");
                }
        }
    }


    private loadUserData() {
        //get all the data of the currentUser
        this.userUid = JSON.parse(localStorage.getItem('currentUser')).uid;
        this.dbService.getUserdataById(this.userUid).subscribe((userData) => {
            this.userdata = userData;
            //get all the excerciseIds in the currentTraject of the user
            Object.keys(this.userdata.programs[this.userdata.currentProgram].exercises).forEach(ex => {
                this.dbService.getExerciseByUid(ex).subscribe(
                    ex2 => {
                        console.log("loaduserdata");
                        console.log(ex2);
                        this.exercisesOfCurrentProgram.push(ex2);
                        this.currentExercise = this.exercisesOfCurrentProgram[0];
                    }
                )
            });
        });
    }

    private loadExcercise(excerciseId) {
        this.exercisesOfCurrentProgram.forEach(ex => {
            if (ex["$key"] == excerciseId)
                this.currentExercise = ex;
        })
    }
}