import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from 'src/app/helpers/auth';
import { setRole } from 'src/app/helpers/session-storage';
import { LoginService } from 'src/app/services/login.service';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auth!:Auth;
  loginForm!: FormGroup;
  
  constructor(private fb:FormBuilder,
              private loginService:LoginService,
              private authService:AuthService,
              private route:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
      
    });
  }
  submit(){
    this.submitForm();
  }
  submitForm(): void {
    if(this.loginForm.valid){
      // if(this.loginForm.value.password===this.auth.password){
      // setRole(this.auth.token);
        console.log('submit', this.loginForm.value);
        this.authService.login(this.loginForm.value.userName, this.loginForm.value.password).subscribe((auth)=>this.auth=auth);
        //this.loginService.getUserInfo(this.loginForm.val ue.userName).subscribe((auth)=>this.auth=auth);
          if(this.auth){
            console.log(this.loginForm.value);
            console.log(this.auth);
            setRole(this.auth.token);
            let returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
            this.route.navigateByUrl(returnUrl);
          } 
        } else {
          Object.values(this.loginForm.controls).forEach(control => {
            if (control.invalid) {
              control.markAsDirty();
              control.updateValueAndValidity({ onlySelf: true });
            }
          });
        }
  }
}

