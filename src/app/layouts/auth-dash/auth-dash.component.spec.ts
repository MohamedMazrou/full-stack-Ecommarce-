import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDashComponent } from './auth-dash.component';

describe('AuthDashComponent', () => {
  let component: AuthDashComponent;
  let fixture: ComponentFixture<AuthDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
