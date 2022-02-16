import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, throttleTime } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { isSubmittingSelector } from 'src/app/store/selectors/selectors';
import { IauthRequest } from 'src/app/models/auth-request.interface';
import { loginAction } from 'src/app/store/actions/login.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  hide = true;
  formValid = false;
  regForm!: FormGroup;
  isSubmitting$!: Observable<boolean>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initForm();
    this.initValues();
  }

  initForm(): void {
    this.regForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/[A-Z]+[^\s]*/),
        ],
      ],
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.regForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  onSubmit(): void {
    const controls = this.regForm.controls;
    if (this.regForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    const request: IauthRequest = {
      user: this.regForm.value,
    };
    this.store.dispatch(loginAction({ request }));
  }

  initValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
  }
}
