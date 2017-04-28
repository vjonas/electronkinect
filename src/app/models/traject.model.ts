import { Excercise } from "app/models/excercise.model";

export class Traject
{
    constructor(
        public id:number,
        public name:string,
        public score:number,
        public excercises:Excercise[]
    )
    {}

    public static createEmptyTraject()
    {
        return new Traject(0,'',0,null);
    }

    public static createEmptyTrajects(): Traject[] {
        return new Array<Traject>();
    }
}