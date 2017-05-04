import { Component } from '@angular/core';
import { Traject } from "app/models/traject.model";

export class User {
    constructor(
        public uid:string,
        public name:string,
        public lastname:string,
        public email:string,
        public weight:string,
        public length: string,
        public birthdate:string,
        public currenttraject:number,
        public traject:Traject[],
        public mentorId: string
    )
    { }

    public static createEmptyUser(): User {
        return new User('','','','','','','',0,null,'');
    }
}

