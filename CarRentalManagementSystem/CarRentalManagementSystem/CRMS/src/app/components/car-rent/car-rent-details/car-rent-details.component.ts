import { Component, OnInit } from '@angular/core';
import { CarRentService } from 'src/app/services/car-rent.service';
import { CarRent } from 'src/app/models/car-rent.model';

@Component({
  selector: 'app-car-rent-details',
  templateUrl: './car-rent-details.component.html',
  styleUrls: ['./car-rent-details.component.css']
})
export class CarRentDetailsComponent implements OnInit {
  rentCarId: number | null = null;
  carRentDetails: CarRent | null = null;
  carName: string | null = null;
  model: string | null = null;
  errorMessage: string | null = null;

  constructor(private carRentService: CarRentService) {}

  ngOnInit(): void {}

  loadCarRentDetails(): void {
    if (this.rentCarId !== null && !isNaN(this.rentCarId)) {
      this.carRentService.getCarRentById(this.rentCarId).subscribe({
        next: (response: { carRent: CarRent, paymentStatus: string }) => {
          const { carRent } = response; 
          if (carRent) {
            this.carRentDetails = carRent;
            this.errorMessage = null;
          } else {
            this.errorMessage = 'Invalid car rent ID.';
            this.carRentDetails = null;
          }
        },
        error: (error: any) => {
          this.errorMessage = 'Error fetching car rent details.';
          this.carRentDetails = null;
          console.error('Error fetching car rent details', error);
        }
      });
    } else {
      this.errorMessage = 'Invalid car rent ID.';
      this.carRentDetails = null;
    }
  }
}
