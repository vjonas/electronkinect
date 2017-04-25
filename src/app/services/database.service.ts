import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatabaseService {
    private items2: Subject<any> = new Subject<any>();
    items: FirebaseListObservable<any[]>;
    private oefening = new Subject();
    private queryObservable;

    constructor(private af: AngularFire) {
        this.items = af.database.list('items');
        this.queryObservable = af.database.list('oefeningen',
            {
                query: {
                    orderByChild: 'oefeningid',
                    equalTo: this.oefening
                }
            })
    }

    getAll(): Observable<any> {
        return this.af.database.list('positions');
    }

    getUser(): Observable<any> {
        return this.af.database.object('users/grootte');
    }

    getExcercisesOfUser(): Observable<any> {
        return this.af.database.list('users', {
            query: {
                orderByChild: 'name',
                equalTo: 'jonas'
            }
        });
    }

    //returns all details of an excercise
/*    getExcerciseDetails(): Observable<any> {
        var returnvalue;
        this.queryObservable.subscribe(res=>
        {
            returnvalue= res;
        })
        return returnvalue;
    }*/

    //sets the excerciseNr to fetch from getExcerciseDetails
    public setOefening(excerciseNr:number)
    {
        this.oefening.next(excerciseNr);
    }

}