import {AppMainpage} from './mainpage';
import {Routes, RouterModule} from "@angular/router";
import {AuthGuard} from "./guard";
import {AppLogout} from "./logout";
import {AppLogin} from "./login";

const appRoutes: Routes = [
  {path: 'main', component: AppMainpage, canActivate: [AuthGuard]},
  {path: 'login', component: AppLogin},
  {path: 'logout', component: AppLogout},

  {path: '**', redirectTo: 'login'}
];

export const routing = RouterModule.forRoot(appRoutes);
