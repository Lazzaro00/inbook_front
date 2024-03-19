import { Component } from '@angular/core';
import { storicoadmin } from '../storico-admin/storicoadmin.component';
import { allbookcomponent } from '../all-book-component/all-book-component.component';
import { graphvendite } from '../graph-vendite/graph-vendite.component';
import { Router, RouterModule } from '@angular/router';



/** Una classe per il componente del layout quando non si è loggati */
@Component({
  standalone: true,
  selector: 'storico-component',
  templateUrl: './storico-component.component.html',
  styleUrls: ['./storico-component.component.scss'],
  imports: [RouterModule, storicoadmin, allbookcomponent, graphvendite],
})
export class storicocomponent {
}
