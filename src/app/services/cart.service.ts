import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { bookModelResponse } from '../models/book.model';
import { CartBookModel } from '../models/cart.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = `${environment.apiUrl}cart`;

  bookInCart:Array<CartBookModel>=[];

  constructor(private http: HttpClient, private loginService:LoginService) { 
    var email = this.loginService.getUtenteSessione().email;
    this.getByEmail(email).subscribe({
      next:(res) => {
        console.log(res);
        this.bookInCart = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getBookInCart(){
    return this.bookInCart;
  }

  addBookInCart(book:any){
    this.bookInCart.push(book);
  }

  empty(){
    return this.bookInCart = [];
  }

  read(id:number){
    const url = `${this.baseUrl}/read?id=${id}`;
    return this.http.get<any>(url);
  }

  insert(email:string, idBook:number, quantitySelected:number){
    const payload = {
      userMail : email,
      bookId:idBook,
      quantity:quantitySelected
    };
    return this.http.post<CartBookModel>(`${this.baseUrl}/insertCart`, payload);
  }

  getByEmail(email:string){
    const url = `${this.baseUrl}/getByUser?email=${email}`;
    return this.http.get<any>(url);
  }

  moveFromCartToBuy(listCart:CartBookModel[]){
    const url = `${this.baseUrl}/buy`;
    return this.http.post<any>(url,listCart);
  }

  
}
