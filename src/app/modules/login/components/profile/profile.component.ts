import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ICON_CONSTANT, INPUT_CONSTANT, LABEL_CONSTANT, RESULT_CONSTANT, TABLE_COLUMNS } from 'src/app/constants';
import { AngularMaterialModule } from "src/app/utils";
import { GenericTableComponent } from "src/app/shared/generic";
import { ActivatedRoute, Router } from '@angular/router';
import { GenericTableService, LoaderSpinnerService, LoginService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { UtentiService } from 'src/app/services/utenti.service';
import { ImageService } from 'src/app/services/image.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { registrationModelResponse } from 'src/app/models/registration.model';

@Component({
  selector: 'app-profilo',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, GenericTableComponent],
})
export class ProfileComponent {
  resultConstant = RESULT_CONSTANT;
  size = INPUT_CONSTANT.pageSize;
  pageIndex = INPUT_CONSTANT.pageNumber;
  totalElements!: number;
  dataSource!: any;
  displayedColumns :any;
  aData: any;
  
  action: { title: string;text:string; icon: string; type: string; callback: () => void; }[] | undefined;
  imageUrl!: SafeUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private genericTableService: GenericTableService,
    private loaderSpinnerService: LoaderSpinnerService,
    private loginService: LoginService,
    private utentiService: UtentiService,
    private imageService: ImageService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router){}

    ngOnInit(){
      this.getData();
    }

    async getData(){
      try {
        this.aData = await this.utentiService.getAnagByMail(this.loginService.getUtenteSessione().email).toPromise();
        if (this.aData && this.aData.images) {
          this.imageUrl = 'data:image/jpeg;base64,' + this.aData.images
          console.log(this.aData.images);
        } else {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx){
            canvas.width = 200; 
            canvas.height = 200; 
            ctx.fillStyle = 'lightblue'; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            this.imageUrl = canvas.toDataURL();
            }
        }
    
      } catch (error) {
        console.error("Errore durante il recupero dei dati:", error);
      }
    }
    
    
    
     
anagEdit(id: number){
  
}    
    
}
