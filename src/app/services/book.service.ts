import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { bookModelResponse } from '../models/book.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  inserimentoLibro: FormGroup;
  isModifica: boolean = false;
  

  private baseUrl = `${environment.apiUrl}book`;

  constructor(private http: HttpClient, private fb:FormBuilder) {
    this.inserimentoLibro = this.fb.group({
      id: [""],
      images:['', Validators.required],
      name:["", Validators.required],
      category:["", Validators.required],
      price:["", Validators.required],
      serialcode:["", Validators.required],
      quantity:["", Validators.required],
      description:["", Validators.required],
      library:[ ],
    });
   }

  getAllBooks(pageSize: number, pageNumber: number): Observable<any> {
    const url = `${this.baseUrl}/getall?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    return this.http.get<any>(url);
  }

  getBookDetails(bookId: number): Observable<bookModelResponse> {
    const url = `${this.baseUrl}/read?id=${bookId}`;
    return this.http.get<bookModelResponse>(url);
  }

  insertBook(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/insert`, payload);
  }

  updateBook(payload: bookModelResponse): Observable<bookModelResponse> {
    return this.http.put<bookModelResponse>(`${this.baseUrl}/update`, payload);
  }

  deleteBook(bookId: number): Observable<any> {
    const url = `${this.baseUrl}/delete?id=${bookId}`;
    return this.http.delete(url);
  }

  getAllCategory():Observable<string[]>{
    const url = `${this.baseUrl}/getAllCategory`;
    return this.http.get<string[]>(url);
  }

  getByLibraryId(id:number, pageNum:number, pageSize:number):Observable<any>{
    const url = `${this.baseUrl}/getByLibraryPageable?libraryId=${id}&pageNum=${pageNum}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }

  editProduct(id:number){
    this.isModifica = true;
    this.getBookDetails(id).subscribe({
      next: (res) => {
        this.inserimentoLibro = this.fb.group({
          id: id,
          images: res.images,
          name: res.name,
          category: res.category,
          price: res.price,
          serialcode: res.serialcode,
          quantity: res.quantity,
          description: res.description,
          library: res.library,
        })

        console.log(this.inserimentoLibro.value)
      }
    })
  }

}
