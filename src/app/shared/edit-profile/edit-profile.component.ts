import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'src/app/utils';

import { Router, RouterModule, NavigationExtras  } from '@angular/router';
import { LoginService } from 'src/app/services';
import { UtentiService } from 'src/app/services/utenti.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { registrationModelRequest } from 'src/app/models/registration.model';



/** Componente per il bottone di creazione nuovo utente */
@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, RouterModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfile {
 user:boolean=false;
  private email:string='';
  private anagraphic:any;
  anagraphicForm:FormGroup;
  userForm:FormGroup;
  private id:number=0;
  private anagraphicToSave!:registrationModelRequest;

  genders: Gender[] = [
    {value: 'MALE', viewValue: 'Uomo'},
    {value: 'FEMALE', viewValue: 'Donna'},
  ]
  
  constructor(
    private router:Router, 
    private utentiService: UtentiService,
    private loginService:LoginService,
    private fb: FormBuilder,
    ){
      this.anagraphicForm = this.fb.group({
        id:0,
        name:"",
        surname:"",
        gender:"",
        date:"",
        nation:"",
        province:"",
        city:"",
        address:"", 
        user:"." 
      });
      this.userForm = this.fb.group({
        email:"",
        password:"",
        confirm:""
      });
    }

  ngOnInit(){
    this.email = this.loginService.getUtenteSessione().email;
    this.utentiService.getAnagByMail(this.email).subscribe({
      next:(res) => {
        this.setEdit(res);
        this.anagraphic = res;
        this.id = res.id;
        console.log(this.id);
        this.userForm.patchValue({
          id:res.user.id,
          email:res.user.email,
        });

        if (res.user.usertype === "USER"){
          this.user=true;
        }
      },
    });
    
  }

  setEdit(anagraphic:any){
    this.anagraphicForm = this.fb.group({
      id:anagraphic.id,
      name:anagraphic.name,
      surname:anagraphic.surname,
      gender:anagraphic.gender,
      date:anagraphic.birth_date,
      nation:anagraphic.nationality,
      province:anagraphic.province,
      city:anagraphic.city,
      address:anagraphic.address,
      user:"."
    });
  }

  save(){
    if(this.userForm.value.password !== ''){
        if(this.userForm.value.password !== this.userForm.value.confirm){
          return;
        }
    }
    
    this.anagraphicForm.patchValue({
      user : this.userForm.value,
    }); 
    this.anagraphicToSave = this.anagraphicForm.value;
    console.log(this.anagraphicToSave);
    this.utentiService.saveAnagraphic(this.anagraphicToSave).subscribe({
      next:(res) => {
        this.router.navigateByUrl('/gestionale/adminprofile');
      },
    });
  }

  delete(){
    this.utentiService.delete(this.id).subscribe({
      next:(res) => {
        this.loginService.logout();
      },
    });
  }

  hidePassword = true;

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  hideConfirmPassword = true;

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
}

interface Gender {
  value: string;
  viewValue: string;
}
