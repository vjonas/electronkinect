import { UserService } from './../../../services/user.service';
import { User } from './../../../models/user.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { routerTransition } from '../../../animations/router.animations';


@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ["./register.component.scss"],
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})

export class RegisterComponent {
    error: Error = new Error("");
    private userToAdd: User = User.createEmptyUser();


    constructor(public af: AngularFire, private router: Router, private userService: UserService) {
    }

    onSubmit(formData) {
        if (formData.valid) {
            this.af.auth.createUser({
                email: formData.value.email,
                password: formData.value.password
            }).then((success) => {
                //create a new userobject in the database
                this.userToAdd.uid = success.uid;
                this.userService.createUser(this.userToAdd);
                this.router.navigate(['/no-program'])
            }).catch((err) => {
                this.error = err;
                console.log(err);
                console.log(this.error.message);
            })
        }
    }
}
