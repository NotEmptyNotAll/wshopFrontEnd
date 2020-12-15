import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPeriodFilterComponent } from './work-period-filter.component';

describe('WorkPeriodFilterComponent', () => {
  let component: WorkPeriodFilterComponent;
  let fixture: ComponentFixture<WorkPeriodFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkPeriodFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPeriodFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
