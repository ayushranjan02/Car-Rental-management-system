import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRentListComponent } from './car-rent-list.component';

describe('CarRentListComponent', () => {
  let component: CarRentListComponent;
  let fixture: ComponentFixture<CarRentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarRentListComponent]
    });
    fixture = TestBed.createComponent(CarRentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
