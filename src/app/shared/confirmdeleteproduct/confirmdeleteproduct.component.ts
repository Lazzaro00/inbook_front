import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'src/app/utils';
import { LABEL_CONSTANT } from 'src/app/constants';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

/**
 * Questa è un dialog d'esempio
 */
@Component({
  selector: 'confirmdeletepduct',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './confirmdeleteproduct.component.html',
  styleUrls: ['./confirmdeleteproduct.component.scss'],
})
export class confirmdeleteproduct {
  /** Costante per le label generiche */
  labelConstant = LABEL_CONSTANT;

  /**
   * Il costruttore della clasee
   * @param {MatDialogRef<deleteuser>} dialog il riferimento alla modale
   */
  constructor(
    private dialog: MatDialogRef<confirmdeleteproduct>,
    private dialogg: MatDialog
    ) {}

  /** Chiude la modale senza azione */
  closeDialog() {
    this.dialog.close(false);
  }
}
