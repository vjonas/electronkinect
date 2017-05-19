import { CompletedStep } from "app/models/completed.step";

export class CompletedExercise {
    constructor(
        public userId: string,
        public exerciseId: string,
        public programId: number,
        public completedSteps: CompletedStep[],
        public completed: boolean
    ) { }

    public static createNewCompletedExercise(userId:string,exerciseId:string,programId:number)
    {
        return new CompletedExercise(userId,exerciseId,programId,new Array<CompletedStep>(),false);
    }
}