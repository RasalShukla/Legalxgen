import { Injectable } from '@angular/core';
import { Http , Headers, RequestOptions} from '@angular/http'
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Observable, BehaviorSubject, Subject} from "rxjs/Rx";
import { AuthInfo } from "../../shared/globalUserInfo";
import { GlobalEventsManager } from '../../globalEventManager';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../services/notification.service'
import {xhrHeaders} from "./xhr-headers";
import { MyTimeSheet } from  '../model/myTimeSheet';
import 'rxjs/Rx';


@Injectable()
export class MyTimeSheetService {
   baseUrl: string = "http://localhost:51289/api/MyTimeSheet";
   constructor(private  _http: Http,
              private _route: Router,
              private _notificationService: NotificationService) { }

   loadMyTimeSheetByDayId(dayId : number){
      return this._http.get(this.baseUrl+ "/" + "GetMyTimeSheetDataByDayId?dayId=" + dayId)
      .map(res => <MyTimeSheet[]> res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }

  

  
}

