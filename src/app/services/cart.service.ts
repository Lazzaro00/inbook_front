import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
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
  riepilogo:Array<CartBookModel>=[];
  total:number = 0;
  subtotal:number = 0;

  constructor(private http: HttpClient, private loginService:LoginService) { 
    this.get(loginService);
  }

  getBookInCart(){
    return this.bookInCart;
  }

  getRiepilogo(){
    return this.riepilogo;
  }

  addBookInCart(book:any){
    const foundIndex = this.bookInCart.findIndex(item => item.id === book.id);
    if (foundIndex !== -1) {
          this.bookInCart[foundIndex].quantitySelected += book.quantitySelected;
      } else {
          this.bookInCart.push({...book});
      }
  }

  empty(){
    return this.bookInCart = [];
  }

  read(id:number){
    const url = `${this.baseUrl}/read?id=${id}`;
    return this.http.get<any>(url);
  }

  delete(id:number){
    const index = this.bookInCart.findIndex(item => item.id === id); // Trova l'indice dell'elemento con l'id specificato
    if (index !== -1) {
      this.bookInCart.splice(index, 1); 
    }
    const url = `${this.baseUrl}/delete?id=${id}`;
    console.log(url);
    return this.http.delete<any>(url);
    
    
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

  get(loginService:LoginService){
    var email = this.loginService.getUtenteSessione().email;
    this.getByEmail(email).subscribe({
      next:(res) => {
        this.bookInCart = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  moveFromCartToBuy(){
    const url = `${this.baseUrl}/buy`;
    this.riepilogo = this.bookInCart;
    return this.http.post<any>(url,this.bookInCart);
  }


  totalprice(){
    this.subtotal = 0;
    for (let book of this.bookInCart){
      if(book.book?.price != null)
      this.subtotal += (book.book?.price * book.quantitySelected);
    }
    this.total = this.subtotal;
  }

  whichBuyable(){
    const url = `${this.baseUrl}/whichBuyable`;
    this.riepilogo = this.bookInCart;
    console.log(this.bookInCart)
    return this.http.post<any>(url,this.bookInCart);
  }

  
}
