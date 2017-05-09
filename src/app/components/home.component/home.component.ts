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
import { FullExcercise } from "app/models/full.excercise.model";

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
    private excerciseObservable;
    private currentExcercise = null;
    private userUid: string;
    private excercisesOfCurrentTraject: Array<FullExcercise> = new Array<FullExcercise>();

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
        this.excerciseCanvas = <HTMLCanvasElement>document.getElementById('excercisecanvas');
        this.drawcanvasService.drawBodyFrame(this.bodyFrameCanvas, false, "");//draw the bodyframe without mock data(skeleton)        
        this.drawcanvasService.drawColorFrame(this.colorFrameCanvas); //draw the colorframe

    }

    onChangeTraject(newTrajectId) {
        //get all the excerciseIds in the currentTraject of the user
        this.excercisesOfCurrentTraject.length = 0;
        //this.excercisesOfCurrentTraject.splice(0,this.excercisesOfCurrentTraject.length);
        this.userdata.traject[newTrajectId].exercises.forEach(ex => {
            this.dbService.getExerciseByUid(ex.exerciseid).subscribe(
                ex2 => {
                    this.excercisesOfCurrentTraject.push(ex2[0]);
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
        this.drawcanvasService.drawExcercise(this.excerciseCanvas, this.currentExcercise);
    }

    public playMockData(mockExcerciseNr: number) {
        switch (mockExcerciseNr) {
            case 1: {
                this.drawcanvasService.drawBodyFrame(this.bodyFrameCanvas, true, "lefthand-up-and-down");//draw the bodyframe with mock excercise 1  
                return;
            }
            case 2:
                {
                    this.drawcanvasService.drawBodyFrame(this.bodyFrameCanvas, true, "righthand-up-and-down");
                    return;
                }
        }
    }


    private loadUserData() {
        //get all the data of the currentUser
        this.userUid = JSON.parse(localStorage.getItem('currentUser')).uid;
        this.dbService.getUserdataById(this.userUid).subscribe((userDate) => {
            this.userdata = userDate[0]; //returns array of users, which contains 1 user
            console.log("loaduserdata");
            console.log(userDate);
            console.log(this.userdata.traject);
            //get all the excerciseIds in the currentTraject of the user
            this.userdata.traject[this.userdata.currenttraject].exercises.forEach(ex => {
                this.dbService.getExerciseByUid(ex.exerciseid).subscribe(
                    ex2 => {
                        this.excercisesOfCurrentTraject.push(ex2);
                        this.currentExcercise = this.excercisesOfCurrentTraject[0];
                    }
                )
            });


        });
    }

    private loadExcercise(excerciseId) {
        this.excercisesOfCurrentTraject.forEach(ex => {
            if (ex.excerciseid == excerciseId)
                this.currentExcercise = ex;
        })
    }
}