import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAvailableComponent } from './car-available.component';

describe('CarAvailableComponent', () => {
  let component: CarAvailableComponent;
  let fixture: ComponentFixture<CarAvailableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarAvailableComponent]
    });
    fixture = TestBed.createComponent(CarAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
