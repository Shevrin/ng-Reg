import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { registerAction } from 'src/app/store/actions/reg.action';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss'],
})
export class RegComponent implements OnInit {
  regForm!: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private store: Store) {}

  getErrorMessage() {
    // if (this.email.hasError('required')) {
    //   return 'You must enter a value';
    // }
    // return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  // <mat-error *ngIf="email.invalid">{{getErrorMessage()}}</mat-error>

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.regForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
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

  onSubmit() {
    const controls = this.regForm.controls;

    if (this.regForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    /** TODO: Обработка данных формы */
    console.log(this.regForm.value);
    this.store.dispatch(registerAction(this.regForm.value));
  }

  // isControlTouched(controlName: string): boolean {
  // const control = this.regForm.controls[controlName];
  // const result = control.dirty;
  // console.log(control.pristine);
  // console.log(control.touched);

  // return result;
  // }
}
