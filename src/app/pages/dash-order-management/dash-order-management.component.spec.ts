import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashOrderManagementComponent } from './dash-order-management.component';

describe('DashOrderManagementComponent', () => {
  let component: DashOrderManagementComponent;
  let fixture: ComponentFixture<DashOrderManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashOrderManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashOrderManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
