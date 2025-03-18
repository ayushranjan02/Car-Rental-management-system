import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRentRejectComponent } from './car-rent-reject.component';

describe('CarRentRejectComponent', () => {
  let component: CarRentRejectComponent;
  let fixture: ComponentFixture<CarRentRejectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarRentRejectComponent]
    });
    fixture = TestBed.createComponent(CarRentRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
