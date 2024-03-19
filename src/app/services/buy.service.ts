import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { buyModelResponse } from '../models/buy.model';

@Injectable({
  providedIn: 'root'
})
export class BuyService {

    private baseUrl = `${environment.apiUrl}buy`;

    private listFiltered:buyModelResponse[] = [];
    

    constructor(private http: HttpClient) {}

  getAllHistorical(idUser:number){
    const url = `${this.baseUrl}/getByUser?userId=${idUser}`;
    return this.http.get<any>(url);
  }

  setListFiltered(list:buyModelResponse[]){
    this.listFiltered = list;
  }

  getListFiltered(){
    return this.listFiltered;
  }
}
