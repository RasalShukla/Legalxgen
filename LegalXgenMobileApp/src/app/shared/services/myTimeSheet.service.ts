import { Injectable } from '@angular/core';
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


@Injectable()
export class MyTimeSheetService {
    baseUrl: string = "http://localhost:51289/api/MyTimeSheet";
    constructor(private _http: Http) {}

    loadMyTimeSheetByDayId(dayId: number) {
        return this._http.get(this.baseUrl + "/" + "GetMyTimeSheetDataByDayId?dayId=" + dayId)
            .map(res => < MyTimeSheet[] > res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}

