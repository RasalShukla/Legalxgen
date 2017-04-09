import { Component } from '@angular/core';
import { AccountService } from '../../shared/services/account.service';
import {  AuthInfoResponce } from "../../shared/globalUserInfo";

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent {
    public authInfoResponce: AuthInfoResponce;
    constructor(private _accountService: AccountService) {
        this._accountService.authInfo$.map(authInfo => authInfo.$authResponce).subscribe(userGlobalData => this.authInfoResponce = userGlobalData);
    }

    logOut() {
        this._accountService.logOut();
    }
}
