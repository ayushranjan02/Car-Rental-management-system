import { Component } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent {
  car: Car = {
    carName: '',
    model: '',
    color: '',
    year: new Date().getFullYear().toString(), // Convert year to string
    fuelType: '',
    rentPrice: 0,
    availability_Status: 'Available',
    seater: 0 // Default value
  };

  selectedFile: File | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private carService: CarService) {}

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('CarName', this.car.carName);
    formData.append('Model', this.car.model);
    formData.append('Color', this.car.color);
    formData.append('Year', this.car.year); // Year is already a string
    formData.append('FuelType', this.car.fuelType);
    formData.append('RentPrice', this.car.rentPrice.toString());
    formData.append('Availability_Status', this.car.availability_Status);
    if (this.car.seater) {
      formData.append('Seater', this.car.seater.toString());
    }
    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
    }

    this.carService.addCar(formData).subscribe({
      next: (response) => {
        this.successMessage = 'Car added successfully!';
        this.errorMessage = null;
        this.resetForm();
      },
      error: (error) => {
        this.errorMessage = 'Error adding car.';
        this.successMessage = null;
        console.error('Error adding car', error);
      }
    });
  }

  // onModelChange() {
  //   if (this.car.model === 'Automatic') {
  //     this.car.fuelType = 'Ev';
  //   } else {
  //     this.car.fuelType = ''; // Reset the fuel type if the model is not Automatic
  //   }
  // }
  
  resetForm(): void {
    this.car = {
      carName: '',
      model: '',
      color: '',
      year: new Date().getFullYear().toString(), // Convert year to string
      fuelType: '',
      rentPrice: 0,
      availability_Status: 'Available',
      seater: 4
    };
    this.selectedFile = null;
  }
}
