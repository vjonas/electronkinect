import { UserService } from './services/user.service';
import { TimerService } from './services/timer.service';
import { ExerciseService } from './services/exercise.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component/home.component';
import { LoginComponent } from './components/authentication/login.component/login.component';
import { RegisterComponent } from './components/authentication/register.component/register.component';
import { ResetPasswordComponent } from './components/authentication/reset-password.component/reset-password.component';
import { ResetConfirmationComponent } from './components/authentication/reset-confirmation.component/reset-confirmation.component';

import { KinectService } from './services/kinect.service';
import { DrawCanvasService } from './services/drawcanvas.service';
import { AngularFireModule } from 'angularfire2';
import { AuthGuard } from './services/auth.service';


// routes variabelen
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
  // PageNotFound { path: '**', component: PageNotFoundComponent }
];

export const firebaseConfig = {
  apiKey: "AIzaSyDt80FBi9Tver1DAEljAAhJKE7P8KR3EIA",
  authDomain: "stagekinect2.firebaseapp.com",
  databaseURL: "https://stagekinect2.firebaseio.com",
  projectId: "stagekinect2",
  storageBucket: "stagekinect2.appspot.com",
  messagingSenderId: "595627469769"
}

@NgModule({
  //component declarations
  declarations: [
    AppComponent, HomeComponent, LoginComponent, RegisterComponent, ResetPasswordComponent, ResetConfirmationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { useHash: true }), //
    AngularFireModule.initializeApp(firebaseConfig)

  ],
  //services
  providers: [HashLocationStrategy, KinectService, DrawCanvasService, AuthGuard,ExerciseService,UserService,TimerService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // to clear the router-outlet test, else it fails

})
export class AppModule { }
