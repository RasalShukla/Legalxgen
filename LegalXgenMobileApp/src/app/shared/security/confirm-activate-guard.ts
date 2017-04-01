import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router,RouterStateSnapshot } from '@angular/router';
import {Observable} from "rxjs/Rx";
import { AccountService } from "../../shared/services/account.service";
import { AuthInfo } from "../../shared/globalUserInfo";
import { NotificationService } from '../services/notification.service'
/**
 * 
 * Authentication guard class to check user is valid or not on each user routing
 * @export
 * @class ConfirmActivateGuard
 * @implements {CanActivate}
 */
@Injectable()

export class ConfirmActivateGuard implements CanActivate {
    constructor(private _router: Router,
        private _notificationService: NotificationService,
        private _accountService: AccountService
    ) {}


    /**
     * 
     * 
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable < boolean >}
     * 
     * @memberOf ConfirmActivateGuard
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable < boolean > {

        return this._accountService.authInfo$
            .map(authInfo => authInfo.isLoggedIn())
            .take(1)
            .do(allowed => {
                if (!allowed) {
                    this._router.navigate(['/account']);

                }
            });
    }
}