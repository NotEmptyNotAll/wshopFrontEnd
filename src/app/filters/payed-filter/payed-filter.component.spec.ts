import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayedFilterComponent } from './payed-filter.component';

describe('PayedFilterComponent', () => {
  let component: PayedFilterComponent;
  let fixture: ComponentFixture<PayedFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayedFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayedFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
