import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'https://localhost:7219/api/Payment';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  makePayment(payment: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/make-payment`, payment, { headers });
  }

  listPayments(): Observable<Payment[]> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}`, { headers }).pipe(
      map((response: any) => {
        console.log('API Response:', response);
        return response.$values || response;
      })
    );
  }
}
