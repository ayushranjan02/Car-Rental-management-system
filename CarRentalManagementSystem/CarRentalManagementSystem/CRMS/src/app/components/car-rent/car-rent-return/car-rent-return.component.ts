import { Component, OnInit } from '@angular/core';
import { CarRentService } from 'src/app/services/car-rent.service';
import { CarRent } from 'src/app/models/car-rent.model';

@Component({
  selector: 'app-car-rent-return',
  templateUrl: './car-rent-return.component.html',
  styleUrls: ['./car-rent-return.component.css']
})
export class CarRentReturnComponent implements OnInit {
  rentCarId: number = 0; // Add rentCarId input
  customerId: number = 0; // Add customerId input
  responseMessage: string = '';
  additionalMessage: string = '';
  rentDetails: CarRent | null = null;
  errorMessage: string = '';

  constructor(private carRentService: CarRentService) {}

  ngOnInit(): void {
  }

  onReturnCarRent() {
    this.responseMessage = '';
    this.additionalMessage = '';
    this.rentDetails = null;
    this.errorMessage = '';

    if (this.rentCarId > 0 && this.customerId > 0) {
      this.carRentService.getCarRentById(this.rentCarId).subscribe({
        next: response => {
          const { carRent, paymentStatus } = response;
          console.log('Rent Status:', carRent.rentStatus); 
          console.log('Payment Status:', paymentStatus); 
    
          if (carRent.rentStatus.trim().toLowerCase() === 'paid' && paymentStatus.trim().toLowerCase() === 'completed') {
            this.carRentService.returnCarRent(this.rentCarId, this.customerId).subscribe({
              next: returnResponse => {
                if (returnResponse.status === 'Success') {
                  this.responseMessage = returnResponse.message;
                  this.additionalMessage = 'See you soon! Glad you had a wonderful journey with us. We hope to serve you again in the near future!';
                  this.rentDetails = returnResponse.rentCar;
                } else {
                  this.errorMessage = 'Return failed. Please try again.';
                }
              },
              error: () => {
                this.errorMessage = 'An error occurred while returning the car rent. Please try again.';
              }
            });
          } else {
            if (carRent.rentStatus.trim().toLowerCase() !== 'paid') {
              this.errorMessage = 'Car rent is still pending. You cannot return the car yet.';
            } else {
              this.errorMessage = 'Payment is not completed. Please complete the payment before returning the car.';
            }
          }
        },
        error: () => {
          this.errorMessage = 'An error occurred while fetching the car rent details. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'Please enter valid Rent Car ID and Customer ID.';
    }
  }
}
