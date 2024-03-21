import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { ImageService } from 'src/app/services/image.service';
import { bookModelResponse } from '../../../models/book.model';
import { CardBook } from 'src/app/shared/card-book/card-book.component';
import { LibraryService } from 'src/app/services/library.service';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CartService } from 'src/app/services/cart.service';
import { CartBookModel } from 'src/app/models/cart.model';
import { LoginService } from 'src/app/services';

export interface Tile {
 color: string;
 cols: number;
 rows: number;
 imgUrl: SafeUrl; // Changed to SafeUrl for safety
}

@Component({
 standalone: true,
 selector: 'app-read-book',
 templateUrl: './read.component.html',
 styleUrls: ['./read.component.scss'],
 imports: [CommonModule, CardBook, MatButtonModule, MatGridListModule],
})
export class ReadComponent implements OnInit {
 listBooks: any[] = [];
 @Input() bookId!: number;
 book!: bookModelResponse;
 imageUrl: SafeUrl = ''; // Changed to SafeUrl for safety
 base64Image: string = '';
 tiles: Tile[] = [
    { imgUrl: '../../../../../assets/images/book/1.jpg', cols: 1, rows: 1, color: '#f9f9f9' },
    { imgUrl: '', cols: 3, rows: 4, color: '#f9f9f9' },
    { imgUrl: '../../../../../assets/images/book/2.jpg', cols: 1, rows: 1, color: '#f9f9f9' },
    { imgUrl: '../../../../../assets/images/book/3.jpg', cols: 1, rows: 1, color: '#f9f9f9' },
    { imgUrl: '../../../../../assets/images/book/4.jpg', cols: 1, rows: 1, color: '#f9f9f9' },
 ];

 quantitySelected: number = 1;

 cartBookModel : CartBookModel={
  id:0,
  user:null,
  book:null,
  quantitySelected:0
};

  isAdmin:boolean = true;

 constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private bookService: BookService,
    private imageService: ImageService,
    private libraryService: LibraryService,
    private cdr: ChangeDetectorRef,
    private cartService:CartService,
    private loginService:LoginService,
    private router:Router,
    private location:Location
 ) {}

 ngOnInit(): void {
    if (this.bookId) {
      this.loadBookDetails(this.bookId);
    } else {
      this.route.queryParams.subscribe(params => {
        this.bookId = params['id'];
        console.log(this.bookId);
        if (this.bookId) {
          this.loadBookDetails(this.bookId);
        }
      });
    }
    if(this.loginService.getUtenteSessione().usertype === "ADMIN"){
      this.isAdmin = false;
    }
 }

 loadBookDetails(bookId: number): void {
    this.bookService.getBookDetails(bookId).subscribe(
      (response: bookModelResponse) => {
        console.log("response ", response);
        this.book = response;
        console.log(this.book, this.imageUrl);
        this.tiles[1].imgUrl = "data:image/jpeg;base64," + response.images;

        this.libraryService.getRelatedBooks(bookId).subscribe(
          (relatedBooks: any[]) => {
            this.listBooks = relatedBooks;
          },
          (error) => {
            console.error('Error loading related books:', error);
          }
        );
        this.cdr.detectChanges(); // Manually trigger change detection
      },
      (error) => {
        console.error('Error loading book details:', error);
      },
    );
 }

 decreaseQuantity(): void {
    if (this.quantitySelected > 1) {
      this.quantitySelected--;
    }
 }

 increaseQuantity(): void {
    this.quantitySelected++;
 }

 addToCart(): void {
    if(this.quantitySelected == 0)
      return;  
    var email = this.loginService.getUtenteSessione().email;
    this.cartService.insert(email, this.bookId, this.quantitySelected).subscribe({
      next:(res) => {
        this.cartBookModel.id = res.id;
        this.cartBookModel.user = res.user;
        this.cartBookModel.book=res.book;
        this.cartBookModel.quantitySelected=this.quantitySelected;
        this.cartService.addBookInCart(this.cartBookModel);
      },
    });
 }

 convertBinaryToBase64(binaryData: any) {
    const reader = new FileReader();
    reader.readAsDataURL(binaryData);
    reader.onloadend = () => {
      this.base64Image = reader.result as string;
      this.tiles[1].imgUrl = this.sanitizer.bypassSecurityTrustUrl(this.base64Image) as SafeUrl; // Sanitized URL
      this.cdr.detectChanges(); // Manually trigger change detection
    };
    console.log(this.tiles[1].imgUrl);
 }

  goBack(){
  this.location?.back();
  }
}
