import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
  library: any[] = [];
  isModifica:boolean = false;
  imageURL: string | ArrayBuffer | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private fb:FormBuilder,
    private libraryService: LibraryService,
    private loginSevice:LoginService,
    private router: Router,
    ) { 
      this.inserimentoLibro = this.fb.group({
        id: [""],
        images:[''],
        name:["", Validators.required],
        category:["", Validators.required],
        price:["", Validators.required],
        serialcode:["", Validators.required],
        quantity:["", Validators.required],
        description:["", Validators.required],
        library:[],
      });
      
    }


  ngOnInit(): void {
    let email = (this.loginSevice.getUtenteSessione()).email
    this.libraryService.getLibraryByEmail(email).subscribe({
      next: (res) =>{
        this.library = res;
        console.log(res)
      }
    })

    setTimeout(()=> {
      if(this.bookService.inserimentoLibro.value.id != null){
        console.log(this.bookService.inserimentoLibro.value)
        this.inserimentoLibro = this.bookService.inserimentoLibro;
        this.imageURL = this.bookService.inserimentoLibro.value.images;
        this.isModifica = true;
        }else{
        this.isModifica = false;
        console.log("form vuoto, quindi inserimento")
       }

    }, 500)
  }

  ngOnDestroy(): void {
    this.inserimentoLibro.reset();
    this.isModifica = false;
  }

  saveProduct(){
    let immage = this.inserimentoLibro.value.images;
    let parts = immage.split(",");
    let imm = parts[1]
    this.inserimentoLibro.patchValue({
      images: imm
    })
    this.bookService.insertBook(this.inserimentoLibro.value).subscribe({
        next: () =>{
          
          console.log("inserimento", this.inserimentoLibro.value);
          this.inserimentoLibro.reset();
          this.isModifica = false;
          this.router.navigate(['gestionale/book/storico-admin'])
        },
        error: (e) => {
          console.log(this.inserimentoLibro.value)
          console.log("inserimento andato in errore per colpa di:", e)
        }
    })
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageURL = reader.result;
        this.inserimentoLibro.patchValue({
          images: reader.result
        });
      };
    }
  }
  
}
