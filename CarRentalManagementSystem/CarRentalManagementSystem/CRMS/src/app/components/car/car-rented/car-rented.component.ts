import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-car-rented',
  templateUrl: './car-rented.component.html',
  styleUrls: ['./car-rented.component.css']
})
export class CarRentedComponent implements OnInit {
  cars: Car[] = [];

  private baseUrl = 'https://localhost:7219'; // Update with your backend base URL

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.loadRentedCars();
  }

  loadRentedCars(): void {
    this.carService.getRentedCars().subscribe({
      next: (data: Car[]) => {
        if (Array.isArray(data)) {
          this.cars = data;
        } else {
          console.error('Unexpected response format:', data);
        }
      },
      error: (error: any) => {
        console.error('Error fetching rented cars', error);
      }
    });
  }

  getFullImageUrl(imageUrl: string | undefined): string {
    return imageUrl ? `${this.baseUrl}${imageUrl}` : 'assets/images/car5.jpg';
  }
}
