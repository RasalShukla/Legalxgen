import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http'
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Login } from  '../model/login';
import {Observable, BehaviorSubject, Subject} from "rxjs/Rx";
import { AuthInfo } from "../../shared/globalUserInfo";
import { GlobalEventsManager } from '../../globalEventManager';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../services/notification.service'
import {xhrHeaders} from "./xhr-headers";

@Injectable()
export class AccountService {
   static UNKNOWN_USER = new AuthInfo(null);
    baseUrl: string = "http://localhost:51289/api/account";
   authInfo$:BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AccountService.UNKNOWN_USER);
public globalEmailData : any;
  public responce:any;
  constructor(private _http:Http, 
              private _globalEventsManager: GlobalEventsManager,
              private _router : Router,
              private _notificationService: NotificationService) { }


  login(login:Login)  {
    
      //this._http.delete(this.baseUrl + "/" +id).map((res => res.json())).subscribe(aa=>console.log(aa),err=>console.log(err));
     //this._http.get(this.baseUrl+ "/" + id).map((res => res.json())).subscribe(aa=>console.log(aa),err=>console.log(err));
     //this._http.put(this.baseUrl +"/" + id,login).map((res => res.json())).subscribe(aa=>console.log(aa),err=>console.log(err));
     let url = this.baseUrl + "?email=" + login['email'] + "&password=" + login['password'];
     this._http.get(url).map((res => res.json()))
     .subscribe(
        (data) => this.afterLoginResponce(data),
        (err) => console.log("Error" + err)
      );
      // if you don't have the API the please comment the above code and uncomment the below code.
   // this.withoutApiLogin('rasalshukla@gmail.com');
    
   
  }
  clearDataOnBackMovement(){
    this.authInfo$.next(AccountService.UNKNOWN_USER);
    this._globalEventsManager.showNavBar.emit(false);
  }

  logOut(){
    this.authInfo$.next(AccountService.UNKNOWN_USER);
    this._globalEventsManager.showNavBar.emit(false);
    this._router.navigate(['/account']);
  }


  withoutApiLogin(email : string)
  {
    const subject = new Subject<any>();
      this._globalEventsManager.showNavBar.emit(true);
      const authInfo = new AuthInfo(email);
      this.authInfo$.next(authInfo);
      subject.next(authInfo);
      subject.complete();
      this._router.navigate(['/mytimesheet']);
       this._notificationService.popToastSuccess('Welcome','User has authenticated to use this site');
  }
  afterLoginResponce(data : Login)
  {
   
    // This is observable after responce , I am saving user responce in authinfo 
      const subject = new Subject<any>();
      this._globalEventsManager.showNavBar.emit(true);
      const authInfo = new AuthInfo(data.email);
      this.authInfo$.next(authInfo);
      subject.next(authInfo);
      subject.complete();
      this._router.navigate(['/mytimesheet']);
       this._notificationService.popToastSuccess('Welcome','User has authenticated to use this site');
  
  }
}

