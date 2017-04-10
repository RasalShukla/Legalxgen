import { Injectable, Inject } from '@angular/core';
import { Http , Headers, RequestOptions} from '@angular/http'
import {Observable, BehaviorSubject, Subject} from "rxjs/Rx";
import { Router, ActivatedRoute } from '@angular/router';
import {xhrHeaders} from "./xhr-headers";
import { MyTimeSheet } from  '../model/myTimeSheet';
import 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { APP_CONFIG } from '../../app.config';
import { IAppConfig }  from '../../iapp.config';
/**
 * MyTimeSheet service class , which deals with all the http operation and make 
 * server side connection to access data from server side 
 */
@Injectable()
export class MyTimeSheetService {
     public baseUrl: string;
   
    /**
     * @param  {Http} private_http
     * @param  {IAppConfig} private_config
     */
    constructor(private _http: Http,
                 @Inject(APP_CONFIG) private _config: IAppConfig) {
                      this.baseUrl = this._config.apiMyTimeSheetEndPoint;
                 }

    /**
     * function to get Mytimesheet data by its dayId
     * @param  {number} dayId
     * @returns Observable
     */
    public  loadMyTimeSheetByDayId(dayId: number) : Observable<any>  {
        return this._http.get(this.baseUrl + "/" + "GetMyTimeSheetDataByDayId?dayId=" + dayId)
            .map(res => < MyTimeSheet[] > res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}

