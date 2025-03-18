import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { Payment } from 'src/app/models/payment.model';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  payments: Payment[] = [];

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.paymentService.listPayments().subscribe({
      next: (data: Payment[]) => {
        this.payments = data;
      },
      error: (error: any) => {
        console.error('Error fetching payments', error);
      }
    });
  }
}
