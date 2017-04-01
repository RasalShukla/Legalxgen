import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppheaderComponent } from './components/appheader/appheader.component';
import { AppfooterComponent } from './components/appfooter/appfooter.component';
import { AppmenuComponent } from './components/appmenu/appmenu.component';
import { NewtimeentryComponent } from './components/timesheet/newtimeentry/newtimeentry.component';
import { MytimesheetComponent } from './components/timesheet/mytimesheet/mytimesheet.component';
import { Routing } from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    AppfooterComponent,
    AppmenuComponent,
    NewtimeentryComponent,
    MytimesheetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
