import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment-make',
  templateUrl: './payment-make.component.html',
  styleUrls: ['./payment-make.component.css']
})
export class PaymentMakeComponent implements OnInit {
  paymentData = {
    rentCarId: 0,
    customerId: 0,
    amount: 0,
    paymentMethod: '',
    upiId: '',
    cardNumber: '',
    cardName: '',
    expiryMonth: null,
    expiryYear: null,
    cvv: null
  };
  successMessage: string = '';
  additionalMessage: string = '';
  responseMessage: string = '';
  errorMessage: string = '';

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
   
  }

  onMakePayment() {
    this.successMessage = '';
    this.additionalMessage = '';
    this.responseMessage = '';
    this.errorMessage = '';

    console.log('Submitting payment data:', this.paymentData);
    this.paymentService.makePayment(this.paymentData).subscribe(
      (response: any) => {
        console.log('Received response:', response);
        if (response.status === 'Success') { 
          this.successMessage = 'Payment Done Successfully and You will receive the bill to your mail.';
          this.additionalMessage = 'Safe Journey and Hope You make unforgettable memories with our cars! We look forward to serving you again in the near future!';
          this.responseMessage = `Rent Car ID: ${response.rentCar.rentCarId}\nRent From Date: ${response.rentCar.rentFromDate}\nRent To Date: ${response.rentCar.rentToDate}\nAmount: ${response.rentCar.amount}\nApproved By: ${response.rentCar.approvedBy}\nRent Status: ${response.rentCar.rentStatus}\nCar ID: ${response.rentCar.carId}`;
        } else {
          this.errorMessage = 'Payment failed. Please try again.';
        }
      },
      (error: any) => {
        console.error('Error response:', error);
        this.errorMessage = 'An error occurred while making the payment. Please try again.';
      }
    );
  }
}
