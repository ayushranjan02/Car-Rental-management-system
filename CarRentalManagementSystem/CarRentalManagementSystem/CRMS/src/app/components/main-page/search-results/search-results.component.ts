import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchTerm: string = '';
  role: string = '';
  isAdmin: boolean = false;
  isCustomer: boolean = false;
  filteredOptions: Array<{ label: string, route: string }> = [];

  adminOptions: Array<{ label: string, route: string }> = [
    { label: 'List Admins', route: 'AdminList' },
    { label: 'Change Password', route: 'AdminChangePassword' },
    { label: 'Add Car', route: 'CarAdd' },
    { label: 'List Cars', route: 'CarList' },
    { label: 'Rented Cars', route: 'CarRented' },
    { label: 'Available Cars', route: 'CarAvailable' },
    { label: 'Update Car', route: 'CarUpdate' },
    { label: 'Delete Car', route: 'CarDelete' },
    { label: 'List Car Rents', route: 'CarRentList' },
    { label: 'Pending Car Rents', route: 'CarRentPending' },
    { label: 'Accept Car Rent', route: 'CarRentAccept' },
    { label: 'Reject Car Rent', route: 'CarRentReject' },
    { label: 'Car Rent Details', route: 'CarRentDetails' },
    { label: 'List Payments', route: 'PaymentList' },
    { label: 'List Customers', route: 'CustomerList' }
  ];

  customerOptions: Array<{ label: string, route: string }> = [
    { label: 'Car List', route: 'CarList' },
    { label: 'Rented Cars', route: 'CarRented' },
    { label: 'Available Cars', route: 'CarAvailable' },
    { label: 'Change Password', route: 'CustomerChangePassword' },
    { label: 'Customer Car Rents', route: 'CarRentCustomer' },
    { label: 'Rent a Car', route: 'RentCar' },
    { label: 'Pending Rent Status', route: 'PendingRentStatus' },
    { label: 'Make Payment', route: 'MakePayment' },
    { label: 'Cancel Car Rent', route: 'CarRentCancel' },
    { label: 'Return Car', route: 'CarRentReturn' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['q'];
      this.role = params['role'];
      this.isAdmin = this.role === 'admin';
      this.isCustomer = this.role === 'customer';
      this.filterOptions();
    });
  }

  filterOptions(): void {
    const options = this.isAdmin ? this.adminOptions : this.customerOptions;
    this.filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  navigateToDashboard(): void {
    if (this.isAdmin) {
      this.router.navigate(['/AdminDashboard']);
    } else if (this.isCustomer) {
      this.router.navigate(['/CustomerDashboard']);
    }
  }
}
