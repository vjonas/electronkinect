import { Step } from "app/models/step.model";

export class FullExercise
{
    constructor(
        public mentorUid:string,
        public name:string,
        public description:string,
        public steps:Step[],
        public completed:boolean,
        public exerciseId:string
    ){}
}