export class CompletedStep {
    constructor(
        public stepNr: number,
        public score: number,
        public duration: number,
        public date: string
    ) { }
}