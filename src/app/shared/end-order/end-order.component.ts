import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'src/app/utils';

import { CardCart } from '../card-cart/card-cart.component';
import { CartService } from 'src/app/services/cart.service';
import { CartBookModel } from 'src/app/models/cart.model';
import { Router } from '@angular/router';


/** Componente per il bottone di creazione nuovo utente */
@Component({
  selector: 'app-end-order',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, CardCart],
  templateUrl: './end-order.component.html',
  styleUrls: ['./end-order.component.scss']
})
export class EndOrder {
  bookInCart:Array<CartBookModel>=[];

  constructor(
    private cartService: CartService,
    private route:Router
    ) {}

    ngOnInit(){
      this.bookInCart = this.cartService.getRiepilogo();
      console.log("Reipilogo", this.bookInCart)
    }

    cartClose(){
     this.route.navigate(['user/getallbook'])
    }
}
