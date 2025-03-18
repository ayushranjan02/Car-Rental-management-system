import { Component, OnInit } from '@angular/core';
import { CarRentService } from 'src/app/services/car-rent.service';
import { CarRent } from 'src/app/models/car-rent.model';

@Component({
  selector: 'app-car-rent-customer',
  templateUrl: './car-rent-customer.component.html',
  styleUrls: ['./car-rent-customer.component.css']
})
export class CarRentCustomerComponent implements OnInit {
  customerId: number = 0; 
  carRents: CarRent[] = [];
  errorMessage: string = '';
  hasSubmitted: boolean = false; 

  constructor(private carRentService: CarRentService) {}

  ngOnInit(): void {
   
  }

  onCheckCarRents() {
    this.hasSubmitted = true; 
    if (this.customerId > 0) {
      this.carRentService.getCustomerCarRents(this.customerId).subscribe(
        (data: CarRent[]) => {
          this.carRents = data;
          this.errorMessage = '';
        },
        (error: any) => {
          this.carRents = [];
          this.errorMessage = 'An error occurred while fetching car rents. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please enter a valid Customer ID.';
    }
  }
}
