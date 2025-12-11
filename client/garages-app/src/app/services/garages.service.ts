import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Garage } from '../models/garage.model';

@Injectable({ providedIn: 'root' })
export class GaragesService {
  private apiUrl = 'http://localhost:5134/api/garages';

  constructor(private http: HttpClient) { }

  fetchLocalGarages(): Observable<Garage[]> {
    return this.http.get<Garage[]>(`${this.apiUrl}/all-local`);
  }

  fetchGovGarages(): Observable<Garage[]> {
    return this.http.get<Garage[]>(`${this.apiUrl}/all-gov`);
  }

  addGarage(garage: Garage): Observable<Garage> {
    return this.http.post<Garage>(`${this.apiUrl}/add`, garage);
  }

  addMultipleGarages(garages: Garage[]): Observable<{ added: Garage[], notAdded: string[], message?: string }> {
    return this.http.post<{ added: Garage[], notAdded: string[], message?: string }>(
      `${this.apiUrl}/add-multiple`, garages
    );
  }
}