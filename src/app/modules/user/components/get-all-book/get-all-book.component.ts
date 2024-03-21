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


/** Una classe per il componente del layout quando non si è loggati */
@Component({
  standalone: true,
  selector: 'app-getAllBook',
  templateUrl: './get-all-book.component.html',
  styleUrls: ['./get-all-book.component.scss'],
  imports: [RouterModule, AngularMaterialModule, MatCardModule,MatIconModule, CardBook, AppLayoutComponent, CommonModule],
})
export class GetAllBook {

  listBooks:any[] = [];
  bookNotFiltered:any[] = [];
  categories:string[] = [];
  prices:any[] = [0,10,20,30,40,50,60,70,80,90,100];
  dialogRef: MatDialogRef<Cart> | undefined;

  constructor(
    private bookService : BookService,
    private dialog : MatDialog,
    private router:Router
  ){}

  ngOnInit(){
    this.bookService.getAllBooks(25,0).subscribe({
      next: res => {
        this.listBooks = res.content;
        this.bookNotFiltered = res.content;
        console.log("BookNoFiltered ", this.bookNotFiltered);
      }
    });

    this.bookService.getAllCategory().subscribe({
      next:(res) => {
        this.categories = res;
        this.categories.push("");
      },
    });
  }

  onPriceChange(event: any) {
    this.listBooks = this.bookNotFiltered.filter(item => item.price >= event.value);
  }

  onCategoryChange(event: any) {
    if(event.value == "")
    this.listBooks = this.bookNotFiltered;
  else
    this.listBooks = this.bookNotFiltered.filter(item => item.category == event.value);
  }

  onSearchChange(value: any) {
    this.listBooks = this.bookNotFiltered.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
  }



}
