import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRentCancelComponent } from './car-rent-cancel.component';

describe('CarRentCancelComponent', () => {
  let component: CarRentCancelComponent;
  let fixture: ComponentFixture<CarRentCancelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarRentCancelComponent]
    });
    fixture = TestBed.createComponent(CarRentCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
