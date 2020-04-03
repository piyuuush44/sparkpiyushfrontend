import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {HomeComponent} from './core/home/home.component';
import {NavbarComponent} from './core/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {routes} from './app-routes';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AuthGuard} from './auth/auth.guard';
import {AuthService} from './auth/auth.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatButtonModule,
    FormsModule,
    RouterModule.forRoot(routes),
    MatToolbarModule
  ],
  providers: [
    AuthGuard, AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
