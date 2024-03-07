import {Component} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, AbstractControl} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { SigninService } from 'src/app/services/signin.service';
import { PanelService } from 'src/app/services';
import { registrationModelRequest } from 'src/app/models/registration.model';

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
  styleUrls: ['registration.component.scss'],
  providers: [],

  standalone: true,
  imports: [
    CommonModule,
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
  usertypes: String[] = ["ADMIN", "USER"];

  registrationUserForm = this._formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirm_password: ['', Validators.required],
    usertype: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    date: ['', Validators.required],
    gender: ['', Validators.required],
    nationality: ['', Validators.required],
    province: ['', Validators.required],
    city: ['', Validators.required],
    address: ['', Validators.required],
  
  });
  isLinear = true;
  constructor(
    private _formBuilder: FormBuilder,
    private dialog:Dialog,
    private panelService:PanelService,
    private router:Router,
    private signinService:SigninService
    ) {
    
      


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

  backToLogin(): void {
    this.dialog.closeAll();
    if (this.panelService.componentRef) {
      this.panelService.close();
    }
    if (this.panelService.parentComponentRef) {
      this.panelService.parentComponentRef.instance.closeDialog();
    }
    this.router.navigateByUrl("/login");
  }

  signup():void{
    
  }

}
    


    export function route(): any {
    throw new Error("Function not implemented.");
}