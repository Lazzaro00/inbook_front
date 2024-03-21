import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'src/app/utils';

import { Router, RouterModule, NavigationExtras  } from '@angular/router';
import { bookModelResponse } from 'src/app/models/book.model';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from '../cart/cart.component';


/** Componente per il bottone di creazione nuovo utente */
@Component({
  selector: 'app-card-cart',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, RouterModule],
  templateUrl: './card-cart.component.html',
  styleUrls: ['./card-cart.component.scss']
})
export class CardCart {

  constructor(private router:Router, private cartService:CartService){}

  @Input()
  idCart:number = 0;

  @Input()
  book: bookModelResponse|null= null;

  @Input()
  quantitySelected: number = 0;
  
  @Input()
  onClick!:Function;

  @Input()
  cart:boolean = true;

  @Input()
  image:string = "";

  ngOnInit(){
    if(this.book?.images == null)
    this.image = "../../../../../assets/images/book.png"
  else
    this.image = "data:image/jpeg;base64,"+this.book?.images;
  }

  openRead() {
    if(this.book != null){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        
          id: this.book.id
      }
    };
    // qua bisogna passare l'id poi fare una read e popolaer i campi di book/read
    this.router.navigate(['/book/read'], navigationExtras);
  }
  }


  deleteFromCart(){
    this.cartService.delete(this.idCart).subscribe({
      next:(res:any) =>{
        this.cartService.totalprice();
      },
    });
  }

}
