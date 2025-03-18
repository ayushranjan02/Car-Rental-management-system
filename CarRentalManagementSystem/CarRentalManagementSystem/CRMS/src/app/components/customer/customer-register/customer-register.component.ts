import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from './customer.service';
import { CustomerRegisterDto } from 'src/app/models/customer-register-dto.models';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent {
  customer: CustomerRegisterDto = {
    Customer_Name: '',
    Email: '',
    Phone_Number: '',
    Address: '',
    Password: '',
    AadharCardNumber: ''
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;
  emailError: string | null = null;
  passwordVisible: boolean = false;
  customerExistsError: string | null = null;

  constructor(private customerService: CustomerService, private router: Router) {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    this.successMessage = null;
    this.errorMessage = null;
    this.emailError = null;
    this.customerExistsError = null;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.customer.Email)) {
      this.emailError = "Please enter a valid email address.";
      return; 
    }

    console.log('Submitting customer data:', this.customer);

    this.customerService.registerCustomer(this.customer).subscribe({
      next: (response) => {
        console.log('Customer Registered Successfully', response);
        this.successMessage = 'Registration successful! Redirecting to login page...';
        this.customer = { Customer_Name: '', Email: '', Phone_Number: '', Address: '', Password: '', AadharCardNumber: '' }; 

        
        this.customerService.notifyCustomerListUpdated();

        setTimeout(() => {
          this.router.navigate(['/Login']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error Registering Customer', error);
        console.log('Error Details:', error.error); 

        if (error.status === 409) {
          this.customerExistsError = "Customer with this email already exists.";
          this.errorMessage = null; 
          this.successMessage = "Customer already exists! Redirecting to login page..."
          setTimeout(() => {
            this.router.navigate(['/Login']); 
          }, 2000);
        } else if (error.status === 400) {
          this.errorMessage = error.error.message ? error.error.message : "Bad Request. Please check your input data.";
          this.customerExistsError = null; 
        } else {
          this.errorMessage = 'An error occurred during registration. Please try again.';
          this.customerExistsError = null; 
        }
        this.successMessage = null;
      }
    });
  }
}
