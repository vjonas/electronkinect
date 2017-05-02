import { Step } from "app/models/step.model";

export class FullExcercise
{
    constructor(
        public excerciseid:string,
        public name:string,
        public description:string,
        public steps:Step[]
    ){}
}