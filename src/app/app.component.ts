import { Component } from '@angular/core';
import { ipcRenderer } from 'electron';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  electron: any;
  name: any;

  constructor(public af: AngularFire, private router: Router) {
    this.af.auth.subscribe(
      auth => {
        if (auth) { this.name = auth; }
      }
    )
  }

  logout() {
    this.af.auth.logout();
    this.name = null;
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
