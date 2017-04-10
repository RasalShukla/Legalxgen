import { OpaqueToken } from "@angular/core";
import { IAppConfig } from "./iapp.config"

export let APP_CONFIG = new OpaqueToken("app.config");

export const AppConfig: IAppConfig = {  
    apBaseUrl: "http://localhost:51289/api/",
    apiAccontEndpoint: "http://localhost:51289/api/account" ,
    apiTimeEntryEndpoint: "http://localhost:51289/api/timeentry" ,
    apiMyTimeSheetEndPoint: "http://localhost:51289/api/mytimesheet" ,
};