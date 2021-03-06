import { Subject } from 'rxjs/Subject';
import { UserService } from './user.service';
import { CompletedExercise } from 'app/models/completed.exercise.model';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { User } from "../models/user.model";
import { FullExercise } from "app/models/full.excercise.model";

@Injectable()
export class ExerciseService {
    path: string = "/exercises";
    private keyOfCompletedExercise: string;
    private completedExerciseSubject: Subject<CompletedExercise> = new Subject();

    constructor(private af: AngularFire, private userService: UserService) {
    }


    public getExcerciseById(exerciseId: string): Observable<FullExercise> {
        return this.af.database.object(this.path + "/" + exerciseId);
    }

    public createCompletedExercise(completedExercise: CompletedExercise) {
        this.af.database.list("/completed-exercises/" + this.userService.getUserId() + "/" + completedExercise.programId).push(completedExercise).then((keyOfCompletedExercise) => {
            this.keyOfCompletedExercise = keyOfCompletedExercise.key;
        });

    }

    public updateCompletedExercise(completedExercise: CompletedExercise) {
        this.af.database.object("/completed-exercises/" + this.userService.getUserId() + "/" + completedExercise.programId + "/" + this.keyOfCompletedExercise).set(completedExercise);
        if (completedExercise.completed) {
            this.completedExerciseSubject.next(completedExercise);
        }
    }

    public setExerciseCompleted(exerciseId: string, currentProgramId: number) {
        this.af.database.object("users/" + this.userService.getUserId() + "/programs/" + currentProgramId + "/exercises/" + exerciseId).update({ completed: true })
    }

    public getFullExerciseById(exerciseId: string): Observable<FullExercise> {
        return this.af.database.object('/exercises/' + exerciseId);
    }

    public getCompletedExercise(): Observable<CompletedExercise> {
        return this.completedExerciseSubject;
    }
}