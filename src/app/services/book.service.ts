import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { bookModelResponse } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = `${environment.apiUrl}book`;

  constructor(private http: HttpClient) { }

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

}
