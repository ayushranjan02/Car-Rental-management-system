import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-car-available',
  templateUrl: './car-available.component.html',
  styleUrls: ['./car-available.component.css']
})
export class CarAvailableComponent implements OnInit {
  cars: Car[] = [];

  private baseUrl = 'https://localhost:7219'; 

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.loadAvailableCars();
  }

  loadAvailableCars(): void {
    this.carService.getAvailableCars().subscribe({
      next: (data: Car[]) => {
        if (Array.isArray(data)) {
          this.cars = data;
        } else {
          console.error('Unexpected response format:', data);
        }
      },
      error: (error: any) => {
        console.error('Error fetching available cars', error);
      }
    });
  }

  getFullImageUrl(imageUrl: string | undefined): string {
    return imageUrl ? `${this.baseUrl}${imageUrl}` : 'assets/images/car5.jpg';
  }
}
