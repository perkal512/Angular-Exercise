import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Garage } from '../models/garage.model';

@Injectable({
  providedIn: 'root'
})
export class GarageService {

  private apiUrl = 'https://localhost:5134/api/garages'; 

  constructor(private http: HttpClient) { }

  getAllGarages(): Observable<Garage[]> {
    return this.http.get<Garage[]>(`${this.apiUrl}/get-all`);
  }

  getExternalGarages(): Observable<Garage[]> {
    return this.http.get<Garage[]>(`${this.apiUrl}/garages-from-gov`);
  }

  addGarage(garage: Garage): Observable<Garage> {
    return this.http.post<Garage>(`${this.apiUrl}/add`, garage);
  }

  addMultipleGarages(garages: Garage[]): Observable<Garage[]> {
    return this.http.post<Garage[]>(`${this.apiUrl}/add-multiple`, garages);
  }
}