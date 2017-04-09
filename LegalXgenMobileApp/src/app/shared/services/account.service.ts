import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http'
import { Login } from  '../model/login';
import { Observable, BehaviorSubject, Subject } from "rxjs/Rx";
import { AuthInfo, AuthInfoResponce } from "../../shared/globalUserInfo";
import { GlobalEventsManager } from '../../globalEventManager';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../services/notification.service'
import { xhrHeaders } from "./xhr-headers";
import { LoginResponse } from '../model/loginResponce';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class AccountService {

    static UNKNOWN_USER = new AuthInfo(new AuthInfoResponce(null, null, null, null, null, null, null, null));
    baseUrl: string = "http://localhost:51289/api/account";
    authInfo$: BehaviorSubject < AuthInfo > = new BehaviorSubject < AuthInfo > (AccountService.UNKNOWN_USER);

    public responce: any;
    constructor(private _http: Http,
        private _globalEventsManager: GlobalEventsManager,
        private _router: Router,
        private _notificationService: NotificationService) {}


    login(login: Login) {
        let url = this.baseUrl + "?email=" + login['email'] + "&password=" + login['password'];
        this._http.get(url).map((res => res.json()))
            .subscribe(
                (data) => this.afterLoginResponce(data), (err) => console.log("Error" + err)
            );


    }
    clearDataOnBackMovement() {
        this.authInfo$.next(AccountService.UNKNOWN_USER);
        this._globalEventsManager.showNavBar.emit(false);
    }

    logOut() {
        this.authInfo$.next(AccountService.UNKNOWN_USER);
        this._globalEventsManager.showNavBar.emit(false);
        this._router.navigate(['/account']);
    }



    afterLoginResponce(loginResponce: LoginResponse) {
        // This is observable after responce , I am saving user responce in authinfo 
        const subject = new Subject < any > ();
        this._globalEventsManager.showNavBar.emit(true);
        const authInfo = this.setGlobalDataInAuthInfo(loginResponce);
        this.authInfo$.next(authInfo);
        subject.next(authInfo);
        subject.complete();
        this._router.navigate(['/mytimesheet']);
        this._notificationService.popToastSuccess('Welcome', 'User has authenticated to use this site');

    }


    setGlobalDataInAuthInfo(loginResponce: LoginResponse): AuthInfo {
        return new AuthInfo(new AuthInfoResponce(
            loginResponce.customer,
            loginResponce.customerId,
            loginResponce.lxDrivePath,
            loginResponce.name,
            loginResponce.password,
            loginResponce.userId,
            loginResponce.userName,
            loginResponce.imageUrl
        ));
    }
}