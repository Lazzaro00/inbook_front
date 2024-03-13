import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { LibraryService } from 'src/app/services/library.service';
import { LoginService } from 'src/app/services';
import { MatSelectModule } from '@angular/material/select';

@Component({
  standalone:true,
  selector: 'insert-product',
  templateUrl: './insertproduct.component.html',
  styleUrls: ['./insertproduct.component.scss'],
  imports: [MatSelectModule,ReactiveFormsModule, CommonModule, MatButtonModule, MatGridListModule, MatFormFieldModule, MatInputModule, FormsModule],
})
export class InsertProduct implements OnInit {
  inserimentoLibro: FormGroup;
  listaLibrary: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private fb:FormBuilder,
    private libraryService: LibraryService,
    private loginSevice:LoginService,
    ) { 
      this.inserimentoLibro = this.fb.group({
        id: [""],
        images:[Blob, Validators.required],
        name:["", Validators.required],
        category:["", Validators.required],
        price:["", Validators.required],
        serialcode:["", Validators.required],
        quantity:["", Validators.required],
        description:["", Validators.required],
        library:[ ],
      });
      
    }


  ngOnInit(): void {
    let email = (this.loginSevice.getUtenteSessione()).email
    this.libraryService.getLibraryByEmail(email).subscribe({
      next: (res) =>{
        this.listaLibrary = res;
        console.log(res)
    }
  })
  }

  saveProduct(){
    this.bookService.insertBook(this.inserimentoLibro.value).subscribe({
        next: () =>{console.log("inserimento", this.inserimentoLibro.value)},
        error: (e) => {console.log("inserimento andato in errore per colpa di:", e)}
    })
  }

  
}
