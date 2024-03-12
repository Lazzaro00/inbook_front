import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { bookModelResponse } from '../models/book.model';
import { CartBookModel } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = `${environment.apiUrl}cart`;

  bookInCart:Array<CartBookModel>=[];

  constructor(private http: HttpClient) { }

  getBookInCart(){
    return this.bookInCart;
  }

  addBookInCart(book:any){
    this.bookInCart.push(book);
  }

  read(id:number){
    const url = `${this.baseUrl}/read?id=${id}`;
    return this.http.get<any>(url);
  }

  insert(email:string, idBook:number, quantitySelected:number){
    const payload = {
      email : email,
      idBook:idBook,
      quantitySelected:quantitySelected
    };
    return this.http.post<bookModelResponse>(`${this.baseUrl}/insert`, payload);
  }

  
}
