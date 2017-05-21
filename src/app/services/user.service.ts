import { User } from './../models/user.model';
import { Observable } from 'rxjs/Rx';
import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    constructor(private af: AngularFire) {


    }
    public getUserdataById(userId: string): Observable<User> {
        return this.af.database.object("users/" + userId);
    }

    public createUser(userToAdd: User) {
        this.af.database.object('/users/' + userToAdd.uid).set(userToAdd);
    }

    public getUserId() {
        var authData = this.af.auth.getAuth();
        if (authData != null) {
            return authData.uid
        }
        else {
            return "";
        }
    }
}
