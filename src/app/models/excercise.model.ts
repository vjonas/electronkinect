export class Exercise
{
    constructor(
        public exerciseid:string,
        public score:number,
        public completed:boolean
    )
{}

public static createEmptyExcercise()
{
    return new Exercise('',0,false);
}

public static createEmptyExcercises(): Exercise[] {
        return new Array<Exercise>();
    }
}