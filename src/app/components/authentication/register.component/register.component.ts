import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { routerTransition } from '../../../animations/router.animations';
import { DatabaseService } from '../../../services/database.service';


@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ["./register.component.css"],
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})

export class RegisterComponent {
    error: Error = new Error("");


    constructor(public af: AngularFire, private router: Router, private dbService: DatabaseService) {

    }

    onSubmit(formData) {
        if (formData.valid) {
            console.log(formData.value.surname);
            this.af.auth.createUser({
                email: formData.value.email,
                password: formData.value.password
            }).then((success) => {
                console.log("in registercomponent"); console.log(formData);
                //create a new userobject in the database
                this.dbService.createUser(formData, success.uid);
                this.router.navigate(['/home'])
            }).catch((err) => {
                this.error = err;
                console.log(err);
                console.log(this.error.message);
            })
        }
    }
}
