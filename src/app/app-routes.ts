import {Routes} from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {AuthGuard} from './auth/auth.guard';

export const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];
