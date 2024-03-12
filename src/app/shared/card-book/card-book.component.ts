import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'src/app/utils';

import { BookService } from 'src/app/services/book.service';
import { Router, RouterModule, NavigationExtras  } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartBookModel } from 'src/app/models/cart.model';


/** Componente per il bottone di creazione nuovo utente */
@Component({
  selector: 'app-card-book',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, RouterModule],
  templateUrl: './card-book.component.html',
  styleUrls: ['./card-book.component.scss']
})
export class CardBook {
  @Input()
  id:number = 0;

  @Input()
  img:String = '';

  @Input()
  title: String = '';

  @Input()
  category: String = '';

  @Input()
  price: number = 0.10;

  quantitySelected: number = 1;
  button:boolean = false;

  cartBookModel : CartBookModel={
    book:null,
    quantitySelected:0
  };
  
  @Input()
  onClick!:Function;

  constructor(
    private router:Router, 
    private bookService:BookService,
    private cartService: CartService
    ){}

  increase() {
    this.quantitySelected++;
    this.button = false;
  }

  decrease() {
    if (this.quantitySelected > 0) {
      this.quantitySelected--;
    }
    if(this.quantitySelected == 0){
      this.button = true;
    }
  }

  addToCart(){
    if(this.quantitySelected == 0)
      return;  
    
    this.bookService.getBookDetails(this.id).subscribe({
      next:(res) => {
        this.cartBookModel.book=res;
        this.cartBookModel.quantitySelected=this.quantitySelected;
        this.cartService.addBookInCart(this.cartBookModel);
      },
    });
  }

  openRead() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: this.id
      }
    };
    // qua bisogna passare l'id poi fare una read e popolaer i campi di book/read
    this.router.navigate(['/book/read'], navigationExtras);
  }

}
