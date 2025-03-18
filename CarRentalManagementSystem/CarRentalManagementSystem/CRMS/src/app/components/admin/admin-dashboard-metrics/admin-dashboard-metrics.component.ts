import { Component, OnInit } from '@angular/core';
import { DashboardMetricsService } from 'src/app/services/dashboard-metrics.service';
import { DashboardMetrics } from 'src/app/models/dashboard-metrics.model';

@Component({
  selector: 'app-admin-dashboard-metrics',
  templateUrl: './admin-dashboard-metrics.component.html',
  styleUrls: ['./admin-dashboard-metrics.component.css']
})
export class AdminDashboardMetricsComponent implements OnInit {
  metrics: DashboardMetrics = {
    totalCars: 0,
    totalCustomers: 0,
    totalAdmins: 0,
    totalRents: 0,
    pendingRents: 0,
    paidRents: 0
  };

  constructor(private metricsService: DashboardMetricsService) {}

  ngOnInit(): void {
    this.fetchMetrics();
  }

  fetchMetrics(): void {
    this.metricsService.getMetrics().subscribe({
      next: (data: DashboardMetrics) => {
        this.metrics = data;
      },
      error: (error: any) => {
        console.error('Error fetching metrics', error);
      }
    });
  }
}
