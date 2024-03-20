import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibraryCardComponent } from '../library-card/library-card.component';
import { LoginService } from 'src/app/services';
import { LibraryService } from 'src/app/services/library.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [RouterModule, LibraryCardComponent, CommonModule],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent {
yourLibraries:any[]=[];
  constructor( 
    private loginService: LoginService,
    private libraryService: LibraryService
    ){
      this.libraryService.getLibraryByEmail(this.loginService.getUtenteSessione().email).subscribe((res) =>{
        this.yourLibraries = res;
      });
    }




}
