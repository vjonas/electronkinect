export class Exercise
{
    constructor(
        public exerciseId:string,
        public completed:boolean
    )
{}

public static createEmptyExcercise()
{
    return new Exercise('',false);
}

public static createEmptyExcercises(): Exercise[] {
        return new Array<Exercise>();
    }
}