import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm!: FormGroup;
    passwordVisible: boolean = false;
    errorMessage: string = '';
    successMessage: string = '';

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            userType: ['', [Validators.required]],
            rememberMe: [false]
        });
    }

    togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
    }

    onSubmit() {
        this.errorMessage = '';
        this.successMessage = '';
        if (this.loginForm.valid) {
            const { email, password, userType, rememberMe } = this.loginForm.value;

            this.authService.login(email, password, userType).subscribe({
                next: (response: any) => {
                    if (response && response.token) {
                        console.log(response.token);
                        localStorage.setItem('token', response.token);
                        localStorage.setItem('userType', userType);

                        if (rememberMe) {
                            localStorage.setItem('rememberMe', 'true');
                        }

                        console.log("Login Successful");
                        this.successMessage = "Login successful! Redirecting to dashboard...";

                        const storedUserType = localStorage.getItem('userType');
                        setTimeout(() => {
                            if (storedUserType === 'admin') {
                                this.router.navigate(['/AdminDashboard']);
                            } else if (storedUserType === 'customer') {
                                this.router.navigate(['/CustomerDashboard']);
                            } else {
                                console.error("User type not found in localStorage");
                                this.errorMessage = "An error occurred during login.";
                            }
                        }, 2000); 
                    } else {
                        this.errorMessage = "Invalid credentials."; 
                    }
                },
                error: (error: any) => {
                    console.error('Login failed', error);

                    if (error.status === 403) { 
                        if (error.error && error.error.message) {
                            this.errorMessage = error.error.message; 
                        } else {
                            this.errorMessage = "Unauthorized. Incorrect user type."; 
                        }
                    } else if (error.status === 401) { 
                       this.errorMessage = "Invalid credentials.";
                    } else {
                        this.errorMessage = "An error occurred. Please try again.";
                    }
                }
            });
        } else {
            this.errorMessage = "Please fill out the form correctly.";
        }
    }
}
