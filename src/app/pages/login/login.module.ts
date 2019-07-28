



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ComponentsModule } from '../../components/components.module';

const routes:Routes = [
  {
    path: '',
    component: LoginComponent,
    children:[
      {
        path:'',
        component: LoginFormComponent
      },
      {
        path: 'password-recovery',
        component: PasswordRecoveryComponent
      
      }
    ]
  },  

]


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginFormComponent,LoginComponent,PasswordRecoveryComponent, LoginFormComponent]
})
export class LoginModule { }
