import { Component, OnInit } from '@angular/core';
import { CarRentService } from 'src/app/services/car-rent.service';
import { CarRent } from 'src/app/models/car-rent.model';

@Component({
  selector: 'app-car-rent-reject',
  templateUrl: './car-rent-reject.component.html',
  styleUrls: ['./car-rent-reject.component.css']
})
export class CarRentRejectComponent implements OnInit {
  pendingCarRents: CarRent[] = [];
  adminId: number = 0; 
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private carRentService: CarRentService) {}

  ngOnInit(): void {
    this.loadPendingCarRents();
  }

  loadPendingCarRents(): void {
    this.carRentService.getAllPendingCarRents().subscribe({
      next: (data: CarRent[]) => {
        if (Array.isArray(data)) {
          this.pendingCarRents = data;
        } else {
          this.errorMessage = 'Unexpected response format.';
          console.error('Unexpected response format:', data);
        }
      },
      error: (error: any) => {
        this.errorMessage = 'Error fetching pending car rents.';
        console.error('Error fetching pending car rents', error);
      }
    });
  }

  rejectRent(rentCarId: number): void {
    const adminIdStr = prompt('Please enter your admin ID:');
    const adminId = parseInt(adminIdStr || '', 10);
    if (!isNaN(adminId)) {
      console.log('Rejecting rent for car ID:', rentCarId, 'by admin ID:', adminId);
      this.carRentService.rejectCarRent(rentCarId, adminId).subscribe({
        next: (response) => {
          console.log('Reject rent response:', response);
          this.successMessage = response.message;
          this.errorMessage = null;
          this.loadPendingCarRents();
        },
        error: (error: any) => {
          console.error('Error rejecting car rent:', error);
          console.error('Error status:', error.status);
          console.error('Error message:', error.message);
          this.errorMessage = 'Error rejecting car rent. ' + (error.error ? error.error : '');
          this.successMessage = null;
        }
      });
    } else {
      this.errorMessage = 'Invalid admin ID. Please try again.';
    }
  }
}
