import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkStatusFilterComponent } from './work-status-filter.component';

describe('WorkStatusFilterComponent', () => {
  let component: WorkStatusFilterComponent;
  let fixture: ComponentFixture<WorkStatusFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkStatusFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkStatusFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
