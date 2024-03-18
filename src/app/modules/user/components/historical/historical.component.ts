import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/utils';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CardBook } from 'src/app/shared/card-book/card-book.component';
import AppLayoutComponent from 'src/app/modules/app-layout/components/app-layout/app-layout.component';
import { BookService } from 'src/app/services/book.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Cart } from 'src/app/shared/cart/cart.component';
import { GenericTableComponent } from 'src/app/shared/generic';
import { ICON_CONSTANT, INPUT_CONSTANT, LABEL_CONSTANT, RESULT_CONSTANT, TABLE_COLUMNS, TABLE_GROUP_ACTIONS_CONSTANT_VISUAL } from 'src/app/constants';
import { BuyService } from 'src/app/services/buy.service';
import { LoginService } from 'src/app/services';
import { UtentiService } from 'src/app/services/utenti.service';
import { MatTableDataSource } from '@angular/material/table';



/** Una classe per il componente del layout quando non si è loggati */
@Component({
  standalone: true,
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss'],
  imports: [RouterModule, AngularMaterialModule, MatCardModule,MatIconModule, GenericTableComponent, AppLayoutComponent, CommonModule],
})
export class Historical {

  resultConstant = RESULT_CONSTANT;
  size = INPUT_CONSTANT.pageSize;
  pageIndex = INPUT_CONSTANT.pageNumber;
  totalElements!: number;
  dataSource!: any;
  displayedColumns = TABLE_COLUMNS.historical;
  azioniDiGruppo = TABLE_GROUP_ACTIONS_CONSTANT_VISUAL;
  cellHeadTypes = {
    idOrder: 'sort',
    dateOrder: 'sort',
    priceOrder: 'sort',
  };
  sortedItems = {
    idOrder: false,
    dateOrder: false,
    priceOrder: false,
  };

  orderList: any[] = [];
  datePipe: any;
  iduser:Number = 0;

  constructor(private buyService : BuyService, private loginService:LoginService, private utentiService:UtentiService){}

  ngOnInit(){
    var email = this.loginService.getUtenteSessione().email;
    var utenteSessione = this.utentiService.getUserByMail(email).subscribe({
      next:(res) => {
        this.buyService.getAllHistorical(res.id).subscribe({
          next:(res) =>{
            try {
              this.totalElements = res.totalElements;
              this.pageIndex = res.pageIndex;
              this.orderList = res;
              console.log(this.orderList)
          
              if (this.orderList) {
                this.dataSource = new MatTableDataSource<any>(
                  this.getMappedDataSource(this.orderList)
                );
              }
           } catch (e) {
              console.log("errore: ", e);
           }
          }
        });
      },
    });
    
  }

  async getDataFromResolver() {
    
   }

   getMappedDataSource(toMap: any[]) {
    // Mappiamo il nostro array di oggetti ricevuto dal backend
    return toMap.map((r) => {
      // Creiamo un'array di azioni che l'utente puo effettuare sulla tabella
      const action = [
        
        {
          title: LABEL_CONSTANT.visual,
          icon: ICON_CONSTANT.visual,
          type: 'icon',
          callback: () => this.OpenOrder(),
        },
      ];
      // Ritorniamo quindi per ogni elemento all'interno dell'array un nuovo oggetto che avrà come nomi delle variabili i nomi delle colonne
      return {
        idOrder: r.idOrder,
        dateOrder: r.dateOrder,
        price: r.priceOrder,
        select: false,
        // dataCreazione: this.datePipe.trasform(r.dataCreazione, 'dd/MM/yyyy'),
        action: action,
      };
    });
  }

  OpenOrder(){}

  changePage(event:any){

  }

}
