import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
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
@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    AppfooterComponent,
    AppmenuComponent,
    NewtimeentryComponent,
    MytimesheetComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing,
    DatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ToasterModule
  ],
  providers: [
    GlobalEventsManager,
    AccountService,
    NotificationService,
    ConfirmActivateGuard,
    AlertService,
    [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
