import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/main-page/nav-bar/nav-bar.component';
import { AboutComponent } from './components/main-page/about/about.component';
import { FaqComponent } from './components/main-page/faq/faq.component';
import { HomePageComponent } from './components/main-page/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { AdminRegisterComponent } from './components/admin/admin-register/admin-register.component';
import { CustomerRegisterComponent } from './components/customer/customer-register/customer-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminListComponent } from './components/admin/admin-list/admin-list.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { CarListComponent } from './components/car/car-list/car-list.component';
import { CarRentedComponent } from './components/car/car-rented/car-rented.component';
import { CarAvailableComponent } from './components/car/car-available/car-available.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { CarDeleteComponent } from './components/car/car-delete/car-delete.component';
import { CarRentListComponent } from './components/car-rent/car-rent-list/car-rent-list.component';
import { CarRentPendingComponent } from './components/car-rent/car-rent-pending/car-rent-pending.component';
import { CarRentAcceptComponent } from './components/car-rent/car-rent-accept/car-rent-accept.component';
import { CarRentRejectComponent } from './components/car-rent/car-rent-reject/car-rent-reject.component';
import { CarRentCancelComponent } from './components/car-rent/car-rent-cancel/car-rent-cancel.component';
import { CarRentReturnComponent } from './components/car-rent/car-rent-return/car-rent-return.component';
import { CarRentDetailsComponent } from './components/car-rent/car-rent-details/car-rent-details.component';
import { CustomerDashboardComponent } from './components/customer/customer-dashboard/customer-dashboard.component';
import { PaymentListComponent } from './components/payment/payment-list/payment-list.component';
import { PaymentMakeComponent } from './components/payment/payment-make/payment-make.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { CustomerChangePasswordComponent } from './components/customer/customer-change-password/customer-change-password.component';
import { AdminChangePasswordComponent } from './components/admin/admin-change-password/admin-change-password.component';
import { AdminDashboardMetricsComponent } from './components/admin/admin-dashboard-metrics/admin-dashboard-metrics.component';
import { ProfileComponent } from './components/customer/customer-dashboard/profile/profile.component';
import { CarRentCustomerComponent } from './components/car-rent/car-rent-customer/car-rent-customer.component';
import { PendingRentStatusComponent } from './components/car-rent/pending-rent-status/pending-rent-status.component';
import { RentCarComponent } from './components/car-rent/rent-car/rent-car.component';
import { SearchResultsComponent } from './components/main-page/search-results/search-results.component'; 


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AboutComponent,
    FaqComponent,
    HomePageComponent,
    LoginComponent,
    AdminRegisterComponent,
    CustomerRegisterComponent,
    AdminDashboardComponent,
    AdminListComponent,
    CarAddComponent,
    CarListComponent,
    CarRentedComponent,
    CarAvailableComponent,
    CarUpdateComponent,
    CarDeleteComponent,
    CarRentListComponent,
    CarRentPendingComponent,
    CarRentAcceptComponent,
    CarRentRejectComponent,
    CarRentCancelComponent,
    CarRentReturnComponent,
    CarRentDetailsComponent,
    CustomerDashboardComponent,
    PaymentListComponent,
    PaymentMakeComponent,
    CustomerListComponent,
    CustomerChangePasswordComponent,
    AdminChangePasswordComponent,
    AdminDashboardMetricsComponent,
    ProfileComponent,
    CarRentCustomerComponent,
    PendingRentStatusComponent,
    RentCarComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
