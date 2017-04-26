import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import { Kinect2 } from 'kinect2';
import { KinectService } from '../../services/kinect.service';
import { DrawCanvasService } from '../../services/drawcanvas.service';
import { DatabaseService } from '../../services/database.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
declare var electron: any;
import { User } from '../../models/user.model';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit, OnChanges, AfterViewInit {
    private ipc;
    private bodyFrameCanvas;
    private colorFrameCanvas;
    private excerciseCanvas;
    private item: FirebaseObjectObservable<any>;
    private items: any;
    userdata: User = User.createEmptyUser();
    private oefeningNr = new Subject();
    private oefeningObservable;
    private currentExcercise;

    constructor(private kinectService: KinectService, private drawcanvasService: DrawCanvasService, private af: AngularFire, private dbService: DatabaseService) {
        this.ipc = electron.ipcRenderer;
        this.oefeningObservable = af.database.list('excercises', //gets the right excercises from the database. the id of the ex is defined by the oefeningNr variable
            {
                query: {
                    orderByChild: 'oefeningid',
                    equalTo: this.oefeningNr
                }
            });
        this.oefeningObservable.subscribe(res => this.currentExcercise = res);
        //gets grootte of a user
/*        this.dbService.getUserSize().subscribe(res => {
            //this.items=res;
            console.log(res);
        });*/
        //get user trajects
        this.dbService.getUserTrajects().subscribe(res => {
            //this.items=res;
            console.log("Trajecten");
            console.log(res);
        });
        /*this.dbService.getExcercisesOfUser().subscribe(res => {
            this.items = res;
            console.log(res);
        });*/
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        //declare canvas & context here after the view is loaded. else canvas = null
        this.bodyFrameCanvas = <HTMLCanvasElement>document.getElementById('bodyframecanvas');
        this.colorFrameCanvas = <HTMLCanvasElement>document.getElementById('colorframecanvas');
        this.excerciseCanvas = <HTMLCanvasElement>document.getElementById('excercisecanvas');
        this.drawcanvasService.drawBodyFrame(this.bodyFrameCanvas);//draw the bodyframe (skeleton)        
        this.drawcanvasService.drawColorFrame(this.colorFrameCanvas); //draw the colorframe
    }

    ngOnChanges(changes) {
        console.log(changes);
    }

    public drawExcercise() {
        console.log("drawEX clicked");
        this.drawcanvasService.drawExcercise(this.excerciseCanvas);
    }

    public getExcercise(nr: number) {
        this.oefeningNr.next(nr);
    }
}