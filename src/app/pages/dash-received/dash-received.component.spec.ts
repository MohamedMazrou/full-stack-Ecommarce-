import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashReceivedComponent } from './dash-received.component';

describe('DashReceivedComponent', () => {
  let component: DashReceivedComponent;
  let fixture: ComponentFixture<DashReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashReceivedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
