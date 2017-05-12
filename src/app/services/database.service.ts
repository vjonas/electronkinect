import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { User } from "../models/user.model";
import { Exercise } from "app/models/excercise.model";
import { FullExercise } from "app/models/full.excercise.model";
import { Program } from "app/models/program.model";

@Injectable()
export class DatabaseService {
    private items2: Subject<any> = new Subject<any>();
    items: FirebaseListObservable<any[]>;
    private oefening = new Subject();

    constructor(private af: AngularFire) {
        this.items = af.database.list('items');
    }

    getUserdataById(uid: string): Observable<User> {
        return this.af.database.list('users', {
            query: {
                orderByChild: 'uid',
                equalTo: uid
            }
        }).map(res=>{return res[0]});
    }

    getExcerciseById(excercise: string): Observable<FullExercise[]> {
        return this.af.database.list('exercises', {
            query: {
                orderByChild: 'excerciseid',
                equalTo: Number(excercise)
            }
        });
    }

    getExerciseByUid(exercise: string): Observable<FullExercise> {
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
            lastName: userData.value.lastname,
            email: userData.value.email,
            weight: userData.value.weight,
            length: userData.value.length,
            birthDate: userData.value.birthdate,
            traject: new Array<Program>(),
            mentorId: "0"
        })
    }
}