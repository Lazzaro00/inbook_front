import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'src/app/utils';

import { BookService } from 'src/app/services/book.service';

/** Componente per il bottone di creazione nuovo utente */
@Component({
  selector: 'app-card-book',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
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

  value: number = 0;

  

  increase() {
    this.value++;
  }

  decrease() {
    if (this.value > 0) {
      this.value--;
    }}
}
