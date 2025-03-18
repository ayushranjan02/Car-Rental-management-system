import { Component, OnInit } from '@angular/core';
import { CarRentService } from 'src/app/services/car-rent.service';
import { CarRent } from 'src/app/models/car-rent.model';

@Component({
  selector: 'app-car-rent-list',
  templateUrl: './car-rent-list.component.html',
  styleUrls: ['./car-rent-list.component.css']
})
export class CarRentListComponent implements OnInit {
  allCarRents: CarRent[] = [];
  errorMessage: string | null = null;

  constructor(private carRentService: CarRentService) {}

  ngOnInit(): void {
    this.loadAllCarRents();
  }

  loadAllCarRents(): void {
    this.carRentService.getAllCarRents().subscribe({
      next: (data: CarRent[]) => {
        if (Array.isArray(data)) {
          this.allCarRents = data;
          console.log('Car rents loaded:', data); 
        } else {
          this.errorMessage = 'Unexpected response format.';
          console.error('Unexpected response format:', data);
        }
      },
      error: (error: any) => {
        this.errorMessage = 'Error fetching car rents.';
        console.error('Error fetching car rents', error);
      }
    });
  }
}
