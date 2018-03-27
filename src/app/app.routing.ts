import {AppMainpage} from './mainpage';
import {Routes, RouterModule} from "@angular/router";
import {AuthGuard} from "./guard";
import {AppLogout} from "./logout";
import {AppLogin} from "./login";
import {AppAssignTask} from './assign-tasks';
import {AppEmployeesReports} from './employees-reports';
import {AppMyReports} from './my-reports';

const appRoutes: Routes = [
  {path: 'main', component: AppMainpage},
  {path: 'login', component: AppLogin},
  {path: 'logout', component: AppLogout},
  {path: 'my-reports', component: AppMyReports, canActivate: [AuthGuard]},
  {path: 'employees-reports', component: AppEmployeesReports, canActivate: [AuthGuard]},
  {path: 'assign-tasks', component: AppAssignTask, canActivate: [AuthGuard]},

  {path: '**', redirectTo: 'login'}
];

export const routing = RouterModule.forRoot(appRoutes);
