import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule,Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppheaderComponent } from './components/appheader/appheader.component';
import { AppfooterComponent } from './components/appfooter/appfooter.component';
import { AppmenuComponent } from './components/appmenu/appmenu.component';
import { NewtimeentryComponent } from './components/timesheet/newtimeentry/newtimeentry.component';
import { MytimesheetComponent } from './components/timesheet/mytimesheet/mytimesheet.component';
import { Routing } from './app.routing';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DatepickerModule } from 'ng2-bootstrap';
import { AccountComponent } from './components/account/account.component';
import { GlobalEventsManager } from './globalEventManager';
import { AccountService } from './shared/services/account.service'
import { ToasterModule, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { NotificationService } from './shared/services/notification.service';
import { AlertService } from './shared/services/alert.service';
import { ConfirmActivateGuard } from './shared/security/confirm-activate-guard';
import { TimeEntryService }    from './shared/services/time-entry.service';
import { TypeaheadModule } from 'ng2-bootstrap';
import {enableProdMode} from '@angular/core';
import { MyTimeSheetService } from './shared/services/myTimeSheet.service';
import { DashboardComponent } from './components/reports/dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { APP_CONFIG, AppConfig } from './app.config';

// enable production mode
enableProdMode();


@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    AppfooterComponent,
    AppmenuComponent,
    NewtimeentryComponent,
    MytimesheetComponent,
    AccountComponent,
    DashboardComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing,
    FormsModule,
    ReactiveFormsModule,
    ToasterModule,
    ChartsModule,
    TypeaheadModule.forRoot()
   ],
  providers: [
    GlobalEventsManager,
    AccountService,
    NotificationService,
    ConfirmActivateGuard,
    TimeEntryService,
    AlertService,
    MyTimeSheetService,
    [{ provide: APP_CONFIG, useValue: AppConfig }],
    [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
