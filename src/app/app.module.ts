import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component/home.component';

import { KinectService } from './services/kinect.service';
import { DrawCanvasService } from './services/drawcanvas.service';

// routes variabelen
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  /*{ path: 'register', component: RegisterComponent },
  { path: 'room/:id', component: RoomComponent },*/
  // { path: 'login', component: LoginComponent },
  /* { path: 'public-rooms', component: PublicRoomsComponent },
   { path: 'login', component: LoginComponent },*/
  { path: '', redirectTo: '/home', pathMatch: 'full' }
  // PageNotFound { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent, HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { useHash: true }) //

  ],
  //services
  providers: [HashLocationStrategy, KinectService, DrawCanvasService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // to clear the router-outlet test, else it fails

})
export class AppModule { }
