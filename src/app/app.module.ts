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
import { AppRoutingModule } from "./app.routing.module";

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component/home.component';
import { LoginComponent } from './components/authentication/login.component/login.component';
import { RegisterComponent } from './components/authentication/register.component/register.component';
import { ResetPasswordComponent } from './components/authentication/reset-password.component/reset-password.component';
import { ResetConfirmationComponent } from './components/authentication/reset-confirmation.component/reset-confirmation.component';
import { ProgressbarComponent } from './components/progressbar.component/progressbar.component';
import { ExercisesComponent } from './components/exercises.component/exercises.component';
import { NoProgramComponent } from './components/no-program.component/no-program.component';
import { CompletedExerciseComponent } from './components/completed-exercise.component/completed-exercise.component';
 
import { KinectService } from './services/kinect.service';
import { DrawCanvasService } from './services/drawcanvas.service';
import { JointService } from "./services/joint.service";
import { AngularFireModule } from 'angularfire2';
import { AuthGuard } from './services/auth.service';


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
    AppComponent, HomeComponent, LoginComponent, RegisterComponent, ResetPasswordComponent, ResetConfirmationComponent,ProgressbarComponent, ExercisesComponent, NoProgramComponent, CompletedExerciseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule, //
    AngularFireModule.initializeApp(firebaseConfig)

  ],
  //services
  providers: [HashLocationStrategy, KinectService, DrawCanvasService, AuthGuard,ExerciseService,UserService,TimerService, JointService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // to clear the router-outlet test, else it fails

})
export class AppModule { }
