import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, Observable, throttleTime } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { registerAction } from 'src/app/store/actions/reg.action';
import {
  isLoggingInSelector,
  isSubmittingSelector,
  validationSelector,
} from 'src/app/store/selectors/selectors';
import { IregRequest } from 'src/app/models/reg-request.interface';
import { IbackendErrors } from 'src/app/models/backend-errors.interface';

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
  validatinServer$!: Observable<IbackendErrors | any>;
  validName!: string | null;
  validEmail!: string | null;
  isLoggingIn$!: Observable<boolean | null>;

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
          Validators.pattern(/[A-ZА-Яа-я]+[^\s]*/),
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
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.validatinServer$ = this.store.pipe(
      select(validationSelector),
      map((validationSelector) => {
        if (validationSelector) {
          this.validName = validationSelector['username'].reduce(
            (result, current) => result + current
          );
          this.validEmail = validationSelector['email'].reduce(
            (result, current) => result + current
          );
        }
      })
    );
    this.isLoggingIn$ = this.store.pipe(select(isLoggingInSelector));
  }
}
