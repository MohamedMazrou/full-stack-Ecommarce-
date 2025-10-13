import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashUploadProductComponent } from './dash-upload-product.component';

describe('DashUploadProductComponent', () => {
  let component: DashUploadProductComponent;
  let fixture: ComponentFixture<DashUploadProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashUploadProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashUploadProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
