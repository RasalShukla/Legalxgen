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

@Injectable()
export class AccountService {
   static UNKNOWN_USER = new AuthInfo(null);
    baseUrl: string = "http://localhost:51289/api/account/";
   authInfo$:BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AccountService.UNKNOWN_USER);
public globalEmailData : any;
  //authInfo$:BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(FirebaseAuthentication.UNKNOWN_USER);
  public responce:any;
  constructor(private _http:Http, private _globalEventsManager: GlobalEventsManager,private _router : Router) { }


  login(loginData:Login)  {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(loginData);
     this._http.get(this.baseUrl, body).map((res => res.json()))
     .subscribe(
        (data) => this.afterLoginResponce(data),
        (err) => console.log("Error" + err)
      );
    
   
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
  
  }
}

