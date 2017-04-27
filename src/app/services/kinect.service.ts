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
    mockData: boolean = false;
    private mockArray: any;
    
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
    }

    getBodyFrames(mock: boolean): Observable<any> {
        if (mock) {
            this.streamMockData();
            return this.bodyFrameMock.asObservable();
        }
        else
            return this.bodyFrame.asObservable();
    }

    getColorFrames(): Observable<any> {
        return this.colorFrame.asObservable();
    }

    public setMockData(mockdata: boolean) {
        this.mockData = mockdata;
    }

    /**
     * function to stream mockdata 
     */
    private streamMockData() {
        let interval: any;
        let counter: number = 0;
        const self = this;
        console.log("getting the mockdata from json with http call");
        this._http.get('assets/mockdata2.json').map(res => {
            var array = JSON.parse(JSON.stringify(res.json())).forEach(element => {
                 this.bodyFrameMock.next(JSON.stringify(element));
            });;
            interval = setInterval(function (array,counter) {
                console.log(counter);
                if (counter <= array.length)
                    console.log(array);//bodyFrameMock.next(mockArray.get(counter));
                else
                    clearInterval(array);
                counter++;
            }, 1000 / 60);        
        }).subscribe(res=>console.log("in de subscribe functie"+res));
    }
}

/**/