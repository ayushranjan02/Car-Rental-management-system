import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRentPendingComponent } from './car-rent-pending.component';

describe('CarRentPendingComponent', () => {
  let component: CarRentPendingComponent;
  let fixture: ComponentFixture<CarRentPendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarRentPendingComponent]
    });
    fixture = TestBed.createComponent(CarRentPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
