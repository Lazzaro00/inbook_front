import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
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
import { buyModelResponse } from 'src/app/models/buy.model';



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
    idOrder: '',
    dateOrder: '',
    priceOrder: '',
  };
  sortedItems = {
    idOrder: false,
    dateOrder: false,
    priceOrder: false,
  };

  orderList: buyModelResponse[] = [];
  datePipe: any;
  iduser:Number = 0;

  constructor(private buyService : BuyService, private loginService:LoginService, private utentiService:UtentiService,
    private router: Router, private route:ActivatedRoute){}

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
          
              if (this.orderList) {
                this.dataSource = new MatTableDataSource<any>(
                  this.getMappedDataSource(this.matchRow(this.orderList))
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


   getMappedDataSource(toMap: any[]) {
    return toMap.map((r) => {
      const action = [
        
        {
          title: LABEL_CONSTANT.visual,
          icon: ICON_CONSTANT.visual,
          type: 'icon',
          callback: () => this.OpenOrder(r.orderNum),
        },
      ];
      return {
        idOrder: r.orderNum,
        dateOrder: r.date,
        priceOrder: r.priceOrder,
        select: false,
        action: action,
      };
    });
  }

  OpenOrder(orderNumber:number){
    let listFiltered = this.orderList.filter(obj => obj.orderNum === orderNumber);
    this.buyService.setListFiltered(listFiltered);
    this.router.navigate(["/user/details/orderDetail"]);
  }

  changePage(event:any){

  }



  matchRow(list:buyModelResponse[]){
    let newList: order[] = [];
    console.log("LISTA",list);
    list.forEach((element: any) => {
      let index = newList.findIndex(item => item.orderNum === element.orderNum);
      if(index === -1){
      newList.push({
        orderNum: element.orderNum,
        date : element.date,
        priceOrder : element.book ? element.book.price : 0
      });
      }else{
        newList[index].priceOrder += element.book ? element.book.price : 0
      }
  });
  return newList;
  }
}

interface order {
  orderNum: number;
  date : any,
  priceOrder : number
  
}
