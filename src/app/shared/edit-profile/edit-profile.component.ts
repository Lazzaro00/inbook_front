import { Component, Input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { AngularMaterialModule } from 'src/app/utils';

import { Router, RouterModule, NavigationExtras, ActivatedRoute  } from '@angular/router';
import { LoginService } from 'src/app/services';
import { UtentiService } from 'src/app/services/utenti.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { registrationModelRequest } from 'src/app/models/registration.model';
import { NotificationService } from 'src/app/services';


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
 iduser:number=0;
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
    private location:Location, 
    private utentiService: UtentiService,
    private loginService:LoginService,
    private fb: FormBuilder,
    private notifService: NotificationService,
    
    ){
      this.anagraphicForm = this.fb.group({
        id:0,
        name:"",
        surname:"",
        gender:"",
        images:"",
        birth_date:"",
        nationality:"",
        province:"",
        city:"",
        address:"", 
        user:"." 
      });
      this.userForm = this.fb.group({
        email:"",
        password:["", Validators.required],
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
        console.log(res);
        this.userForm.patchValue({
          id:res.user.id,
          email:res.user.email,
        });
        this.iduser = res.user.id;
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
      images:anagraphic.images,
      gender:anagraphic.gender,
      birth_date:anagraphic.birth_date,
      nationality:anagraphic.nationality,
      province:anagraphic.province,
      city:anagraphic.city,
      address:anagraphic.address,
      user:"."
    });
  }

  save(){
    if ((this.userForm.value.password != null && this.userForm.value.password !== "") && this.userForm.value.password === this.userForm.value.confirm){
      let oldUser = this.loginService.getUtenteSessione();
    
    this.anagraphicForm.patchValue({
      user : {id: this.iduser,
              email: this.userForm.value.email,
              usertype: this.anagraphic.user.usertype,
            password: this.userForm.value.password}
    }); 
    
    this.anagraphicToSave = this.anagraphicForm.value;
    console.log(this.anagraphicToSave);
    this.utentiService.saveAnagraphic(this.anagraphicToSave).subscribe({
      next:(res) => {
        if (oldUser.email !== res.user.email){
          this.loginService.setUtenteSession(res.user.email.toString(), oldUser.usertype, res.user.jwt.toString());
        }
        this.location.back();
        
      },})
    } else {
      this.notifService.show("Password e conferma password obbligatori", 5000, "error");
    }
  }

  delete(){
    this.utentiService.delete(this.iduser).subscribe({
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
