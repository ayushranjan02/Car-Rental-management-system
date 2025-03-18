import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarRent } from '../models/car-rent.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarRentService {
  private baseUrl = 'https://localhost:7219/api/CarRent';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
  }

  getAllCarRents(): Observable<CarRent[]> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/GetAllCarRents`, { headers }).pipe(
      map(response => response.$values) 
    );
  }

  getAllPendingCarRents(): Observable<CarRent[]> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/GetAllPendingCarRents`, { headers }).pipe(
      map(response => response.$values), 
    );
  }

  getCustomerCarRents(customerId: number): Observable<CarRent[]> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/GetCustomerCarRents/${customerId}`, { headers }).pipe(
      map(response => response.$values), 
    );
  }

  getCarRentById(id: number): Observable<{ carRent: CarRent, paymentStatus: string }> {
    const headers = this.getHeaders();
    return this.http.get<{ carRent: CarRent, paymentStatus: string }>(`${this.baseUrl}/${id}`, { headers }).pipe(
      map(response => response)
    );
  }

  cancelCarRent(rentCarId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/CancelCarRent/${rentCarId}`, {}, { headers });
  }

  returnCarRent(rentCarId: number, customerId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/return/${rentCarId}/${customerId}`, {}, { headers });
  }

  rejectCarRent(rentCarId: number, adminId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/reject/${rentCarId}/${adminId}`, {}, { headers });
  }

  rentCar(rentCarRequest: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/rent-car`, rentCarRequest, { headers });
  }

  getPendingCarRent(rentCarId: number, customerId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/getpendingcarrent/${rentCarId}/${customerId}`, { headers }).pipe(
      map(response => response), 
    );
  }

  acceptCarRent(rentCarId: number, adminId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/accept/${rentCarId}/${adminId}`, {}, { headers });
  }
}
