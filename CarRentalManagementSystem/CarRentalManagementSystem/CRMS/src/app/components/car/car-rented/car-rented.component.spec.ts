import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRentedComponent } from './car-rented.component';

describe('CarRentedComponent', () => {
  let component: CarRentedComponent;
  let fixture: ComponentFixture<CarRentedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarRentedComponent]
    });
    fixture = TestBed.createComponent(CarRentedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
