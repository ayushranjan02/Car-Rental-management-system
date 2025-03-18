import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardMetricsComponent } from './admin-dashboard-metrics.component';

describe('AdminDashboardMetricsComponent', () => {
  let component: AdminDashboardMetricsComponent;
  let fixture: ComponentFixture<AdminDashboardMetricsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDashboardMetricsComponent]
    });
    fixture = TestBed.createComponent(AdminDashboardMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
