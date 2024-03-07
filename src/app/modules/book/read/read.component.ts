import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { ImageService } from 'src/app/services/image.service';
import { bookModelResponse } from '../../../models/book.model'

@Component({
  selector: 'app-read-book',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {
  @Input() bookId!: number;
  book!: bookModelResponse;
  bookImageUrls: string[] = [];

  constructor(private route: ActivatedRoute, private bookService: BookService, private imageService: ImageService) { }

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
        this.bookImageUrls = this.imageService.convertAllImagesToUrl(response.images);
      },
      (error) => {
        console.error('Errore nella lettura del libro:', error);
      }
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
    //TODO Placeholder per aggiungere il libro al carrello
    console.log('Book added to cart:', this.book);
  }



}
