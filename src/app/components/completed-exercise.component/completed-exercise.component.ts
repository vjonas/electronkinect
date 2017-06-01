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
    private latestScore: number = 0;
    private latestScorePercentage: number = 0;
    private CALIBRATION_STEP_NR = 0;
    private maxScore: number = 0;
    private dataLoaded: boolean = false;

    ngOnChanges(changes) {
        if (changes.exercise != undefined && changes.exercise.currentValue != null) {
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
        var scorePerExercise = 0;
        this.completedExercise.completedSteps.forEach(step => {
                if (step.stepNr > this.CALIBRATION_STEP_NR)
                { scorePerExercise += step.score; }
            });
            
        this.latestScore = Math.round(this.latestScore);
        this.latestScorePercentage = Math.round((this.latestScore / this.maxScore) * 100);
        this.dataLoaded = true;
    }

    private resetScores() {
        this.maxScore = 0;
        this.latestScore = 0;
        this.latestScorePercentage = 0;
        this.dataLoaded = false;
    }

    private goBack() {
       // this.resetScores();     
        this.showComponent = false;
        this.notify.emit("");
    }
}