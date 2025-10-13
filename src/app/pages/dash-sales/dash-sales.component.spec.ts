import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashSalesComponent } from './dash-sales.component';

describe('DashSalesComponent', () => {
  let component: DashSalesComponent;
  let fixture: ComponentFixture<DashSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashSalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
