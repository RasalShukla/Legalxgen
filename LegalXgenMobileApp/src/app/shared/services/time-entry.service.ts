import { Injectable, Inject } from '@angular/core';
import { Http , Headers, RequestOptions} from '@angular/http'
import {Observable, BehaviorSubject, Subject} from "rxjs/Rx";
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service'
import { xhrHeaders } from "./xhr-headers";
import { TimeEntry } from  '../model/timeEntry';
import { State } from  '../model/states';
import 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { APP_CONFIG } from '../../app.config';
import { IAppConfig }  from '../../iapp.config';
/**
 * Time entry service class , which deals with all the http operation and make 
 * server side connection to access data from server side 
 */
@Injectable()
export class TimeEntryService {
    public state: State[];
    public baseUrl: string;

    
    /**
     * @param  {Http} private_http
     * @param  {Router} private_route
     * @param  {NotificationService} private_notificationService
     * @param  {IAppConfig} private_config
     */
    constructor( private _http: Http,
                 private _route: Router,
                 private _notificationService: NotificationService,
                 @Inject(APP_CONFIG) private _config: IAppConfig) {
                     this.baseUrl = this._config.apiTimeEntryEndpoint;
                 }
    
    /**
     * function to create new time entry
     * @param  {TimeEntry} timeEntry
     */
    createTimeEntry(timeEntry: TimeEntry) {
        return this._http.post(this.baseUrl, timeEntry, xhrHeaders)
            .map((res => res.json())).subscribe(
                response => console.log(response),
                err => console.log("An Error Occured While Processing Your Request"));

    }
    
  /**
   * function to delete time entry by its id
   * @param  {string} id
   * @returns Observable
   */
  public deleteTimeEntryById(id: string) : Observable<any> {
        return this._http.delete(this.baseUrl + "/" + id).map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


   /**
    * function to update time entry by its id
    * @param  {number} id
    * @param  {TimeEntry} timeEntry
    */
   public updateTimeEntry(id: number, timeEntry: TimeEntry) {
        return this._http.put(this.baseUrl + "/" + id, timeEntry, xhrHeaders)
            .map(res => res.json()).subscribe(
                res => console.log(res),
                err => console.log(err)
            )
    }
    
    /**
     * function to load all time entry 
     * @returns Observable
     */
    public loadAllTimeEntry(): Observable <TimeEntry[]> {
        return this._http.get(this.baseUrl).map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

   /**
    * function to load time entry by its id 
    * @param  {} id
    * @returns Observable
    */
   public loadTimeEntryById(id): Observable <TimeEntry> {
        return this._http.get(this.baseUrl + "/" + id).map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    
   /**
    * function to search typeahead data by search value
    * @param  {string} searchValue
    */
   public loadTypeAheadBySearchString(searchValue: string) {
        return this._http.get(this.baseUrl + "/" + "GetTypeAheadBySearchString?searchValue=" + searchValue)
            .map(res => < State[] > res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}

