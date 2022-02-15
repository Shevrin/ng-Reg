import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, throttleTime } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { registerAction } from 'src/app/store/actions/reg.action';
import { isSubmittingSelector } from 'src/app/store/selectors/selectors';
import { IregRequest } from 'src/app/models/reg-request.interface';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss'],
})
export class RegComponent implements OnInit {
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
      username: ['', [Validators.required, Validators.minLength(6)]],
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
    const request: IregRequest = {
      user: this.regForm.value,
    };
    this.store.dispatch(registerAction({ request }));
  }

  initValues(): void {
    this.isSubmitting$ = this.store.pipe(
      throttleTime(2000),
      select(isSubmittingSelector)
    );
  }
}
