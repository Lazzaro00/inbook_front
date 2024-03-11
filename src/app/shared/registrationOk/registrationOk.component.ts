import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'src/app/utils';
import { LABEL_CONSTANT } from 'src/app/constants';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

/**
 * Questa è un dialog d'esempio
 */
@Component({
  selector: 'registrationOk',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './registrationOk.component.html',
  styleUrls: ['./registrationOk.component.scss'],
})
export class registrationOk {
  /** Costante per le label generiche */
  labelConstant = LABEL_CONSTANT;

  /**
   * Il costruttore della clasee
   * @param {MatDialogRef<deleteuser>} dialog il riferimento alla modale
   */
  constructor(
    private dialog: MatDialogRef<registrationOk>,
    private dialogg: MatDialog,
    private router: Router
    ) {}

  /** Chiude la modale senza azione */
  closeDialog() {
    this.dialog.close(false);
    this.router.navigate(['/login'])
  }
}
