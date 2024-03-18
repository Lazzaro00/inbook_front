import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { SigninService } from 'src/app/services/signin.service';
import { PanelService } from 'src/app/services';
import { registrationOk } from 'src/app/shared/registrationOk/registrationOk.component';
import { MatDialog } from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { LibraryService } from 'src/app/services/library.service';

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
    MatButtonToggleModule,
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
  mostra:boolean = true;
  isUser:boolean = false;
  newLib:boolean = true;
  newLibrary:boolean = true;
  libraryLit: any[] = [];

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
  thirdFormGroup = this._formBuilder.group({
    id:[],
    name: ['', Validators.required],
    description: ['', Validators.required],
    province: ['', Validators.required],
    city: ['', Validators.required],
    address: ['', Validators.required],
    password: ['', Validators.required],
  })

  fourthFormGroup = this._formBuilder.group({
    library: [''],
    password: [''],
  })
  isLinear = true;
  constructor(
    private _formBuilder: FormBuilder,
    private dialog:MatDialog,
    private panelService:PanelService,
    private router:Router,
    private signinService:SigninService,
    private libraryService: LibraryService
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

  ngOnInit(){
    this.libraryService.getall().subscribe({
      next: (res) => {
        this.libraryLit = res;
      }
    })
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
    console.log("entrato nel signin")
    let second = this.secondFormGroup.value;
    let first = this.registrationUserForm.value;
    let payload = {
    image: null,
    name: String(second.name),
    surname: String(second.surname),
    user: {
      email: String(first.email),
      password: String(first.password),
      usertype: String(first.usertype)
    },
    birth_date: String(second.date),
    gender: String(second.gender),
    nationality: String(second.nationality),
    province: String(second.nationality),
    city: String(second.city),
    address: String(second.address),
  
    }

    console.log(payload);
    this.signinService.signin(payload).subscribe({
      next: () => {
        if(this.isUser){
          this.dialog.open(registrationOk, {
            width: '660px',
            height: '420px',
            disableClose: true,
          }).afterOpened().subscribe({
            next: () => {
              this.mostra = false;
            }
          });

        }
      },

      error: (e) => {console.log(e)}
    });
  }

  bibliotec(){
    let user = this.registrationUserForm.value;
    let payload = { ...this.thirdFormGroup.value, 
    user:{
      mail:user.email, 
      password: null,
      usertype: null
    }};

    console.log(payload)
    this.signinService.registerBiblioteca(payload).subscribe({
      next: () => {
        this.dialog.open(registrationOk, {
          width: '660px',
          height: '420px',
          disableClose: true,
        }).afterOpened().subscribe({
          next: () => {
            this.mostra = false;
          }
        });

      }, 

      error: (e) => (console.error("errore registerbibl:", e))
    })
  }

  insertExistLibrary(){
    let payload = this.fourthFormGroup.value;
    this.libraryService.insertExistLibrary(payload).subscribe({
      next: (res) => {
        console.log("verifica andata a buon fine")
      }, 
      error: (e) => {console.error("errore: " + e)}
    });
  }

  whatisusert(value: any){
    console.log("entrato nel whatisudert")
    if(value === "ADMIN"){
      this.isUser = false;
    }else if(value === "USER"){
      this.isUser = true;
    }else{
      console.error("Nessun valore tovato!")
    }
  }

  onToggleChange(event: any) {
    console.log('Toggle cambiato:', event.value);
    // Qui puoi eseguire azioni in base al toggle selezionato
    if (event.value === 'existingLibrary') {
      console.log("esiste")
      this.newLibrary = true;
      this.newLib = false;
    } else if (event.value === 'notExistingLibrary') {
      console.log("non esiste")
      this.newLibrary = false;
      this.newLib = true;
    }
  }


}
    


    export function route(): any {
    throw new Error("Function not implemented.");
}