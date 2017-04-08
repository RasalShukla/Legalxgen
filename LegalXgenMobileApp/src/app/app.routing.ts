import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MytimesheetComponent } from './components/timesheet/mytimesheet/mytimesheet.component';
import { NewtimeentryComponent } from './components/timesheet/newtimeentry/newtimeentry.component';
import { AccountComponent } from './components/account/account.component';
import { ConfirmActivateGuard } from './shared/security/confirm-activate-guard';
import { DashboardComponent } from './components/reports/dashboard/dashboard.component';

const appRoutes: Routes = [
      { path:'',redirectTo:'/account',pathMatch:'full' },
      { path: 'account', component: AccountComponent, pathMatch:'full' },
      { path: 'mytimesheet', component: MytimesheetComponent,canActivate: [ConfirmActivateGuard] },
      { path: 'newtimeentry', component: NewtimeentryComponent,canActivate: [ConfirmActivateGuard] },
       { path: 'dashboard', component: DashboardComponent,canActivate: [ConfirmActivateGuard] },
      { path: '',   component: MytimesheetComponent },
      { path: '**', component: MytimesheetComponent }   
];




export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);