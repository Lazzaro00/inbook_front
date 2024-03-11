import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'src/app/utils';

import { BookService } from 'src/app/services/book.service';
import { Router, RouterModule, NavigationExtras  } from '@angular/router';


/** Componente per il bottone di creazione nuovo utente */
@Component({
  selector: 'app-card-book',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, RouterModule],
  templateUrl: './card-book.component.html',
  styleUrls: ['./card-book.component.scss']
})
export class CardBook {

  constructor(private router:Router,){}

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

  value: number = 0;
  
  @Input()
  onClick!:Function;

  increase() {
    this.value++;
  }

  decrease() {
    if (this.value > 0) {
      this.value--;
    }}

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
