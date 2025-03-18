import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Car } from '../models/car.model';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseUrl = 'https://localhost:7219/api/Cars';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  addCar(car: FormData): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/add-car`, car, { headers });
  }

  getCars(): Observable<Car[]> {
    const headers = this.getHeaders();
    return this.http.get<any>(this.baseUrl, { headers }).pipe(
      map((response: any) => {
        console.log('API Response:', response);
        return response.$values || response; 
      })
    );
  }

  getCarById(carId: number): Observable<Car> {
    const headers = this.getHeaders();
    return this.http.get<Car>(`${this.baseUrl}/${carId}`, { headers });
  }

  updateCar(carId: number, car: Car): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/${carId}`, car, { headers });
  }

  deleteCar(carId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/${carId}`, { headers });
  }

  getRentedCars(): Observable<Car[]> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/rented`, { headers }).pipe(
      map((response: any) => {
        console.log('API Response:', response);
        return response.$values || response; 
      })
    );
  }

  getAvailableCars(): Observable<Car[]> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/available`, { headers }).pipe(
      map((response: any) => {
        console.log('API Response:', response);
        return response.$values || response; 
      })
    );
  }
}
