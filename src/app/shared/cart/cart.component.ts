import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'src/app/utils';

import { BookService } from 'src/app/services/book.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

/** Componente per il bottone di creazione nuovo utente */
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class Cart {

  constructor(private dialog: MatDialogRef<Cart>) {}

  cartClose(){
    if (this.dialog) {
      this.dialog.close(false);
    }
  }
 
}
