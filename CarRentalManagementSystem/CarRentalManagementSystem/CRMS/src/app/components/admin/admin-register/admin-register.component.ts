import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';
import { AdminRegisterDto } from 'src/app/models/admin-register-dto.model';

@Component({
    selector: 'app-admin-register',
    templateUrl: './admin-register.component.html',
    styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent {
    admin: AdminRegisterDto = {
        Email: '',
        Name: '',
        Phone_Number: '',
        Password: ''
    };

    successMessage: string | null = null;
    errorMessage: string | null = null;
    emailError: string | null = null;
    passwordVisible: boolean = false;
    adminExistsError: string | null = null;

    constructor(private adminService: AdminService, private router: Router) { }

    togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
    }

    onSubmit() {
        this.successMessage = null;
        this.errorMessage = null;
        this.emailError = null;
        this.adminExistsError = null;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.admin.Email)) {
            this.emailError = "Please enter a valid email address.";
            return; // Stop submission
        }

        this.adminService.registerAdmin(this.admin).subscribe({
            next: (response) => {
                console.log('Admin Registered Successfully', response);
                this.successMessage = 'Registration successful! Redirecting to login page...';
                this.admin = { Email: '', Name: '', Phone_Number: '', Password: '' }; 

                // Notify the admin list component about the new admin
                this.adminService.notifyAdminListUpdated();

                setTimeout(() => {
                    this.router.navigate(['/Login']); 
                }, 2000);
            },
            error: (error) => {
                console.error('Error Registering Admin', error);

                if (error.status === 409) {
                    this.adminExistsError = "Admin with this email already exists.";
                    this.errorMessage = null; 
                    this.successMessage = "Admin already exists! Redirecting to login page..."
                    setTimeout(() => {
                        this.router.navigate(['/Login']); 
                    }, 2000);
                } else if (error.status === 400) {
                    this.errorMessage = "Bad Request. Please check your input data.";
                    this.adminExistsError = null; 
                } else {
                    this.errorMessage = 'An error occurred during registration. Please try again.';
                    this.adminExistsError = null; 
                }
                this.successMessage = null;
            }
        });
    }
}
