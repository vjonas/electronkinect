import { Component, Input, Output, EventEmitter, OnChanges } from "@angular/core";
import { FullExercise } from "../../models/full.excercise.model";

@Component({
    selector: 'exercises',
    templateUrl: 'exercises.component.html',
    styleUrls: ['exercises.component.scss']
})

export class ExercisesComponent implements OnChanges {
    @Input() exerciseList: FullExercise[] = new Array<FullExercise>();
    @Output() notify: EventEmitter<FullExercise> = new EventEmitter<FullExercise>();
    private currentFullExercise: FullExercise;
    private EXERCISES_TO_SHOW:number = 3;
    private start:number=0;
    private end:number=3;

    ngOnChanges(changes){
        if(changes.exerciseList.firstChange == true){
            this.exerciseList = changes.exerciseList.currentValue;
            this.initializeCurrentExercise();
        }
    }

    private initializeCurrentExercise(){
        console.log(this.exerciseList);
    }

    private changeExercise(exerciseId){
        this.loadExcercise(exerciseId);
    }

    private loadExcercise(excerciseId) {
        this.exerciseList.forEach(ex => {
            if (ex.exerciseId == excerciseId) {
                this.currentFullExercise = ex;
            }
        })
    }

    private drawExcercise(){
        this.notify.emit(this.currentFullExercise);
    }

    private showNextExercises(){
    if(this.start >= 0 && (this.start + this.EXERCISES_TO_SHOW) < this.exerciseList.length){
      this.start += this.EXERCISES_TO_SHOW;
      this.end += this.EXERCISES_TO_SHOW;
    }
  }

  private showPreviousExercises(){
    if(this.start > 0){
      this.start -= this.EXERCISES_TO_SHOW;
      this.end -= this.EXERCISES_TO_SHOW;
    }
  }
}