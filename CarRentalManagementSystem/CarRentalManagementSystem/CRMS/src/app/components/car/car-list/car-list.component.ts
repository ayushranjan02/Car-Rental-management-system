import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];

  private baseUrl = 'https://localhost:7219'; // Update with your backend base URL

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.getCars().subscribe({
      next: (data: Car[]) => {
        if (Array.isArray(data)) {
          this.cars = data;
        } else {
          console.error('Unexpected response format:', data);
        }
      },
      error: (error: any) => {
        console.error('Error fetching cars', error);
      }
    });
  }

  getFullImageUrl(imageUrl: string | undefined): string {
    return imageUrl ? `${this.baseUrl}${imageUrl}` : 'assets/images/car5.jpg';
  }

  rentCar(car: Car): void {
    console.log(`Renting car: ${car.carName}`);
  }
}
