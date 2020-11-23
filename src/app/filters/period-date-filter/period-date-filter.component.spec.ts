import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodDateFilterComponent } from './period-date-filter.component';

describe('PeriodDateFilterComponent', () => {
  let component: PeriodDateFilterComponent;
  let fixture: ComponentFixture<PeriodDateFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodDateFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodDateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
