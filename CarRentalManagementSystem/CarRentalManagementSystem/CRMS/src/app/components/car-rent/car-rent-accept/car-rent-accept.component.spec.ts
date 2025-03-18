import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRentAcceptComponent } from './car-rent-accept.component';

describe('CarRentAcceptComponent', () => {
  let component: CarRentAcceptComponent;
  let fixture: ComponentFixture<CarRentAcceptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarRentAcceptComponent]
    });
    fixture = TestBed.createComponent(CarRentAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
