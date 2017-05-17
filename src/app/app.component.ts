import { Component } from '@angular/core';
import { ipcRenderer } from 'electron';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';
import { SharedService } from "app/services/shared.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  electron: any;
  name: any;
  private userId: string;

  constructor(public af: AngularFire, private router: Router, private sharedService: SharedService) {
    this.userId='';
    this.af.auth.subscribe(
      auth => {
        if (auth) { this.name = auth; }
      }
    )
    this.sharedService.getUserId.subscribe(
      (onMain) => {
        this.userId = onMain['uid'];
      });
  }

  private logout() {
    this.af.auth.logout();
    this.name = null;
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  private copyUserId(uidParagraph: HTMLParagraphElement) {
    var selection = window.getSelection();
    window.getSelection().removeAllRanges();
    var range = document.createRange();
    range.selectNodeContents(uidParagraph);
    selection.addRange(range);
    document.execCommand('copy');
  }
}
