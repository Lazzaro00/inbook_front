import {Component} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, AbstractControl} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { Route } from '@angular/router';
import { RouterModule } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

interface Gender {
  value: string;
  viewValue: string;
}
/**
 * @title Stepper overview
 */
@Component({
  selector: 'app-registration',
  templateUrl: 'registration.component.html',
  styleUrl: 'registration.component.scss',
  providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [
    MatSelectModule,
    MatDatepickerModule,
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
  buttonDisabled:boolean = true;
  genere: Gender[] = [
    {value: 'Male', viewValue: 'Uomo'},
    {value: 'Female', viewValue: 'Donna'},
  ]
  registrationUserForm = this._formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirm_password: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    nome: ['', Validators.required],
    cognome: ['', Validators.required],
    datadinascita: ['', Validators.required],
    genere: ['', Validators.required],
    nazionalita: ['', Validators.required],
    provincia: ['', Validators.required],
    cdr: ['', Validators.required],
    idr: ['', Validators.required],
  
  });
  isLinear = true;

  constructor(private _formBuilder: FormBuilder) {

  this.registrationUserForm.valueChanges.subscribe(() => {
        const password = this.registrationUserForm.get('password')?.value;
        const confirmPassword = this.registrationUserForm.get('confirm_password')?.value;
  
        if (password === confirmPassword) {
          this.buttonDisabled = false;
        } else {
          this.buttonDisabled = true;
        }
      });
  
  }
}
  
  export function route(): any {
  throw new Error("Function not implemented.");
}

