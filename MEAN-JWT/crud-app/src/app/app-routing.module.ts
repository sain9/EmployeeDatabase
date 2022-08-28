import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {ProfileComponent} from './profile/profile.component'

// const token = "eyJhbGciOiJIUzI1NiJ9.NjFhYjM0OWZmYWY4OWJmYTA3OWE1MjRl.NjSZxdiVV_p4UuFX-ZAlRQpj4pamrFoeyhMRGWNRXCA"
// localStorage.setItem('token', token)

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,ProfileComponent,RegisterComponent];
// const isToken = localStorage.getItem('token');
// if(isToken){
//   console.log('employee page accessed')
//   localStorage.clear();
// localStorage.removeItem('token')
//   console.log('tokoen cleared');
// }else{
//   console.log('cannot access')
// }