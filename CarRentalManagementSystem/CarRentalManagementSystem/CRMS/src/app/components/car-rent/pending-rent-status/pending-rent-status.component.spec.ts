import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRentStatusComponent } from './pending-rent-status.component';

describe('PendingRentStatusComponent', () => {
  let component: PendingRentStatusComponent;
  let fixture: ComponentFixture<PendingRentStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingRentStatusComponent]
    });
    fixture = TestBed.createComponent(PendingRentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
