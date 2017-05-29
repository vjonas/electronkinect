import {Component} from "@angular/core";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'no-program',
    templateUrl: 'no-program.component.html',
    styleUrls: ['no-program.component.scss']
})

export class NoProgramComponent{
    private uid: string;

    constructor(private _userService: UserService){
        this.uid = this._userService.getUserId();
    }

    private copyUserId(uidParagraph: HTMLSpanElement) {
      var selection = window.getSelection();
      window.getSelection().removeAllRanges();
      var range = document.createRange();
      range.selectNodeContents(uidParagraph);
      selection.addRange(range);
      document.execCommand('copy');
  }

}