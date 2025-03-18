import { Component, OnInit } from '@angular/core';
import { CustomerInfo } from 'src/app/models/customerInfo.model';
import { AuthService } from 'src/app/services/auth.service'; 
import { CustomerService } from '../../customer-register/customer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  customer: CustomerInfo;

  customerName: string = 'Customer'; 

  constructor(private authService: AuthService, private customerService: CustomerService) 
  {
    this.customer = {
      customerId: 0,
      customer_Name: '',
      email: '',
      phone_Number: '',
      address: '',
      password: '',
      aadharCardNumber: ''
    };
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.customerService.getCustomerDetails().subscribe(
      response => {
        console.log(response);
        this.customer = response;

        if (this.customer) {
          this.customerName = this.customer.customer_Name;
        }
      },
      error => {
        console.error('Error loading customer details.', error);
      }
    );
  }
}
