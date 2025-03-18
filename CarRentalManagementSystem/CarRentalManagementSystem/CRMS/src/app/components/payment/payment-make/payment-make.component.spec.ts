import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMakeComponent } from './payment-make.component';

describe('PaymentMakeComponent', () => {
  let component: PaymentMakeComponent;
  let fixture: ComponentFixture<PaymentMakeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentMakeComponent]
    });
    fixture = TestBed.createComponent(PaymentMakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
