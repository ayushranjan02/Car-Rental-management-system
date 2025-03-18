import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { DashboardMetrics } from '../models/dashboard-metrics.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardMetricsService {
  private baseUrl = 'https://localhost:7219/api/Dashboard';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getMetrics(): Observable<DashboardMetrics> {
    const headers = this.getAuthHeaders();

    return forkJoin({
      totalCars: this.http.get<number>(`${this.baseUrl}/totalcars`, { headers }),
      totalCustomers: this.http.get<number>(`${this.baseUrl}/totalcustomers`, { headers }),
      totalAdmins: this.http.get<number>(`${this.baseUrl}/totalAdmins`, { headers }),
      totalRents: this.http.get<number>(`${this.baseUrl}/totalrents`, { headers }),
      pendingRents: this.http.get<number>(`${this.baseUrl}/pendingrents`, { headers }),
      paidRents: this.http.get<number>(`${this.baseUrl}/paidrents`, { headers })
    }).pipe(
      map(results => ({
        totalCars: results.totalCars,
        totalCustomers: results.totalCustomers,
        totalAdmins: results.totalAdmins,
        totalRents: results.totalRents,
        pendingRents: results.pendingRents,
        paidRents: results.paidRents
      }))
    );
  }
}
