import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { User } from "../models/user.model";
import { Excercise } from "app/models/excercise.model";
import { FullExcercise } from "app/models/full.excercise.model";
import { Traject } from "app/models/traject.model";

@Injectable()
export class DatabaseService {
    private items2: Subject<any> = new Subject<any>();
    items: FirebaseListObservable<any[]>;
    private oefening = new Subject();

    constructor(private af: AngularFire) {
        this.items = af.database.list('items');
    }

    getUserdataById(uid: string): Observable<User[]> {
        console.log("dbservice uid:" + uid);
        return this.af.database.list('users', {
            query: {
                orderByChild: 'uid',
                equalTo: uid
            }
        });
    }

    getExcerciseById(excercise: string): Observable<FullExcercise[]> {
        return this.af.database.list('exercises', {
            query: {
                orderByChild: 'excerciseid',
                equalTo: Number(excercise)
            }
        });
    }

    getExerciseByUid(exercise: string): Observable<FullExcercise> {
        return this.af.database.object('/exercises/'+exercise);
    }

    //sets the excerciseNr to fetch from getExcerciseDetails
    public setOefening(excerciseNr: number) {
        this.oefening.next(excerciseNr);
    }

    public createUser(userData: any, uid: string) {
        console.log("in service"); console.log(userData);
        console.log(userData.value.email);
        console.log(userData.value.lastname);
        this.af.database.list('/users').push({
            uid: uid,
            name: userData.value.surname,
            lastname: userData.value.lastname,
            email: userData.value.email,
            weight: userData.value.weight,
            length: userData.value.length,
            birthdate: userData.value.birthdate,
            traject: new Array<Traject>(),
            mentorId: "0"
        })
    }
}