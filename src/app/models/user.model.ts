import { Component } from '@angular/core';

export class User {
    constructor(private positions: string[],
        private username: string
    )
    { }

    public static createEmptyUser(): User {
        return new User(null, '');
    }
}

