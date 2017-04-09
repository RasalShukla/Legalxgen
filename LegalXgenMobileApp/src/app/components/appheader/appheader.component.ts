import { Component } from '@angular/core';
import { AccountService } from '../../shared/services/account.service';
import {  AuthInfoResponce } from "../../shared/globalUserInfo";

/**
 * Appheader component class , contains all the functionality related to document header operations
 */
@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent {
    public authInfoResponce: AuthInfoResponce;
    
    /**
     * @param  {AccountService} private_accountService
     */
    constructor(private _accountService: AccountService) {
        this._accountService.authInfo$.map(authInfo => authInfo.$authResponce).subscribe(userGlobalData => this.authInfoResponce = userGlobalData);
    }
    
    /**
     * Log out function , Log out the user from the appliction and 
     * remove all the information of the useer from current session
     * @returns void
     */
    public logOut() : void {
        this._accountService.logOut();
    }
}
