export class CompletedExercise
{
    constructor(
        public userId:string,
        public exerciseId:string,
        public stepNr:string,
        public score:number,
        public duration:number,
        public date:string        
    )
    {

    }
}