import { Component } from '@angular/core';
import { LoginService } from 'src/app/services';
import { BookService } from 'src/app/services/book.service';
import { LibraryService } from 'src/app/services/library.service';


/** Una classe per il componente del layout quando non si è loggati */
@Component({
  standalone: true,
  selector: 'all-book-component',
  templateUrl: './all-book-component.component.html',
  styleUrls: ['./all-book-component.component.scss'],
  imports: [],
})
export class allbookcomponent {

  numBook: number = 0;


  constructor(
    private bookService: BookService,
    private loginService: LoginService,
    private libraryService: LibraryService
  ){}

  ngOnInit(){
    var email = this.loginService.getUtenteSessione().email;
    this.libraryService.getLibraryByEmail(email).subscribe({
      next: (res) => {

        this.bookService.getByLibraryId(res[0].id, 0, 25).subscribe({
          next: (res) => {
            this.numBook = res.numberOfElements;
          }
        })
      }, 
      error: (e) => { console.log("erroreeeeeeeeeeeeeee" + e)}
    })
  }
}
