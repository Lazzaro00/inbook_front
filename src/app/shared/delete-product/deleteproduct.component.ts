import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/utils';
import { LABEL_CONSTANT } from 'src/app/constants';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { UtentiService } from 'src/app/services/utenti.service';
import { Router } from '@angular/router';
import ListaUtentiComponent from 'src/app/modules/utenti/lista-utenti/lista-utenti.component';
import { BookService } from 'src/app/services/book.service';
import { confirmdeleteproduct } from '../confirmdeleteproduct/confirmdeleteproduct.component';


/**
 * Questa è un dialog d'esempio
 */
@Component({
  selector: 'deleteproduct',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, confirmdeleteproduct],
  templateUrl: './deleteproduct.component.html',
  styleUrls: ['./deleteproduct.component.scss'],
})
export class deleteproduct {
  /** Costante per le label generiche */
  labelConstant = LABEL_CONSTANT;
  id:any;

  /**
   * Il costruttore della clasee
   * @param {MatDialogRef<deleteuser>} dialog il riferimento alla modale
   */
  constructor(
    private dialog: MatDialogRef<deleteproduct>,
    private dialogg: MatDialog,
    private bookService:BookService,
    private utentiService: UtentiService,
    private listuser:ListaUtentiComponent,
    private router:Router,

    @Inject(MAT_DIALOG_DATA) data: any // Injecta i dati passati al dialog
    ) {
      this.id = data.id; // Ottiene l'ID dai dati passati al dialog
    }


  /** Chiude la modale senza azione */
  closeDialog() {
    this.dialog.close(false);
  }

  deleteuser(){
    this.closeDialog();
    
    this.bookService.deleteBook(this.id).subscribe({
      
      next: () => {
        this.dialogg.open(confirmdeleteproduct, {
          width: '660px',
          height: '300px',
          disableClose: true,
        });
      
      },

      error: (e) => {console.log(e)}
    });
    
  }
}
