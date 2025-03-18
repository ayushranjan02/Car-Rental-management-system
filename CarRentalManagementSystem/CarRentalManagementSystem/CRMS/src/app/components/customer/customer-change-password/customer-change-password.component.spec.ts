import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerChangePasswordComponent } from './customer-change-password.component';

describe('CustomerChangePasswordComponent', () => {
  let component: CustomerChangePasswordComponent;
  let fixture: ComponentFixture<CustomerChangePasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerChangePasswordComponent]
    });
    fixture = TestBed.createComponent(CustomerChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
