import { LoaderService } from './../../../services/loader.service';
import { AuthenticationService } from './../../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

 loginForm:FormGroup;
  inProgress:boolean;
  message:string;

  constructor(private fb:FormBuilder,private authService:AuthenticationService,private loaderService:LoaderService) {
   }

  ngOnInit(): void {
    this.loaderService.loaderIndicatorHandler.subscribe(result => {
      this.inProgress = result;
    })
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  tryLogin(){
    
    
    this.authService.login(this.loginForm.value.username,this.loginForm.value.password)
  }

}
