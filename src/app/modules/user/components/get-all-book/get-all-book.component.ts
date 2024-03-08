import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/utils';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CardBook } from 'src/app/shared/card-book/card-book.component';
import AppLayoutComponent from 'src/app/modules/app-layout/components/app-layout/app-layout.component';
import { BookService } from 'src/app/services/book.service';
import { CommonModule } from '@angular/common';

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
  years:any[] = [];
  categories:any[] = [];
  prices:any[] = [];

  constructor(
    private bookService : BookService,
    private router:Router
  ){}

  ngOnInit(){
    this.bookService.getAllBooks(25,0).subscribe({
      next: res => {
        console.log(res.content);
        this.listBooks = res.content;
      }
    });
  }

  openRead() {
    // qua bisogna passare l'id poi fare una read e popolaer i campi di book/read
    this.router.navigate(['/book/read']);
    console.log("blkabla")
  }



}
