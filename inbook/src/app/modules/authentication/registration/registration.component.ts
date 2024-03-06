import {Component} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { Route } from '@angular/router';
import { RouterModule } from '@angular/router';

/**
 * @title Stepper overview
 */
@Component({
  selector: 'app-registration',
  templateUrl: 'registration.component.html',
  styleUrl: 'registration.component.scss',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class RegistrationComponent {
  registrationUserForm = this._formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirm_password: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  constructor(private _formBuilder: FormBuilder) {}

  isNameValid() {
    return this.registrationUserForm.pristine || this.registrationUserForm.valid;
}
}

export function route(): any {
  throw new Error("Function not implemented.");
}
