export class CompletedExercise
{
    constructor(
        public userId:string,
        public exerciseId:string,
        public stepNr:number,
        public score:number,
        public duration:number,
        public date:string        
    )
    {

    }
}