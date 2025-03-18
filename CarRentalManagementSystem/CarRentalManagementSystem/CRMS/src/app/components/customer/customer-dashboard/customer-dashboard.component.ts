import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { CarRentService } from 'src/app/services/car-rent.service';
import { Car } from 'src/app/models/car.model';
import { CarRent } from 'src/app/models/car-rent.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  currentSection: string = 'car-list'; 
  customerName: string = 'Customer'; 
  greetingMessage: string = 'We hope you have a great experience renting cars with us!';
  importantNote: string = 'Important Note: Now your customer ID is in the profile section in the menu bar. Keep it for your reference to check your pending rent status, for checking your car rents, and for making payment. If you want to know your rentCarID, go to the Customer Car Rents section and enter your customer ID to check your rentCarID for your purpose.';
  fromDate: string = ''; 
  toDate: string = ''; 
  cars: Car[] = [];
  carRents: CarRent[] = [];
  isMenuCollapsed: boolean = true; 

  constructor(private carService: CarService, private carRentService: CarRentService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadAllCars();
  }

  toggleMenu(): void {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  navigateTo(section: string): void {
    this.currentSection = section;
    if (section === 'car-list') {
      this.loadAllCars();
    } else if (section === 'available-cars') {
      this.loadAvailableCars();
    } else if (section === 'rented-cars') {
      this.loadRentedCars();
    } else if (section === 'make-payment') {
    }
  }

  loadAllCars(): void {
    this.carService.getCars().subscribe({
      next: (data: Car[]) => {
        this.cars = data;
      },
      error: (error: any) => {
        console.error('Error fetching all cars', error);
      }
    });
  }

  loadAvailableCars(): void {
    this.carService.getAvailableCars().subscribe({
      next: (data: Car[]) => {
        this.cars = data;
      },
      error: (error: any) => {
        console.error('Error fetching available cars', error);
      }
    });
  }

  loadRentedCars(): void {
    this.carService.getRentedCars().subscribe({
      next: (data: Car[]) => {
        this.cars = data;
      },
      error: (error: any) => {
        console.error('Error fetching rented cars', error);
      }
    });
  }

  loadCustomerCarRents(): void {
    const customerId = this.authService.getCustomerId(); 
    if (customerId) {
      this.carRentService.getCustomerCarRents(customerId).subscribe({
        next: (data: CarRent[]) => {
          this.carRents = data;
        },
        error: (error: any) => {
          console.error('Error fetching customer car rents', error);
        }
      });
    } else {
      console.error('Customer ID not found.');
    }
  }

  getFullImageUrl(imageUrl: string | undefined): string {
    return imageUrl ? `https://localhost:7219${imageUrl}` : 'assets/images/car5.jpg';
  }

  cancelCarRent(rentCarId: number): void {
    this.carRentService.cancelCarRent(rentCarId).subscribe({
      next: () => {
        console.log('Car rent canceled successfully');
        this.loadCustomerCarRents();
      },
      error: (error: any) => {
        console.error('Error canceling car rent', error);
      }
    });
  }

  returnCar(rentCarId: number, customerId: number): void {
    this.carRentService.returnCarRent(rentCarId, customerId).subscribe({
      next: () => {
        console.log('Car returned successfully');
        this.loadCustomerCarRents();
      },
      error: (error: any) => {
        console.error('Error returning car', error);
      }
    });
  }
}
