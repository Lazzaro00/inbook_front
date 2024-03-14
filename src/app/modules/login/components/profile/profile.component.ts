import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ICON_CONSTANT, INPUT_CONSTANT, LABEL_CONSTANT, RESULT_CONSTANT, TABLE_COLUMNS } from 'src/app/constants';
import { AngularMaterialModule } from "src/app/utils";
import { GenericTableComponent } from "src/app/shared/generic";
import { ActivatedRoute, Router } from '@angular/router';
import { GenericTableService, LoaderSpinnerService, LoginService } from 'src/app/services';
import { ImpiantiService } from 'src/app/services/impianti.service';
import { MatDialog } from '@angular/material/dialog';
import { UtentiComponent } from '../utenti/components/utenti/utenti.component';
import { UtentiService } from 'src/app/services/utenti.service';
import { AnagraficaComponent } from '../anagrafica/components/anagrafica/anagrafica.component';
import { AnagraficaService } from 'src/app/services/anagrafica.service';
import { InserisciUtenteComponent } from '../utenti/components/inserisci-utente/inserisci-utente.component';
import { ModificaAnagraficaComponent } from '../anagrafica/components/modifica-anagrafica/modifica-anagrafica.component';
import { InserisciAnagraficaComponent } from '../anagrafica/components/inserisci-anagrafica/inserisci-anagrafica.component';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.scss'],
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
  uData : any;
  aData : any;

  cellHeadTypes = {
    id: "text",
    username: "text",
    usertype: "text",
    nome: "text",
    cognome: "text",
    indirizzo: "text",
    luogoNascita: "text",
    dataNascita: "text",
  };
  actionCredenziali: { title: string; icon: string; type: string; callback: () => void; }[] | undefined;
  actionAnagrafica: { title: string; icon: string; type: string; callback: () => void; }[] | undefined;

  constructor(
    private genericTableService: GenericTableService,
    private loaderSpinnerService: LoaderSpinnerService,
    private loginService: LoginService,
    private utentiService: UtentiService,
    private anagraphicService: AnagraphicService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router){}

    ngOnInit(){
      this.getData();
    }

    async getData(){
      this.uData = await this.utentiService.getUserByMail(this.loginService.getUtenteSessione().email).toPromise();
      this.aData = await this.anagraphicService.findByUserId(this.uData.id).toPromise();
      const actionCredenziali = [
         {
           title: "Modifica Credenziali",
           icon: ICON_CONSTANT.edit,
           type: "icon",
           callback: () => this.modificaUtente(this.uData.id),
         },
      ];
      const actionAnagraphic = [
         {
           title: "Modifica Anagrafica",
           icon: ICON_CONSTANT.edit,
           type: "icon",
           callback: () => this.modificaAnagrafica(this.aData.id),
         },
      ];
      const actionInsertAnagraphic = [
        {
          title: "Inserisci Anagrafica",
          icon: ICON_CONSTANT.edit,
          type: "icon",
          callback: () => this.inserisciAnagrafica(),
        },
     ];
      this.actionCredenziali = actionCredenziali;
      if (this.aData !== null)
        this.actionAnagrafica = actionAnagraphic;
      else 
        this.actionAnagrafica = actionInsertAnagraphic;
     }
     

modificaUtente(id: number){
  this.dialog.open(InserisciUtenteComponent,{
    width: '660px',
    height: '400px',
    disableClose: true,
  }).componentInstance.setModifica(id);
}

modificaAnagrafica(id: number){
  this.dialog.open(ModificaAnagraficaComponent, {
    width: '660px',
    height: '400px',
    disableClose: true,
  }).componentInstance.setModificaAnagrafica(id);
}    

inserisciAnagrafica(){
  this.dialog.open(ModificaAnagraficaComponent, {
    width: '660px',
    height: '400px',
    disableClose: true,
  }).componentInstance.setModificaAnagrafica(0);
}    

    
}
