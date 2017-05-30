import { UserService } from './../../../services/user.service';
import { Component } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { routerTransition } from '../../../animations/router.animations';

@Component(
  {
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.scss'],
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
  }
)

export class LoginComponent {
  invalidLogin: boolean;
  errCond: boolean = false;
  error: Error = new Error("");
  private showLogin: boolean = false;

  constructor(public af: AngularFire, private router: Router, private userService: UserService) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.showLoginModal();
      }
    });
  }

  onSubmit(formData) {
    if (formData.valid) {
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      }, {
          provider: AuthProviders.Password,
          method: AuthMethods.Password,
        }).then((success) => {
          console.log(success + "LoginForm");
          this.showLoginModal();
          //this.router.navigate(['/home']);
          this.errCond = false;
        }).catch((err) => {
          console.log(err);
          this.errCond = true;
          this.error = err;
        })
    }
  }

  private showLoginModal(): void {
    this.showLogin = true;
    const self = this;
    setTimeout(function () {
      self.showLogin = false;
      self.router.navigateByUrl('/home');
    }, 2000);
  }

  providerLogin(from: string) {
    this.af.auth.login({
      provider: this._getProvider(from),
      method: AuthMethods.Popup,
    }).then((success) => {
      this.router.navigate(['/home']);
    }).catch((err) => {
      console.log(err);
      this.error = err;
    })
  }

  private _getProvider(from: string) {
    switch (from) {
      case 'google': return AuthProviders.Google;
      case 'facebook': return AuthProviders.Facebook;
      case 'twitter': return AuthProviders.Twitter;
    }
  }
}