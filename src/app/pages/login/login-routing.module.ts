import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: 'user/login',
    component: LoginComponent
  },
  {
    path: 'user/signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
 