import { Component, OnInit } from '@angular/core';
import { CarRentService } from 'src/app/services/car-rent.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-car-rent-cancel',
  templateUrl: './car-rent-cancel.component.html',
  styleUrls: ['./car-rent-cancel.component.css']
})
export class CarRentCancelComponent implements OnInit {
  rentCarId: number = 0;
  successMessage: string = '';
  additionalMessage: string = '';
  errorMessage: string = '';

  constructor(private carRentService: CarRentService) {}

  ngOnInit(): void {
  
  }

  async onCancelCarRent() {
    this.successMessage = '';
    this.additionalMessage = '';
    this.errorMessage = '';
  
    if (this.rentCarId > 0) {
      try {
        const response: any = await firstValueFrom(this.carRentService.cancelCarRent(this.rentCarId));
        if (response.status === 'Success') {
          this.successMessage = response.message;
          this.additionalMessage = 'You missed an opportunity to travel with the best car rental service. We hope to serve you in the future!';
        } else if (response.status === 'AlreadyCanceled') {
          this.errorMessage = 'This car rent has already been canceled.';
        } else {
          this.errorMessage = 'Cancellation failed. Please try again.';
        }
      } catch (error: any) {
        this.errorMessage = 'An error occurred while canceling the car rent. Please try again.';
      }
    } else {
      this.errorMessage = 'Please enter a valid Rent Car ID.';
    }
  }
}
