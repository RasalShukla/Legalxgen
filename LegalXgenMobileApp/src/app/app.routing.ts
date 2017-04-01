import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MytimesheetComponent } from './components/timesheet/mytimesheet/mytimesheet.component';
import { NewtimeentryComponent } from './components/timesheet/newtimeentry/newtimeentry.component';
import { AccountComponent } from './components/account/account.component';

const appRoutes: Routes = [
      { path:'',redirectTo:'/account',pathMatch:'full' },
      { path: 'account', component: AccountComponent, pathMatch:'full' },
      { path: 'mytimesheet', component: MytimesheetComponent },
      { path: 'newtimeentry', component: NewtimeentryComponent },
      { path: '',   component: MytimesheetComponent },
      { path: '**', component: MytimesheetComponent }   
];




export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);