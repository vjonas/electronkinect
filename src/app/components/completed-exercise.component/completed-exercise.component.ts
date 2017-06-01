import { Component, Input, Output, EventEmitter, OnChanges } from "@angular/core";
import { CompletedExercise } from "../../models/completed.exercise.model";
import { FullExercise } from "../../models/full.excercise.model";

@Component({
    selector: 'completedExercise',
    templateUrl: 'completed-exercise.component.html',
    styleUrls: ['completed-exercise.component.scss']
})

export class CompletedExerciseComponent implements OnChanges{
    @Input() completedExercise: CompletedExercise;
    @Input() currentExercise: FullExercise;
    @Output() notify: EventEmitter<String> = new EventEmitter<String>();
    private showComponent: boolean = false;
    private currentScore: number = 0;
    private currentScorePercentage: number = 0;
    private CALIBRATION_STEP_NR = 0;
    private maxScore: number = 0;
    private dataLoaded: boolean = false;
    private messageWhenExerciseComplete:string ="";

    ngOnChanges(changes) {
        if (changes.completedExercise != undefined && changes.completedExercise.currentValue != null) {
            this.showComponent = true;
            this.calculateScores();
        }
    }

    private calculateScores() {
        this.resetScores();
        this.currentExercise.steps.forEach(step => {
            if (step.stepNr > this.CALIBRATION_STEP_NR)
            { this.maxScore += step.maxScore; }
        });
        this.currentScore = 0;
        this.completedExercise.completedSteps.forEach(step => {
                if (step.stepNr > this.CALIBRATION_STEP_NR)
                { this.currentScore += step.score; }
            });
            
        this.currentScore = Math.round(this.currentScore);
        this.currentScorePercentage = Math.round((this.currentScore / this.maxScore) * 100);
        if((this.currentScore/this.maxScore) > 0.6){
            this.messageWhenExerciseComplete = "Good job, you did well!";
        }
        else if((this.currentScore/this.maxScore) < 0.6 && (this.currentScore/this.maxScore)>0.3){
            this.messageWhenExerciseComplete = "Good job, but you can do better! I believe in you!";
        }
        else{
            this.messageWhenExerciseComplete = "Try again, you can do much better.";
        }
        this.dataLoaded = true;
    }

    private resetScores() {
        this.maxScore = 0;
        this.currentScore = 0;
        this.currentScorePercentage = 0;
        this.messageWhenExerciseComplete = "";
        this.dataLoaded = false;
    }

    private goBack() {
       // this.resetScores();     
        this.showComponent = false;
        this.notify.emit("");
    }
}