import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from 'src/app/helpers/auth';
import { setRole } from 'src/app/helpers/session-storage';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./../login.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  auth!:Auth;

  constructor(
    private fb:FormBuilder,
    private route:Router,
    private authService:AuthService,
    //private loginService:LoginService,
    private activatedRoute:ActivatedRoute
    ) { 
      this.signupForm = this.fb.group ({
        email: '',
        userName:'',
      })
    }

ngOnInit(): void {
  this.signupForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    userName: [null, [Validators.required]]
    });
}
  submitForm(): void {
    for (const i in this.signupForm.controls) {
      if (this.signupForm.controls.hasOwnProperty(i)) {
        this.signupForm.controls[i].markAsDirty();
        this.signupForm.controls[i].updateValueAndValidity();
      }
    }
    if(this.signupForm.valid){
      this.authService.register(this.signupForm.value.email, this.signupForm.value.userName);
      if(this.auth){
        console.log(this.signupForm.value);
        console.log(this.auth);
        setRole(this.auth.token);
        let returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
        this.route.navigateByUrl(returnUrl);
      }
       
    }
  }

  // updateConfirmValidator(): void {
  //   /** wait for refresh value */
  //   Promise.resolve().then(() => this.signupForm.controls.checkPassword.updateValueAndValidity());
  // }

  // confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
  //   if (!control.value) {
  //     return { required: true };
  //   } else if (control.value !== this.signupForm.controls.password.value) {
  //     return { confirm: true, error: true };
  //   }
  //   return {};
  // };



}
