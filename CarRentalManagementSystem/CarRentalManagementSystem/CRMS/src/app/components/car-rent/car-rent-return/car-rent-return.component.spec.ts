import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRentReturnComponent } from './car-rent-return.component';

describe('CarRentReturnComponent', () => {
  let component: CarRentReturnComponent;
  let fixture: ComponentFixture<CarRentReturnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarRentReturnComponent]
    });
    fixture = TestBed.createComponent(CarRentReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
