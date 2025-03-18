import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRentCustomerComponent } from './car-rent-customer.component';

describe('CarRentCustomerComponent', () => {
  let component: CarRentCustomerComponent;
  let fixture: ComponentFixture<CarRentCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarRentCustomerComponent]
    });
    fixture = TestBed.createComponent(CarRentCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
