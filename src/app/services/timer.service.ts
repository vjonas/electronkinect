import { Injectable } from '@angular/core';

@Injectable()
export class TimerService{
    private time:number=0.0;
    private intervalOfTimer;
    private SECONDS = 60;

    public startTimer()
    {
        this.intervalOfTimer=setInterval(timer=>
        {
            this.time++;

        },1000/60)
    }

    public resetTimer()
    {
        clearImmediate(this.intervalOfTimer);
        this.time=0;
    }

    public getTimer():number
    {
        return Number(((this.time/this.SECONDS)).toFixed(2));
    }

}