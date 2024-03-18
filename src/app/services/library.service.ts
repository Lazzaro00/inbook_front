import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { libraryModelResponse } from '../models/library.model';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  private baseUrl = `${environment.apiUrl}library`;

  constructor(private http: HttpClient) { }

  getAllLibraries(pageSize: number, pageNumber: number): Observable<any> {
    const url = `${this.baseUrl}/getall?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    return this.http.get<any>(url);
  }

  readLibrary(libId: number): Observable<libraryModelResponse> {
    const url = `${this.baseUrl}/read?id=${libId}`;
    return this.http.get<libraryModelResponse>(url);
  }

  insertLibrary(payload: libraryModelResponse): Observable<libraryModelResponse> {
    return this.http.post<libraryModelResponse>(`${this.baseUrl}/insert`, payload);
  }

  updateLibrary(payload: libraryModelResponse): Observable<libraryModelResponse> {
    return this.http.put<libraryModelResponse>(`${this.baseUrl}/update`, payload);
  }

  deleteLibrary(libId: number): Observable<any> {
    const url = `${this.baseUrl}/delete?id=${libId}`;
    return this.http.delete(url);
  }

  getRelatedBooks(bookId:number): Observable<any>{
    const url = `${this.baseUrl}/getRelatedBook?id=${bookId}`;
    return this.http.get<any>(url);
  }

  getLibraryByEmail(email:String): Observable<any>{
    const url = `${this.baseUrl}/getByAdminEmail?email=${email}`;
    return this.http.get<any>(url);
  } 

  getall(){
    const url = `${this.baseUrl}/getAllList`;
    return this.http.get<any>(url);
  }

  insertExistLibrary(payload: any){
    const url = `${this.baseUrl}/`;
    return this.http.post<any>(url, payload);
  }
}
