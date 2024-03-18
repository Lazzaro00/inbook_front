import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuyService {

    private baseUrl = `${environment.apiUrl}buy`;

    constructor(private http: HttpClient) {}

  getAllHistorical(idUser:number){
    const url = `${this.baseUrl}/getByUser?userId=${idUser}`;
    return this.http.get<any>(url);
  }
}
