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
import { LibraryService } from 'src/app/services/library.service';


/** Una classe per il componente del layout quando non si è loggati */
@Component({
  standalone: true,
  selector: 'storico-admin',
  templateUrl: './storicoadmin.component.html',
  styleUrls: ['./storicoadmin.component.scss'],
  imports: [RouterModule, AngularMaterialModule, MatCardModule,MatIconModule, GenericTableComponent, AppLayoutComponent, CommonModule],
})
export class storicoadmin {

  resultConstant = RESULT_CONSTANT;
  size = INPUT_CONSTANT.pageSize;
  pageIndex = INPUT_CONSTANT.pageNumber;
  totalElements!: number;
  dataSource!: any;
  displayedColumns = TABLE_COLUMNS.storico_admin;
  azioniDiGruppo = TABLE_GROUP_ACTIONS_CONSTANT_VISUAL;
  cellHeadTypes = {
    name: 'sort',
    dateOrder: 'sort',
    priceOrder: 'sort',
  };
  sortedItems = {
    name: false,
    dateOrder: false,
    priceOrder: false,
  };
  idLibrary: number = 0;
  bookList: any[] = [];
  datePipe: any;
  iduser:Number = 0;

  constructor(
    private buyService : BuyService,
    private loginService:LoginService,
    private utentiService:UtentiService,
    private libraryService:LibraryService,
    private bookService:BookService,
    private router: Router
    ){}

  ngOnInit(){
    var email = this.loginService.getUtenteSessione().email;
    this.libraryService.getLibraryByEmail(email).subscribe({
      next: (res) => {
        this.idLibrary = res[0].id;
        this.getDataFromResolver()
      }, 
      error: (e) => { console.log("erroreeeeeeeeeeeeeee" + e)}
    })
  }

  async getDataFromResolver() {
    const res = await this.bookService.getByLibraryId(this.idLibrary, 0, 25).toPromise();
    console.log(res)
       this.totalElements = res.totalElements;
       this.pageIndex = res.pageIndex;
       this.bookList = res.content;
   
       if (this.bookList) {
         this.dataSource = new MatTableDataSource<any>(
           this.getMappedDataSource(this.bookList)
         );
       }
   }

   getMappedDataSource(toMap: any[]) {
    
    return toMap.map((r) => {
      console.log(r)
      const action = [
        
        {
          title: LABEL_CONSTANT.visual,
          icon: ICON_CONSTANT.visual,
          type: 'icon',
          callback: () => this.OpenOrder(),
        },
        {
            title: LABEL_CONSTANT.modifica,
            icon: ICON_CONSTANT.edit,
            type: 'icon',
            callback: () => this.OpenOrder(),
        },
        {
          title: LABEL_CONSTANT.elimina,
          icon: ICON_CONSTANT.delete,
          type: 'icon',
          callback: () => this.OpenOrder(),
        },
      ];
      // Ritorniamo quindi per ogni elemento all'interno dell'array un nuovo oggetto che avrà come nomi delle variabili i nomi delle colonne
      return {
        name: r.name,
        category: r.category,
        price: r.price,
        quantity: r.quantity,
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
