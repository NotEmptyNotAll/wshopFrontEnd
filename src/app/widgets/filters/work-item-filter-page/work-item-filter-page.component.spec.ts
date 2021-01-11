import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkItemFilterPageComponent } from './work-item-filter-page.component';

describe('WorkItemFilterPageComponent', () => {
  let component: WorkItemFilterPageComponent;
  let fixture: ComponentFixture<WorkItemFilterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkItemFilterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkItemFilterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
