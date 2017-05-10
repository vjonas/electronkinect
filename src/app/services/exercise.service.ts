import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { User } from "../models/user.model";
import { FullExercise } from "app/models/full.excercise.model";

@Injectable()
export class ExerciseService {
    path: string = "/exercises";
    private _mentorUid: string;

    constructor(private af: AngularFire) {
        this._mentorUid=JSON.parse(localStorage.getItem('currentUser')).uid;
    }


    public getExcerciseById(exerciseId: string): Observable<FullExercise> {
        return this.af.database.object(this.path+"/"+exerciseId);
    }

}