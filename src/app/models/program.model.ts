import { Exercise } from "app/models/excercise.model";

export class Program
{
    constructor(
        public programId:number,
        public name:string,
        public score:number,
        public exercises:Exercise[]
    )
    {}

    public static createEmptyTraject()
    {
        return new Program(0,'',0,null);
    }

    public static createEmptyTrajects(): Program[] {
        return new Array<Program>();
    }
}