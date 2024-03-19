import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/utils';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import AppLayoutComponent from 'src/app/modules/app-layout/components/app-layout/app-layout.component';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from 'src/app/shared/generic';
import { INPUT_CONSTANT, RESULT_CONSTANT, TABLE_COLUMNS, TABLE_GROUP_ACTIONS_CONSTANT_VISUAL } from 'src/app/constants';
import { BuyService } from 'src/app/services/buy.service';
import { LoginService } from 'src/app/services';
import { UtentiService } from 'src/app/services/utenti.service';
import { MatTableDataSource } from '@angular/material/table';
import { buyModelResponse } from 'src/app/models/buy.model';



/** Una classe per il componente del layout quando non si è loggati */
@Component({
  standalone: true,
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  imports: [RouterModule, AngularMaterialModule, MatCardModule,MatIconModule, GenericTableComponent, AppLayoutComponent, CommonModule],
})
export class OrderDetail {

  resultConstant = RESULT_CONSTANT;
  size = INPUT_CONSTANT.pageSize;
  pageIndex = INPUT_CONSTANT.pageNumber;
  totalElements!: number;
  dataSource!: any;
  displayedColumns = TABLE_COLUMNS.orderDetail;
  azioniDiGruppo = TABLE_GROUP_ACTIONS_CONSTANT_VISUAL;
  cellHeadTypes = {
    product: '',
    quantity: '',
    price: '',
  };
  sortedItems = {
    product: false,
    quantity: false,
    price: false,
  };

  filteredList: buyModelResponse[] = [];
  datePipe: any;
  iduser:Number = 0;
  orderNum: number = 0;
  date:Date = new Date;

  constructor(private buyService : BuyService, private loginService:LoginService, private utentiService:UtentiService,
    private router: Router){}

  ngOnInit(){
      
      this.filteredList = this.buyService.getListFiltered();
      this.totalElements = this.filteredList.length;
      this.pageIndex = 0;
      this.orderNum = this.filteredList[0].orderNum;
      this.date = this.filteredList[0].date;
      if (this.filteredList) {
        this.dataSource = new MatTableDataSource<any>(
        this.getMappedDataSource(this.filteredList)
      );
    }
  }


   getMappedDataSource(toMap: any[]) {
    // Mappiamo il nostro array di oggetti ricevuto dal backend
    return toMap.map((r) => {
      return {
        product: r.book.name,
        quantity: r.quantity,
        price: r.book.price,
        select: false,

      };
    });
  }

  changePage(event:any){

  }

  goBack(){
    this.router.navigateByUrl('user/historical');
  }


}
