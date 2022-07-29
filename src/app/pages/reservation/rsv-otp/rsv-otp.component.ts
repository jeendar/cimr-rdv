import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rsv-otp',
  templateUrl: './rsv-otp.component.html',
  styleUrls: ['./rsv-otp.component.css']
})
export class RsvOtpComponent implements OnInit {
  validateForm!: FormGroup;
  codeOTP = '';
  @Output() emitEvent=new EventEmitter<{value:boolean}>();

  onSubmit(): void {
    if (this.validateForm.valid) {
      if (this.validateForm.value.code === "123456") {
        console.log('success: Code OTP validé');
      } else {
        console.log('error: Code OTP invalid');
      } 
      console.log('submit', this.validateForm.value);
      this.router.navigate(['/reservation/recap']);

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      code: [null, [Validators.required]]
    });
  }
}