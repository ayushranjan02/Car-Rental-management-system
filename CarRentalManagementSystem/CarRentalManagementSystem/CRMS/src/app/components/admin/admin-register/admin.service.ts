import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AdminRegisterDto } from 'src/app/models/admin-register-dto.model';
import { ChangePassword } from 'src/app/models/change-password.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  private baseUrl = 'https://localhost:7219/api/Admin';
  private adminListUpdated = new Subject<void>();

  constructor(private http: HttpClient) { }

  // Method to get authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Register Admin
  registerAdmin(admin: AdminRegisterDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/register-admin`, admin, { headers: this.getAuthHeaders() }).pipe(
      tap(() => {
        this.adminListUpdated.next();
      })
    );
  }

  // Get All Admins
  getAdmins(): Observable<AdminRegisterDto[]> {
    return this.http.get<AdminRegisterDto[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  // Change Password
  changePassword(data: ChangePassword): Observable<any> {
    return this.http.post(`${this.baseUrl}/ChangePassword`, data, { headers: this.getAuthHeaders() });
  }

  // Delete Admin by ID
  deleteAdmin(adminId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${adminId}`, { headers: this.getAuthHeaders() }).pipe(
      tap(() => {
        this.adminListUpdated.next();
      })
    );
  }

  // Expose the admin list updated listener
  getAdminListUpdatedListener(): Observable<void> {
    return this.adminListUpdated.asObservable();
  }

  // Public method to notify admin list update
  notifyAdminListUpdated() {
    this.adminListUpdated.next();
  }
}
