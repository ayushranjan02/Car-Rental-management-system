import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { CustomerInfo } from 'src/app/models/customerInfo.model';
import { CustomerRegisterDto } from 'src/app/models/customer-register-dto.models';
import { ChangePassword } from 'src/app/models/change-password.model';
import { map, tap } from 'rxjs/operators'; // Import map operator
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'https://localhost:7219/api/Customer';
  private customerListUpdated = new Subject<void>();

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  registerCustomer(customer: CustomerRegisterDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, customer).pipe(
      tap(() => {
        this.customerListUpdated.next();
      })
    );
  } 

  getCustomerProfile(email: string): Observable<CustomerInfo> {
    return this.http.get<CustomerInfo>(`${this.baseUrl}/profile/${email}`, { headers: this.getHeaders() });
  }

  changePassword(data: ChangePassword): Observable<any> {
    return this.http.post(`${this.baseUrl}/ChangePassword`, data, { headers: this.getHeaders() });
  }

  deleteCustomer(customerId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${customerId}`, { headers: this.getHeaders() }).pipe(
      tap(() => {
        this.customerListUpdated.next();
      })
    );
  }

  getCustomerListUpdatedListener(): Observable<void> {
    return this.customerListUpdated.asObservable();
  }

  notifyCustomerListUpdated() {
    this.customerListUpdated.next();
  }

  getCustomerDetails(): Observable<CustomerInfo> {
    const email = localStorage.getItem('email');
    const api = "https://localhost:7219/api/Customer/";
    console.log(email);
    // return this.http.get<CustomerInfo>(`${api}${email}`,{headers: this.getHeaders()});
    return this.http.get<CustomerInfo>(`${api}getByEmail/${email}`,{headers: this.getHeaders()});
  }
  
  getCustomersForCarList(): Observable<CustomerInfo[]> {
    return this.http.get<{ $values: CustomerInfo[] }>(this.baseUrl, { headers: this.getHeaders() }).pipe(
      map((response: { $values: CustomerInfo[] }) => response.$values), 
      tap(customers => console.log('Fetched customers:', customers))
    );
  }
}
