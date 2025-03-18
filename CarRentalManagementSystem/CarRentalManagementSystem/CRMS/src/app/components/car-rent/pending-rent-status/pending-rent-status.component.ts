import { Component } from '@angular/core';
import { CarRentService } from 'src/app/services/car-rent.service';

@Component({
  selector: 'app-pending-rent-status',
  templateUrl: './pending-rent-status.component.html',
  styleUrls: ['./pending-rent-status.component.css']
})
export class PendingRentStatusComponent {
  rentCarId: number = 0;
  customerId: number = 0;
  rentStatus: any = null;
  errorMessage: string = '';

  constructor(private carRentService: CarRentService) {}

  onCheckStatus() {
    if (this.rentCarId > 0 && this.customerId > 0) {
      this.carRentService.getPendingCarRent(this.rentCarId, this.customerId).subscribe(
        response => {
          console.log('Full rent status response:', response); // Log the full response
          this.rentStatus = response; // Assign the response directly to rentStatus
          console.log('Rent status assigned:', this.rentStatus);
          this.errorMessage = '';
        },
        error => {
          this.rentStatus = null;
          this.errorMessage = 'An error occurred while checking the rent status. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please enter valid Rent Car ID and Customer ID.';
    }
  }
}
