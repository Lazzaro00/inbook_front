import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/utils';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CardBook } from 'src/app/shared/card-book/card-book.component';
import AppLayoutComponent from 'src/app/modules/app-layout/components/app-layout/app-layout.component';



/** Una classe per il componente del layout quando non si è loggati */
@Component({
  standalone: true,
  selector: 'app-getAllBook',
  templateUrl: './get-all-book.component.html',
  styleUrls: ['./get-all-book.component.scss'],
  imports: [RouterModule, AngularMaterialModule, MatCardModule,MatIconModule, CardBook, AppLayoutComponent],
})
export class GetAllBook {



}
