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
        return this.af.database.list('/users/traject');
    }

    getUserSize(): Observable<any> {
        return this.af.database.object('users/grootte');
    }

    getUserTrajects(): Observable<any> {
        return this.af.database.object('/users/0/traject/0'); //werkt
        /*var ref = new database("https://dinosaur-facts.firebaseio.com/dinosaurs");
        ref.orderByChild("height").on("child_added", function (snapshot) {
            console.log(snapshot.key() + " was " + snapshot.val().height + " meters tall");
        });*/
        //this.af.database.object()
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
    public setOefening(excerciseNr: number) {
        this.oefening.next(excerciseNr);
    }

    public createUser(userData: any,uid:string) {
        console.log("in service");console.log(userData);
        console.log(userData.value.email);
        console.log(userData.value.lastname);
        this.af.database.list('/users').push({
            uid:uid,
            name: userData.value.surname,
            lastname: userData.value.lastname,
            email: userData.value.email,
            weight: userData.value.weight,
            length: userData.value.length,
            birthdate: userData.value.birthdate,
            traject:[]
        })
    }

}