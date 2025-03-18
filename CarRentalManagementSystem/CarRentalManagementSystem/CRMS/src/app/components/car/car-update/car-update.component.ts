import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  carId: number | null = null;
  carToUpdate: Car = {
    carId: 0,
    carName: '',
    model: '',
    color: '',
    year: '',
    fuelType: '',
    rentPrice: 0,
    availability_Status: '',
    seater: 0
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    // Initialization logic
  }

  loadCarDetails(): void {
    this.successMessage = null; // Reset success message
    this.errorMessage = null; // Reset error message
    if (this.carId !== null) {
      this.carService.getCarById(this.carId).subscribe({
        next: (data: Car) => {
          this.carToUpdate = data;
        },
        error: (error: any) => {
          console.error('Error fetching car details', error);
          this.errorMessage = 'Error fetching car details.';
        }
      });
    }
  }

  updateCar(): void {
    this.successMessage = null; // Reset success message
    this.errorMessage = null; // Reset error message
    if (this.carToUpdate && this.carToUpdate.carId) {
      this.carService.updateCar(this.carToUpdate.carId, this.carToUpdate).subscribe({
        next: () => {
          this.successMessage = 'Car updated successfully!';
          this.errorMessage = null;
        },
        error: (error: any) => {
          this.errorMessage = 'Error updating car.';
          this.successMessage = null;
          console.error('Error updating car', error);
        }
      });
    }
  }
}
