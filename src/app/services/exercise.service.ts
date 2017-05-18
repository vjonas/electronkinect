import { CompletedExercise } from 'app/models/completed.exercise.model';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { User } from "../models/user.model";
import { FullExercise } from "app/models/full.excercise.model";

@Injectable()
export class ExerciseService {
    path: string = "/exercises";
    private userUid: string;

    constructor(private af: AngularFire) {
        this.userUid=JSON.parse(localStorage.getItem('currentUser')).uid;
    }


    public getExcerciseById(exerciseId: string): Observable<FullExercise> {
        return this.af.database.object(this.path+"/"+exerciseId);
    }

    public createCompletedExercise(completedExercise:CompletedExercise)
    {
        this.af.database.list("/completed-exercises").push(completedExercise);        
    }

    public setExerciseCompleted(exUid:string,currentProgramId:number)
    {
        this.af.database.object("users/"+this.userUid+"programs/"+currentProgramId+"/"+exUid).update({completed:true})
    }

}