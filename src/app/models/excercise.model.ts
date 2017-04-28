export class Excercise
{
    constructor(
        public excerciseid:string,
        public score:number
    )
{}

public static createEmptyExcercise()
{
    return new Excercise('',0);
}

public static createEmptyExcercises(): Excercise[] {
        return new Array<Excercise>();
    }
}