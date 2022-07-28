import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from 'src/app/helpers/auth';
import { setRole } from 'src/app/helpers/session-storage';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./../login.component.css']
})
export class ResetComponent implements OnInit {
  resetForm!: FormGroup;
  auth!:Auth;

  constructor(
    private fb:FormBuilder,
    private route:Router,
    private authService:AuthService,
    private activatedRoute:ActivatedRoute ) { 
      this.resetForm = this.fb.group ({
        email: '',
        userName:'',
      })
    }

ngOnInit(): void {
  this.resetForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    userName: [null, [Validators.required]]
    });
}
  submitForm(): void {
    for (const i in this.resetForm.controls) {
      console.log('signup form is invalid');
      if (this.resetForm.controls.hasOwnProperty(i)) {
        this.resetForm.controls[i].markAsDirty();
        this.resetForm.controls[i].updateValueAndValidity();
      }
    }
    if(this.resetForm.valid){
      console.log('signup form is valid');
      this.authService.reset(
        this.resetForm.value.email, this.resetForm.value.userName);
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
