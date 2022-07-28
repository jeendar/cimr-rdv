import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { nextDay } from 'date-fns';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./../login.component.css']
})
export class SignupComponent implements OnInit {
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  signupForm: any = {
    username: null,
    email: null,
    password: null
  };

  constructor(
    private route:Router, private fb:FormBuilder,
    private authService:AuthService,
    private activatedRoute:ActivatedRoute ) { 
      // this.resetForm = this.fb.group ({
      //   email: '',
      //   userName:'',
      // })
    }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
      });
  }

  onSubmit(): void {
    const { username, email, password } = this.signupForm;
    this.authService.register(username, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
