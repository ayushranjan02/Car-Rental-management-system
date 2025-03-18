import { Component } from '@angular/core';
import { CustomerService } from '../customer-register/customer.service';
import { ChangePassword } from 'src/app/models/change-password.model';

@Component({
  selector: 'app-customer-change-password',
  templateUrl: './customer-change-password.component.html',
  styleUrls: ['./customer-change-password.component.css']
})
export class CustomerChangePasswordComponent {
  passwordData: ChangePassword = new ChangePassword();
  successMessage: string = '';
  errorMessage: string = '';
  passwordVisible = {
    old: false,
    new: false,
    confirm: false
  };

  constructor(private customerService: CustomerService) {}

  togglePasswordVisibility(field: 'old' | 'new' | 'confirm') {
    this.passwordVisible[field] = !this.passwordVisible[field];
  }

  onSubmit() {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      this.errorMessage = 'New password and confirm password do not match.';
      this.successMessage = '';
      return;
    }

    this.customerService.changePassword(this.passwordData).subscribe({
      next: () => {
        this.successMessage = 'Password changed successfully!';
        this.errorMessage = '';
      },
      error: (error) => {
        this.successMessage = '';
        this.errorMessage = 'An error occurred during password change.';
      }
    });
  }
}
