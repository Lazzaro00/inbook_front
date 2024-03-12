import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'src/app/utils';

import { MatDialogRef } from '@angular/material/dialog';
import { CardCart } from '../card-cart/card-cart.component';
import { CartService } from 'src/app/services/cart.service';
import { bookModelResponse } from 'src/app/models/book.model';
import { CartBookModel } from 'src/app/models/cart.model';


/** Componente per il bottone di creazione nuovo utente */
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule,CardCart],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class Cart {

  bookInCart:Array<CartBookModel>=[];
  total:number = 0;
  subtotal:number = 0;

  constructor(
    private dialog: MatDialogRef<Cart>,
    private cartService: CartService
    ) {}

  ngOnInit(){
    this.bookInCart = this.cartService.getBookInCart();
    this.totalprice();
  }

  cartClose(){
    if (this.dialog) {
      this.dialog.close(false);
    }
  }

  totalprice(){
    for (let book of this.bookInCart){
      if(book.book?.price != null)
      this.subtotal += book.book?.price;
    }
    this.total = this.subtotal;
  }
 
}
