import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import { Kinect2 } from 'kinect2';
import { KinectService } from '../../services/kinect.service';
import { DrawCanvasService } from '../../services/drawcanvas.service';
import { DatabaseService } from '../../services/database.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
declare var electron: any;
import { User } from '../../models/user.model';


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
    userdata:User=User.createEmptyUser();

    constructor(private kinectService: KinectService, private drawcanvasService: DrawCanvasService, private af: AngularFire, private dbService:DatabaseService) {
        this.ipc = electron.ipcRenderer;
        this.dbService.getAll().subscribe(res=>
        {
            this.items=res;
            console.log(res);
        });
        this.dbService.getUser().subscribe(res=>{
            this.userdata=res;
            console.log(res);
        });
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
}