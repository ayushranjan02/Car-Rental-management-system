import { Component, OnInit } from '@angular/core';
import { CarRentService } from 'src/app/services/car-rent.service';
import { CarRent } from 'src/app/models/car-rent.model';

@Component({
  selector: 'app-car-rent-pending',
  templateUrl: './car-rent-pending.component.html',
  styleUrls: ['./car-rent-pending.component.css']
})
export class CarRentPendingComponent implements OnInit {
  pendingCarRents: CarRent[] = [];
  errorMessage: string | null = null;

  constructor(private carRentService: CarRentService) {}

  ngOnInit(): void {
    this.loadPendingCarRents();
  }

  loadPendingCarRents(): void {
    this.carRentService.getAllPendingCarRents().subscribe({
      next: (data: CarRent[]) => {
        if (Array.isArray(data)) {
          this.pendingCarRents = data;
        } else {
          this.errorMessage = 'Unexpected response format.';
          console.error('Unexpected response format:', data);
        }
      },
      error: (error: any) => {
        this.errorMessage = 'Error fetching pending car rents.';
        console.error('Error fetching pending car rents', error);
      }
    });
  }
}
