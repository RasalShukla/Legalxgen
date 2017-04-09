import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router,RouterStateSnapshot } from '@angular/router';
import {Observable} from "rxjs/Rx";
import { AccountService } from "../../shared/services/account.service";
import { AuthInfo } from "../../shared/globalUserInfo";


@Injectable()
export class ConfirmActivateGuard implements CanActivate {
    constructor(private _router: Router,
        private _accountService: AccountService
    ) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable < boolean > {
        return this._accountService.authInfo$
            .map(authInfo => authInfo.isLoggedIn())
            .take(1).do(allowed => {
                if (!allowed) {
                    this._router.navigate(['/account']);
                }
            });
    }
}