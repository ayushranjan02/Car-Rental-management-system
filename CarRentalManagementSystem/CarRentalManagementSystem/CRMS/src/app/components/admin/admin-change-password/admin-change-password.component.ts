import { Component } from '@angular/core';
import { AdminService } from '../admin-register/admin.service';
import { ChangePassword } from 'src/app/models/change-password.model';

@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.css']
})

export class AdminChangePasswordComponent {
  passwordData: ChangePassword = new ChangePassword();
  successMessage: string = '';
  errorMessage: string = '';
  passwordVisible = {
    old: false,
    new: false,
    confirm: false
  };

  constructor(private adminService: AdminService) {}

  togglePasswordVisibility(field: 'old' | 'new' | 'confirm') {
    this.passwordVisible[field] = !this.passwordVisible[field];
  }

  onSubmit() {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      this.errorMessage = 'New password and confirm password do not match.';
      this.successMessage = '';
      return;
    }

    this.adminService.changePassword(this.passwordData).subscribe({
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
