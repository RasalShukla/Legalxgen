import { Component } from '@angular/core';
import { AccountService } from '../../shared/services/account.service';
import { AuthInfoResponce } from "../../shared/globalUserInfo";

/**
 * Appmenu component class , contains all the functionality related to document menu operations
 */
@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent {
    public authInfoResponce: AuthInfoResponce;
    
    /**
     * @param  {AccountService} private_accountService
     */
    constructor( private _accountService: AccountService ) {
        this._accountService.authInfo$.map(authInfo => authInfo.$authResponce).subscribe(userGlobalData => this.authInfoResponce = userGlobalData);
    }
}
