import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ICON_CONSTANT,
  INPUT_CONSTANT,
  LABEL_CONSTANT,
  RESULT_CONSTANT,
  TABLE_COLUMNS,
} from 'src/app/constants';
import { AngularMaterialModule } from 'src/app/utils';
import { GenericTableComponent } from 'src/app/shared/generic';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { deleteuser } from 'src/app/shared/deleteuser/deleteuser.component'
import { GenericTableService, LoaderSpinnerService } from 'src/app/services';
import { UtentiService } from 'src/app/services/utenti.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-lista-utenti',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, GenericTableComponent],
  templateUrl: './lista-utenti.component.html',
  styleUrls: ['./lista-utenti.component.scss'],
})
export default class ListaUtentiComponent {
  /** Costante per la label di risultato vuoto della tabella */
  resultConstant = RESULT_CONSTANT;
  /** La grandezza della pagina */
  size = INPUT_CONSTANT.pageSize;
  /** L'indice della pagina attuale della Tabella */
  pageIndex = INPUT_CONSTANT.pageNumber;
  /** Il totale di elementi della tabella */
  totalElements!: number;
  /** Il dataSource della tabella */
  dataSource!: any;
  /** La lista delle colonne da visualizzare */
  displayedColumns = TABLE_COLUMNS.utenti;
  /** I tipi di celle dell'header */
  cellHeadTypes = {
    select: 'checkbox',
    email: 'sort',
    usertype: 'sort'
  };
  /** Il valore del sort sulle colonne */
  sortedItems = {
    username: false,
    usertype: false
  };
  /** La lista degli utenti */
  listaUtenti: any[] = [];
  datePipe: any;

  /**
   * Il costruttore della classe
   * @param { ActivatedRoute } activatedRoute Fornisce accesso alle informazioni sulla rotta associata a questa componente
   */
  constructor(
    private genericTableService: GenericTableService,
    private loaderSpinnerService: LoaderSpinnerService,
    private utentiService: UtentiService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private cdr:ChangeDetectorRef
  ) {}

  /**
   * Lifecycle hook dell'onInit
   * Si popola il data source
   * */
  ngOnInit() {
    this.getDataFromResolver();
  }



  /** Recupera i dati dal resolver */
  async getDataFromResolver() {
    try {
       const res = await this.utentiService.getListaUtenti(25, 0).toPromise();
       this.totalElements = res.totalElements;
       this.pageIndex = res.pageIndex;
       this.listaUtenti = res.content;
   
       if (this.listaUtenti) {
         this.dataSource = new MatTableDataSource<any>(
           this.getMappedDataSource(this.listaUtenti)
         );
       }
    } catch (e) {
       console.log("errore: ", e);
    }
   }
  changePage(event: any) {
    // Quando facciamo partire una qualsiasi chiamata facciamo apparire il loaderSpinner per dare un feedback visivo all'utente
    this.loaderSpinnerService.show();
    this.utentiService
      .getListaUtenti(INPUT_CONSTANT.pageSize, event.number)
      .subscribe({
        // Quando ci sottoscriviamo ad una qualsiasi chiamata, bisogna utilizzare le casistiche next ed error per gestire correttamente le funzionalità
        next: (res) => {
          this.totalElements = res.totalElements;
          this.pageIndex = event.number;
          if (res.content) {
            this.listaUtenti = res.content;
            this.dataSource = new MatTableDataSource<any>(
              this.getMappedDataSource(this.listaUtenti)
            );
          }
          // Ricordarsi di aggiungere questa riga di codice ogni volta che si crea una funzione di cambio pagina della tabella, altrimenti si spacca
          this.genericTableService.emitFilteringStatus(false);
          // Nascondere il loader spinner dopo aver effettuato le nostre logiche
          this.loaderSpinnerService.hide();
        },
        // Nascondere sempre il loader spinner nella casistica di errore della chiamata
        error: () => this.loaderSpinnerService.hide(),
      });
  }

  /** Funzione per mappare i singoli elementi della response */
  getMappedDataSource(toMap: any[]) {
    // Mappiamo il nostro array di oggetti ricevuto dal backend
    return toMap.map((r) => {
      // Creiamo un'array di azioni che l'utente puo effettuare sulla tabella
      const action = [
        {
          // Ogni azione ha bisogno di un titolo
          title: LABEL_CONSTANT.modifica,
          // Icona
          icon: ICON_CONSTANT.edit,
          // Il tipo di bottone, se 'icon' oppure 'button'
          type: 'icon',
          // Una callback, sarà la funzione che partirà sul click dell'azione
          //callback: () => this.visualizzautente(r.id),
        },
        {
          title: LABEL_CONSTANT.elimina,
          icon: ICON_CONSTANT.delete,
          type: 'icon',
          callback: () => this.eliminaUtente(r.user.id),
        },
      ];
      // Ritorniamo quindi per ogni elemento all'interno dell'array un nuovo oggetto che avrà come nomi delle variabili i nomi delle colonne
      return {
        name: r.name,
        surname: r.surname,
        email: r.user.email,
        select: false,
        // dataCreazione: this.datePipe.trasform(r.dataCreazione, 'dd/MM/yyyy'),
        action: action,
      };
    });
  }

  /**
   * Funzione per la modifica dell'utente, apre la modale di modifica utente
   * @param {number} id L'id dell'utente da modificare
   */
  /*visualizzautente(id: number) {
    this.dialog.open( , {
      width: '660px',
      height: '300px',
      disableClose: true,
    });
  }*/

  /**
   * Funzione per l'eliminazione dell'utente, apre la modale di conferma eliminazione
   * @param {number} id L'id dell'utente da eliminare
   */
  eliminaUtente(id: number) {

    this.dialog.open(deleteuser, {
      width: '660px',
      height: '300px',
      disableClose: true,
      data: {
        id: id,}
    }).afterClosed().subscribe({
      next: (x) => {
        console.log("non ho filtrato", this.listaUtenti)
        this.listaUtenti = this.listaUtenti.filter(anagrafica => anagrafica.user.id !== id);
        this.dataSource = new MatTableDataSource<any>(
          this.getMappedDataSource(this.listaUtenti)
        );
        console.log("ho filtrato", this.dataSource)
        this.cdr.detectChanges();
      }
    });
  }

  deletefromlist(id: number){
   
  }
}
