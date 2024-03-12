import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { ImageService } from 'src/app/services/image.service';
import { bookModelResponse } from '../../../models/book.model';
import { CardBook } from 'src/app/shared/card-book/card-book.component';
import { LibraryService } from 'src/app/services/library.service';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { DomSanitizer } from '@angular/platform-browser';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  imgUrl: string;
}

@Component({
  standalone:true,
  selector: 'app-read-book',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
  imports: [CommonModule, CardBook, MatButtonModule, MatGridListModule],
})
export class ReadComponent implements OnInit {
  listBooks:any[] = [];
  @Input() bookId!: number;
  book!: bookModelResponse;
  imageUrl: string = '' ; // Declare imageUrls property here
  base64Image: string = '';
  tiles: Tile[] = [
    {imgUrl: '../../../../../assets/images/book/1.jpg', cols: 1, rows: 1, color: '#f9f9f9'},
    {imgUrl: '', cols: 3, rows: 4, color: '#f9f9f9'},
    {imgUrl: '../../../../../assets/images/book/2.jpg', cols: 1, rows: 1, color: '#f9f9f9'},
    {imgUrl: '../../../../../assets/images/book/3.jpg', cols: 1, rows: 1, color: '#f9f9f9'},
    {imgUrl: '../../../../../assets/images/book/4.jpg', cols: 1, rows: 1, color: '#f9f9f9'},
  ];

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private bookService: BookService, 
    private imageService: ImageService, 
    private libraryService: LibraryService
    ) { }


  ngOnInit(): void {
    
    if (this.bookId) {
      this.loadBookDetails(this.bookId);
    } else {
      this.route.queryParams.subscribe(params => {
        this.bookId = params['id'];
        console.log(this.bookId)
        if (this.bookId ) {
          this.loadBookDetails(this.bookId);
        }
      });
    }
    
    
  }

  loadBookDetails(bookId: number): void {
    this.bookService.getBookDetails(bookId).subscribe(
      (response: bookModelResponse) => {
        this.book = response;
        this.imageUrl = this.imageService.convertImageToUrl(response.images);
        console.log(this.book, this.imageUrl)
        this.tiles[1].imgUrl = String(this.imageUrl);

        //this.convertBinaryToBase64(this.imageUrl);
        console.log("tilesss", this.tiles);
        this.libraryService.getRelatedBooks(bookId).subscribe(
          (relatedBooks: any[]) => {
            this.listBooks = relatedBooks;
          },
          (error) => {
            console.error('Error loading related books:', error);
          }
        );
      },
      (error) => {
        console.error('Error loading book details:', error);
      },
    );
  }

  decreaseQuantity(): void {
    if (this.book.quantity > 1) {
      this.book.quantity--;
    }
  }

  increaseQuantity(): void {
    this.book.quantity++;
  }

  addToCart(): void {
    //TODO Placeholder to add the book to the cart
    console.log('Book added to cart:', this.book);
  }

  convertBinaryToBase64(binaryData: any) {
    const reader = new FileReader();
    reader.readAsDataURL(binaryData);
    reader.onloadend = () => {
      this.base64Image = reader.result as string;
      this.tiles[1].imgUrl = this.base64Image;
    };
    console.log(this.tiles[1].imgUrl)
  }
}
