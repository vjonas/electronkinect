import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import { Kinect2 } from 'kinect2';
import { KinectService } from '../../services/kinect.service';
import { DrawCanvasService } from '../../services/drawcanvas.service';
import { DatabaseService } from '../../services/database.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AngularFireAuth } from 'angularfire2';
declare var electron: any;
import { User } from '../../models/user.model';
import { Subject } from 'rxjs/Subject';
import { Excercise } from "app/models/excercise.model";
import { FullExcercise } from "app/models/full.excercise.model";

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
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
    private currentExcercise=null;
    private userUid: string;
    private excercisesOfCurrentTraject: Array<FullExcercise> = new Array<FullExcercise>();

    constructor(private kinectService: KinectService, private drawcanvasService: DrawCanvasService, private af: AngularFire, private dbService: DatabaseService, private auth: AngularFireAuth) {
        this.ipc = electron.ipcRenderer;
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        //declare canvas & context here after the view is loaded. else canvas = null
        this.bodyFrameCanvas = <HTMLCanvasElement>document.getElementById('bodyframecanvas');
        this.colorFrameCanvas = <HTMLCanvasElement>document.getElementById('colorframecanvas');
        this.excerciseCanvas = <HTMLCanvasElement>document.getElementById('excercisecanvas');
        this.drawcanvasService.drawBodyFrame(this.bodyFrameCanvas, false, "");//draw the bodyframe without mock data(skeleton)        
        this.drawcanvasService.drawColorFrame(this.colorFrameCanvas); //draw the colorframe
        this.loadUserData();
    }

    onChangeTraject(newTrajectId) {
        //get all the excerciseIds in the currentTraject of the user
        this.excercisesOfCurrentTraject.length = 0;
        //this.excercisesOfCurrentTraject.splice(0,this.excercisesOfCurrentTraject.length);
        this.userdata.traject[newTrajectId].excercises.forEach(ex => {
            this.dbService.getExcerciseById(ex.excerciseid).subscribe(
                ex2 => {
                    this.excercisesOfCurrentTraject.push(ex2[0]);
                }
            )
        });
    }

    onChangeExcercise(newExerciseId)
    {
        this.loadExcercise(newExerciseId);        
    }

    public drawExcercise() {
        this.drawcanvasService.drawExcercise(this.excerciseCanvas,this.currentExcercise);
    }

    public playMockData(mockExcerciseNr: number) {
        switch (mockExcerciseNr) {
            case 1: {
                this.drawcanvasService.drawBodyFrame(this.bodyFrameCanvas, true, "linkerhand-op-en-neer");//draw the bodyframe with mock excercise 1  
                return;
            }
            case 2:
                {
                    this.drawcanvasService.drawBodyFrame(this.bodyFrameCanvas, true, "rechterhand-op-en-neer");
                    return;
                }
        }
    }


    private loadUserData() {
        //get all the data of the currentUser
        this.userUid = JSON.parse(localStorage.getItem('currentUser')).uid;
        this.dbService.getUserdataById(this.userUid).subscribe((userDate) => {
            this.userdata = userDate[0]; //returns array of users, which contains 1 user
            //get all the excerciseIds in the currentTraject of the user
            this.userdata.traject[this.userdata.currenttraject].excercises.forEach(ex => {
                this.dbService.getExcerciseById(ex.excerciseid).subscribe(
                    ex2 => {
                        this.excercisesOfCurrentTraject.push(ex2[0]);
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