import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
declare var electron: any;


@Injectable()
export class KinectService
{
    private ipc;
    private bodyFrame : Subject<any> = new Subject<any>();
    private colorFrame : Subject<any> = new Subject<any>();
    constructor()
    {
        const self = this;
        this.ipc=electron.ipcRenderer;
        //open the listener to the bodyFrames
        this.ipc.on('bodyFrame',function(event,bodyFrame)
        {
            self.bodyFrame.next(bodyFrame);
        })
        //open the listener to the colorFrames
        this.ipc.on('colorFrame',function(event,colorFrame)
        {
            self.colorFrame.next(colorFrame);
        })
    }

    //receive the bodyFrames from the kinect
    getBodyFrames() : Observable<any>
    {
        return this.bodyFrame.asObservable();        
    }

    getColorFrames() : Observable<any>
    {
        return this.colorFrame.asObservable();
    }



}