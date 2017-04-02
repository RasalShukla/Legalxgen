import { Injectable } from '@angular/core';
import { Http , Headers, RequestOptions} from '@angular/http'
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
import { TimeEntry } from  '../model/timeEntry';
import 'rxjs/Rx';


@Injectable()
export class TimeEntryService {
  
  public responce:any;
   baseUrl: string = "localhost:51289/api/timeentry/";
  constructor(private  _http: Http,
              private _route: Router,
              private _notificationService: NotificationService) { }

createTimeEntry(timeEntry : TimeEntry){
         let body = JSON.stringify(timeEntry);
         return this._http.post(this.baseUrl, body, xhrHeaders)
                         .map((res => res.json())).subscribe(
                           response=> console.log(response),
                           err => console.log("An Error Occured While Processing Your Request"));
                       
    }   

    deleteTimeEntryById (id:string) {
         this._http.delete(this.baseUrl + id,xhrHeaders).
                         map((res => res.json())).subscribe(
                         response=> console.log(response),
                         err => console.log("An Error Occured While Processing Your Request"));
                         //  after that loadTime Entry Function So that grid should be reefreshed automatically
                                              
    }  

   

     updateTimeEntry (body: Object) {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
         let id = body['timeEntryId'];
        return this._http.put(`${this.baseUrl}${id}`, body, options) // ...using put request
                         .map(res => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }   


  

  
}

