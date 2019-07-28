import { AuthenticationService } from './../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 loginForm:FormGroup;
  inProgress:boolean;
  message:string;

  constructor(private fb:FormBuilder,private authService:AuthenticationService) {
   }

  ngOnInit(): void {
    this.inProgress = false;
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  tryLogin(){
    
    
    this.authService.login(this.loginForm.value.username,this.loginForm.value.password)
  }

}
