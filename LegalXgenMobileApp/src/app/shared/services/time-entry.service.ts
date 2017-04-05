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
  
   baseUrl: string = "http://localhost:51289/api/timeentry";
   constructor(private  _http: Http,
              private _route: Router,
              private _notificationService: NotificationService) { }

createTimeEntry(timeEntry : TimeEntry){
         return this._http.post(this.baseUrl, timeEntry, xhrHeaders)
                           .map((res => res.json())).subscribe(
                          response=> console.log(response),
                           err => console.log("An Error Occured While Processing Your Request"));
                       
    }   

    deleteTimeEntryById (id:string) {
       return  this._http.delete(this.baseUrl +"/" + id).map(res => res.json())
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));                                           
    }  

   

     updateTimeEntry (id :number,timeEntry: TimeEntry) {
        return this._http.put(this.baseUrl + "/" + id, timeEntry, xhrHeaders) 
                         .map(res => res.json()).subscribe(
                           res => console.log(res),
                           err => console.log(err)
                         )                   
    }   

    loadAllTimeEntry() : Observable<TimeEntry[]> {
    return   this._http.get(this.baseUrl).map(res => res.json())
             .catch((error: any) => Observable.throw(error.json().error || 'Server error'));        
  }
  
   loadTimeEntryById(id) : Observable<TimeEntry>
   {
      return this._http.get(this.baseUrl+ "/" + id).map(res => res.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));                    
   }

   loadTypeAheadData() : Observable<string[]>{
      return this._http.get(this.baseUrl+ "/" + "GetTypeAhead").map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }

  

  
}

