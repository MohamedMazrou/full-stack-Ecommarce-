import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInDashComponent } from './log-in-dash.component';

describe('LogInDashComponent', () => {
  let component: LogInDashComponent;
  let fixture: ComponentFixture<LogInDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogInDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogInDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
