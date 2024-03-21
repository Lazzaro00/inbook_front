import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'src/app/utils';

import { MatDialogRef } from '@angular/material/dialog';
import { CardCart } from '../card-cart/card-cart.component';
import { CartService } from 'src/app/services/cart.service';
import { bookModelResponse } from 'src/app/models/book.model';
import { CartBookModel } from 'src/app/models/cart.model';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services';


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
    private cartService: CartService,
    private route:Router,
    private notification: NotificationService
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
    this.cartService.totalprice();
    this.total = this.cartService.total;
    this.subtotal = this.cartService.subtotal;
  }

  endOrder(){
    this.cartService.moveFromCartToBuy().subscribe({
      next:(res) => {
        this.cartService.empty();
        this.cartClose();
        this.route.navigate(["/user/endOrder"]);
      },
      error:(err) => {
        this.cartService.whichBuyable().subscribe({
          next:(res:any) => {
            let x = '';
            res["notBuyables"].forEach((element: { book: { name: string; }; }) => {
             x +=element.book.name+", ";
            });
            this.notification.show("Non tutti i libri sono acquistabili: " + x,10000,"none");
          },
        });
      },
    });
  }
 
}
