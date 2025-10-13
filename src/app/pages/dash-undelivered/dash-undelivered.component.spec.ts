import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashUndeliveredComponent } from './dash-undelivered.component';

describe('DashUndeliveredComponent', () => {
  let component: DashUndeliveredComponent;
  let fixture: ComponentFixture<DashUndeliveredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashUndeliveredComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashUndeliveredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
