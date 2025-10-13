import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashDetailsUserOrderComponent } from './dash-details-user-order.component';

describe('DashDetailsUserOrderComponent', () => {
  let component: DashDetailsUserOrderComponent;
  let fixture: ComponentFixture<DashDetailsUserOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashDetailsUserOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashDetailsUserOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
