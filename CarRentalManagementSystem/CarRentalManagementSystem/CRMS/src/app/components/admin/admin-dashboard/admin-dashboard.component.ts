import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  ngOnInit(): void {
    
  }
  currentSection: string = 'admin-dashboard-metrics';
  adminName: string = 'Admin'; 
  

  navigateTo(section: string) {
    this.currentSection = section;
  }
}
