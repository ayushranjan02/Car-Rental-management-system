import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css']
})
export class CarDeleteComponent implements OnInit {
  cars: Car[] = [];
  carId: number | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.getCars().subscribe({
      next: (data: Car[]) => {
        this.cars = data;
      },
      error: (error: any) => {
        console.error('Error fetching cars', error);
      }
    });
  }

  onSubmit(): void {
    if (this.carId !== null) {
      this.carService.deleteCar(this.carId).subscribe({
        next: () => {
          this.successMessage = 'Car deleted successfully!';
          this.errorMessage = null;
          this.loadCars();
          this.carId = null;
        },
        error: (error) => {
          this.errorMessage = 'Error deleting car.';
          this.successMessage = null;
          console.error('Error deleting car', error);
        }
      });
    }
  }

  deleteCar(carId: number): void {
    this.carService.deleteCar(carId).subscribe({
      next: () => {
        this.loadCars();
        this.successMessage = `Car with ID ${carId} deleted successfully!`;
        this.errorMessage = null;
      },
      error: (error: any) => {
        this.errorMessage = `Error deleting car with ID ${carId}.`;
        this.successMessage = null;
        console.error('Error deleting car', error);
      }
    });
  }
}
