import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { ImageService } from 'src/app/services/image.service';
import { bookModelResponse } from '../../../models/book.model';
import { CardBook } from 'src/app/shared/card-book/card-book.component';
import { LibraryService } from 'src/app/services/library.service';


@Component({
  standalone:true,
  selector: 'app-read-book',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
  imports: [CommonModule, CardBook]
})
export class ReadComponent implements OnInit {
  listBooks:any[] = [];
  @Input() bookId!: number;
  book!: bookModelResponse;
  imageUrls: string[] = []; // Declare imageUrls property here

  constructor(private route: ActivatedRoute, private bookService: BookService, private imageService: ImageService, private libraryService: LibraryService) { }

  ngOnInit(): void {
    if (this.bookId) {
      this.loadBookDetails(this.bookId);
    } else {
      this.route.params.subscribe(params => {
        const id = params['id'];
        if (id) {
          this.loadBookDetails(id);
        }
      });
    }
  }

  loadBookDetails(bookId: number): void {
    this.bookService.getBookDetails(bookId).subscribe(
      (response: bookModelResponse) => {
        this.book = response;
        this.imageUrls = this.imageService.convertAllImagesToUrl(response.images);
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
}
