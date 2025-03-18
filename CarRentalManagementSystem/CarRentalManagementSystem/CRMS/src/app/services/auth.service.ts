import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private tokenSubject: BehaviorSubject<string | null>;
  public token$: Observable<string | null>;
  private userRoleSubject: BehaviorSubject<string>;
  public userRole$: Observable<string>;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userType') || '';
    this.tokenSubject = new BehaviorSubject<string | null>(token);
    this.token$ = this.tokenSubject.asObservable();
    this.userRoleSubject = new BehaviorSubject<string>(userRole);
    this.userRole$ = this.userRoleSubject.asObservable();

    
  }

  login(email: string, password: string, userType: string): Observable<any> {
    let loginEndpoint = '';
  
    if (userType === 'admin') {
      loginEndpoint = 'https://localhost:7219/api/Admin/login';
    } else if (userType === 'customer') {
      loginEndpoint = 'https://localhost:7219/api/Customer/login';
    } else {
      console.error("Invalid user type:", userType);
      return throwError(() => new Error("Invalid user type"));
    }
    localStorage.setItem('email', email); 

    return this.http.post<any>(loginEndpoint, { email, password }).pipe(
      tap((response: any) => {
        
        if (response.token) {
          this.setToken(response.token);
          localStorage.setItem('userType', userType);
          this.userRoleSubject.next(userType);
          
          // if (response.customer) {
          //   // localStorage.setItem('customerDetails', JSON.stringify(response.customer));
          //   localStorage.setItem('customerId', response.customer.customerId.toString()); 
          //   console.log('Customer ID stored:', response.customer.customerId); 
          // } else {
          //   console.error('Customer details not found in response:', response);
          // }
          this.tokenSubject.next(response.token);
        }
      }),
      catchError((error) => {
        console.error("Login error:", error);
        return throwError(() => error);
      })
    );
  }
  

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('userType');
    localStorage.removeItem('role');
    localStorage.removeItem('customerDetails'); 
    localStorage.removeItem('customerId'); 
    this.tokenSubject.next(null);
    this.userRoleSubject.next('');
    
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string {
    return localStorage.getItem('userType') || '';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserType(): string | null {
    return localStorage.getItem('userType');
  }

  getCustomerId(): number | null {
    const customerId = localStorage.getItem('customerId');
    return customerId ? parseInt(customerId, 10) : null;
  }
}
