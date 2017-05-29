import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class TimerService {
    private time: number = 0.0;
    private intervalOfTimer;
    private SECONDS = 60;
    private timerSubject: Subject<number> = new Subject()

    public startTimer() {
        this.intervalOfTimer = setInterval(timer => {
            this.time++;
            this.timerSubject.next(Number(((this.time / this.SECONDS)).toFixed(0)));
        }, 1000 / 60)
    }

    public resetTimer() {
        clearImmediate(this.intervalOfTimer);
        this.time = 0;
        this.timerSubject.next(this.time);
    }

    public getTimer(): number {
        return Number(((this.time / this.SECONDS)).toFixed(2));
    }

    public getTimerAsObservable(): Observable<number> {
        return this.timerSubject.asObservable();
    }
}