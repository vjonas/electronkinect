import { FullExercise } from './../../models/full.excercise.model';
import { Exercise } from 'app/models/excercise.model';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector: 'exercises',
    templateUrl: 'exercises.component.html',
    styleUrls: ['exercises.component.scss']
})

export class ExercisesComponent implements OnChanges {
    @Input() fullExerciseList: FullExercise[] = new Array<FullExercise>();
    @Input() exerciseList: Exercise[] = new Array<Exercise>();
    @Output() notify: EventEmitter<FullExercise> = new EventEmitter<FullExercise>();
    private currentFullExercise: FullExercise;
    private EXERCISES_TO_SHOW: number = 3;
    private start: number = 0;
    private end: number = 3;
    @Input() changes: number;

    ngOnChanges(changes: SimpleChanges) {
        if (changes.changes) {
            this.loadExercisesToShow();
        }
    }

    private loadExercisesToShow() {
        var nextIndex: number;
        this.fullExerciseList.forEach(
            (fullEx, index) => {
                this.exerciseList.forEach(exercise => {
                    if (exercise.exerciseId === fullEx.exerciseId && exercise.completed) {
                        this.fullExerciseList[index].completed = true;
                        nextIndex = index;
                    }
                    else if(exercise.exerciseId === fullEx.exerciseId && !exercise.completed) {
                        this.fullExerciseList[index].completed = false;                        
                    }
                });
            }
        )
        //always set first exercise to completed:
        if (this.fullExerciseList[0] != null) {
            this.fullExerciseList[0].completed = true;
        }
        //set the next exercise on completed
        nextIndex++;
        if (this.fullExerciseList[nextIndex] != null) {
            this.fullExerciseList[nextIndex].completed = true;
        }
    }

    private changeExercise(exerciseId) {
        this.loadExcercise(exerciseId);
    }

    private loadExcercise(excerciseId) {
        this.fullExerciseList.forEach(ex => {
            if (ex.exerciseId == excerciseId) {
                this.currentFullExercise = ex;
            }
        })
    }

    private drawExcercise() {
        this.notify.emit(this.currentFullExercise);
    }

    private showNextExercises() {
        if (this.start >= 0 && (this.start + this.EXERCISES_TO_SHOW) < this.fullExerciseList.length) {
            this.start += this.EXERCISES_TO_SHOW;
            this.end += this.EXERCISES_TO_SHOW;
        }
    }

    private showPreviousExercises() {
        if (this.start > 0) {
            this.start -= this.EXERCISES_TO_SHOW;
            this.end -= this.EXERCISES_TO_SHOW;
        }
    }
}