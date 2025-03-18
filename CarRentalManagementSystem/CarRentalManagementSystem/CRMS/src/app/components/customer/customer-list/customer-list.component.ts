import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../customer-register/customer.service';
import { CustomerInfo } from 'src/app/models/customerInfo.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {
  customers: CustomerInfo[] = [];
  private customerListSubscription: Subscription = new Subscription();

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
    this.customerListSubscription = this.customerService.getCustomerListUpdatedListener().subscribe(() => {
      this.loadCustomers();
    });
  }

  ngOnDestroy(): void {
    this.customerListSubscription.unsubscribe();
  }

  loadCustomers(): void {
    this.customerService.getCustomersForCarList().subscribe({
      next: (data: CustomerInfo[]) => {
        console.log('Fetched customers:', data);
        this.customers = data;
      },
      error: (error: any) => {
        console.error('Error fetching customers', error);
        this.customers = []; 
      }
    });
  }
}
