import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../admin-register/admin.service';
import { AdminRegisterDto } from 'src/app/models/admin-register-dto.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit, OnDestroy {
  admins: AdminRegisterDto[] = [];
  private adminListSubscription: Subscription = new Subscription();

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadAdmins();
    this.adminListSubscription = this.adminService.getAdminListUpdatedListener().subscribe(() => {
      this.loadAdmins();
    });
  }

  ngOnDestroy(): void {
    this.adminListSubscription.unsubscribe();
  }

  loadAdmins(): void {
    this.adminService.getAdmins().subscribe({
      next: (response: any) => {
        console.log('Fetched admins:', response); // Debugging log
        if (response && response.$values) {
          this.admins = response.$values.map((admin: any) => ({
            adminId: admin.adminId,
            Email: admin.email,
            Name: admin.name,
            Phone_Number: admin.phone_Number,
            Password: admin.password
          }));
        } else {
          this.admins = []; // Handle the case where response is not as expected
        }
      },
      error: (error: any) => {
        console.error('Error fetching admins', error);
      }
    });
  }

  deleteAdmin(adminId: number | undefined) {
    if (adminId !== undefined) {
      this.adminService.deleteAdmin(adminId).subscribe({
        next: () => {
          this.admins = this.admins.filter(admin => admin.adminId !== adminId);
          this.updateAdminNumbers();
        },
        error: (error: any) => {
          console.error('Error deleting admin', error);
        }
      });
    } else {
      console.error('Admin ID is undefined');
    }
  }

  updateAdminNumbers(): void {
    // This method ensures the admin list is correctly updated after deletion
    this.admins = this.admins.map((admin, index) => ({
      ...admin,
      boxNumber: index + 1
    }));
  }
}
