import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { HomeComponent } from './components/home.component/home.component';
import { LoginComponent } from './components/authentication/login.component/login.component';
import { RegisterComponent } from './components/authentication/register.component/register.component';
import { ResetPasswordComponent } from './components/authentication/reset-password.component/reset-password.component';
import { NoProgramComponent} from './components/no-program.component/no-program.component';
 
import { AuthGuard } from './services/auth.service';

// routes variabelen
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'no-program', component: NoProgramComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
  // PageNotFound { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}