import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timeStamp } from 'console';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./../login.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private fb:FormBuilder,
    private route:Router,
    //private loginService:LoginService,
    //private activatedRoute:ActivatedRoute
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
      console.log("signupform is valid");     
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
