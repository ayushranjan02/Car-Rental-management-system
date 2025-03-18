import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/main-page/about/about.component';
import { HomePageComponent } from './components/main-page/home-page/home-page.component';
import { FaqComponent } from './components/main-page/faq/faq.component';
import { AdminRegisterComponent } from './components/admin/admin-register/admin-register.component';
import { AdminListComponent } from './components/admin/admin-list/admin-list.component';
import { AdminChangePasswordComponent } from './components/admin/admin-change-password/admin-change-password.component';
import { CustomerRegisterComponent } from './components/customer/customer-register/customer-register.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { CustomerChangePasswordComponent } from './components/customer/customer-change-password/customer-change-password.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { CarListComponent } from './components/car/car-list/car-list.component';
import { CarRentedComponent } from './components/car/car-rented/car-rented.component';
import { CarAvailableComponent } from './components/car/car-available/car-available.component';
import { CarRentListComponent } from './components/car-rent/car-rent-list/car-rent-list.component';
import { CarRentPendingComponent } from './components/car-rent/car-rent-pending/car-rent-pending.component';
import { CarRentAcceptComponent } from './components/car-rent/car-rent-accept/car-rent-accept.component';
import { CarRentRejectComponent } from './components/car-rent/car-rent-reject/car-rent-reject.component';
import { PaymentListComponent } from './components/payment/payment-list/payment-list.component';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './components/customer/customer-dashboard/customer-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/customer/customer-dashboard/profile/profile.component';
import { CarRentCustomerComponent } from './components/car-rent/car-rent-customer/car-rent-customer.component';
import { PaymentMakeComponent } from './components/payment/payment-make/payment-make.component';
import { SearchResultsComponent } from './components/main-page/search-results/search-results.component';
import { CarRentReturnComponent } from './components/car-rent/car-rent-return/car-rent-return.component';
import { CarRentCancelComponent } from './components/car-rent/car-rent-cancel/car-rent-cancel.component';
import { PendingRentStatusComponent } from './components/car-rent/pending-rent-status/pending-rent-status.component';
import { CarRentDetailsComponent } from './components/car-rent/car-rent-details/car-rent-details.component';
import { AdminDashboardMetricsComponent } from './components/admin/admin-dashboard-metrics/admin-dashboard-metrics.component';

const routes: Routes = [
  { path: '', redirectTo: '/HomePage', pathMatch: 'full' },
  { path: 'About', component: AboutComponent },
  { path: 'HomePage', component: HomePageComponent },
  { path: 'FAQ', component: FaqComponent },
  { path: 'AdminRegister', component: AdminRegisterComponent },
  { path: 'AdminList', component: AdminListComponent },
  { path: 'AdminChangePassword', component: AdminChangePasswordComponent },
  { path: 'CustomerRegister', component: CustomerRegisterComponent },
  { path: 'CustomerList', component: CustomerListComponent },
  { path: 'CustomerChangePassword', component: CustomerChangePasswordComponent },
  { path: 'CarAdd', component: CarAddComponent },
  { path: 'CarList', component: CarListComponent },
  { path: 'CarRented', component: CarRentedComponent },
  { path: 'CarAvailable', component: CarAvailableComponent },
  { path: 'CarRentList', component: CarRentListComponent },
  { path: 'CarRentPending', component: CarRentPendingComponent },
  { path: 'CarRentAccept', component: CarRentAcceptComponent },
  { path: 'CarRentReject', component: CarRentRejectComponent },
  { path: 'PaymentList', component: PaymentListComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'AdminDashboard', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { expectedRole: 'Admin' } },
  { path: 'CustomerDashboard', component: CustomerDashboardComponent, canActivate: [AuthGuard], data: { expectedRole: 'Customer' } },
  {path: 'Profile', component: ProfileComponent},
  {path: 'CarRentCustomer', component: CarRentCustomerComponent},
  {path:'MakePayment', component: PaymentMakeComponent },
  {path: 'SearchResult', component: SearchResultsComponent},
  {path: 'CarRentReturn', component: CarRentReturnComponent},
  {path: 'CarRentCancel', component: CarRentCancelComponent},
  {path:'PendingRentStatus', component: PendingRentStatusComponent},
  {path:'CarRentDetails', component: CarRentDetailsComponent},
  {path:'AdminDashBoardMetrics', component: AdminDashboardMetricsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
