import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatabaseService {
    private items2: Subject<any> = new Subject<any>();
    items: FirebaseListObservable<any[]>;
    constructor(private af: AngularFire) {
        this.items = af.database.list('items');
    }

    getAll() :Observable<any> {
        return this.af.database.list('positions');        
    }

    getUser():Observable<any>
    {
        return this.af.database.object('userdata');
    }

}