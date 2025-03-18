import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarRentService } from 'src/app/services/car-rent.service';
import { CarRent } from 'src/app/models/car-rent.model';

@Component({
  selector: 'app-rent-car',
  templateUrl: './rent-car.component.html',
  styleUrls: ['./rent-car.component.css']
})
export class RentCarComponent {
  rentCarRequest = {
    carId: 0,
    rentFromDate: '',
    rentToDate: ''
  };
  successMessage: string = '';
  errorMessage: string = '';
  rentCarDetails: CarRent | null = null;

  constructor(private carRentService: CarRentService, private router: Router) {}

  onSubmit() {
    console.log('Submitting car rental request:', this.rentCarRequest);
    
    // Validate dates
    const fromDate = new Date(this.rentCarRequest.rentFromDate);
    const toDate = new Date(this.rentCarRequest.rentToDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (fromDate < today || toDate < today) {
      this.errorMessage = 'Dates must be in the future.';
      this.successMessage = '';
      return;
    }

    if (toDate < fromDate) {
      this.errorMessage = 'To date cannot be before from date.';
      this.successMessage = '';
      return;
    }

    this.carRentService.rentCar(this.rentCarRequest).subscribe(
      response => {
        console.log('Received response:', response);
        this.successMessage = response.message + ' Please make note of your Rent Car ID and amount to make the payment. It won\'t take much time.'; // Added detailed message
        this.errorMessage = '';
        this.rentCarDetails = response.rentCar; // Store the rent car details from the response
      },
      error => {
        console.error('Error response:', error);
        this.successMessage = '';
        if (error.status === 401) {
          this.errorMessage = 'Unauthorized access. Please log in to proceed.';
        } else if (error.status === 404) {
          this.errorMessage = 'Car Already Rented.';
        } else {
          this.errorMessage = 'An error occurred while submitting your request. Please try again.';
        }
      }
    );
  }
}
