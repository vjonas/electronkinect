import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
declare var electron: any;


@Injectable()
export class KinectService {
    private ipc;
    private bodyFrame: Subject<any> = new Subject<any>();
    private bodyFrameMock: Subject<any> = new Subject<any>();
    private colorFrame: Subject<any> = new Subject<any>();
    private colorFrame2: Subject<any> = new Subject<any>();
    mockData: boolean = false;
    private mockArray: any;
    private counter: number = 0;
    private array: Array<any> = null;

    constructor(private _http: Http) {
        const self = this;
        this.ipc = electron.ipcRenderer;
        //open the listener to the bodyFrames
        this.ipc.on('bodyFrame', function (event, bodyFrame) {
            self.bodyFrame.next(bodyFrame);
        })
        //open the listener to the colorFrames
        this.ipc.on('colorFrame', function (event, colorFrame) {
            self.colorFrame.next(colorFrame);
        })
        this.ipc.on('colorFrame2', function (event, colorFrame) {
            self.colorFrame2.next(colorFrame.data);
        })
        //open listener for other logs
        this.ipc.on('log', function (event, data) {
        })
    }

    getBodyFrames(streamMockData: boolean, fileName: string): Observable<any> {
        if (streamMockData) {
            this.streamMockData(fileName);
            return this.bodyFrameMock.asObservable();
        }
        else
            return this.bodyFrame.asObservable();
    }

    private streamMockData(fileName: string) {
       /* const self = this;
        var interval;
        clearInterval(interval);
        this._http.get('assets/' + fileName + '.json').map(res => {
            this.array = JSON.parse(JSON.stringify(res.json()));
            interval = setInterval(function () {
                if (self.counter <= self.array.length) {
                    self.bodyFrameMock.next(JSON.stringify(self.array[self.counter]));
                }
                else {
                    clearInterval(interval);
                    self.counter = 0;
                }
                self.counter++;
            }, 1000 / 30);
        }).subscribe(res => res);*/

        this.ipc.on('bodyFrameMock', (event,frame)=>
        {
            console.log(frame);

        })
    }
}
