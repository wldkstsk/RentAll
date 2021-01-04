import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OwnerProductsComponent } from './owner-products.component';

describe('OwnerProductsComponent', () => {
  let component: OwnerProductsComponent;
  let fixture: ComponentFixture<OwnerProductsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
