import { Injectable, Inject } from '@angular/core';
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
import { APP_CONFIG,  } from '../../app.config';
import { IAppConfig }  from '../../iapp.config';


/**
 * Account service class , which deals with all the http operation and make 
 * server side connection to access data from server side 
 */
@Injectable()
export class AccountService {

    static UNKNOWN_USER = new AuthInfo(new AuthInfoResponce(null, null, null, null, null, null, null, null));
    public  baseUrl: string;
    authInfo$: BehaviorSubject < AuthInfo > = new BehaviorSubject < AuthInfo > (AccountService.UNKNOWN_USER);

    public responce: any;
    /**
     * @param  {Http} private_http
     * @param  {GlobalEventsManager} private_globalEventsManager
     * @param  {Router} private_router
     * @param  {NotificationService} private_notificationService
     * @param  {IAppConfig} private_config
     */
    constructor(private _http: Http,
        private _globalEventsManager: GlobalEventsManager,
        private _router: Router,
        private _notificationService: NotificationService,
        @Inject(APP_CONFIG) private _config: IAppConfig) {
           this.baseUrl = this._config.apiAccontEndpoint;
        }

    /**
     * funtion to login in application 
     * @param  {Login} login
     * @returns void
     */
    public login(login: Login) : void {
        let url = this.baseUrl + "?email=" + login['email'] + "&password=" + login['password'];
        this._http.get(url).map((res => res.json()))
            .subscribe(
                (data) => this.afterLoginResponce(data), (err) => console.log("Error" + err),
            );
    }
    
   /**
    * funtion to remove all the session data when user press back button of browser , and reach to login screen
    * @returns void
    */
   public clearDataOnBackMovement()  : void {
        this.authInfo$.next(AccountService.UNKNOWN_USER);
        this._globalEventsManager.showNavBar.emit(false);
    }
    
    /**
     * function to logout user , and remove its data from current session
     * @returns void
     */
    public logOut()  : void {
        this.authInfo$.next(AccountService.UNKNOWN_USER);
        this._globalEventsManager.showNavBar.emit(false);
        this._router.navigate(['/account']);
    }

   /**
    * function to process login responce if login is successfull
    * @param  {LoginResponse} loginResponce
    * @returns void
    */
   public afterLoginResponce(loginResponce: LoginResponse)  : void {
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

    /**
     * function to add login responce in AutuInfo , which is accessable in global manner
     * @param  {LoginResponse} loginResponce
     * @returns AuthInfo
     */
   public setGlobalDataInAuthInfo(loginResponce: LoginResponse): AuthInfo {
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