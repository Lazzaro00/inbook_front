import {Component} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, AbstractControl} from '@angular/forms';
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
  buttonDisabled:boolean = true;

  registrationUserForm = this._formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirm_password: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  constructor(private _formBuilder: FormBuilder) {

    var confirmPassword = this.registrationUserForm.get("confirm_password")

    if(confirmPassword != null){
    confirmPassword.valueChanges.subscribe(x => {
      if(this.registrationUserForm.value.password == this.registrationUserForm.value.confirm_password){
        console.log("UGUALE", this.buttonDisabled)
        this.buttonDisabled = true;
      }else{
        this.buttonDisabled = false;
      }
      
   })
  }

}
}
  
  export function route(): any {
  throw new Error("Function not implemented.");
}

