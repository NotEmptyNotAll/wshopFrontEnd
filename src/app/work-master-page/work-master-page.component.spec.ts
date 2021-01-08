import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkMasterPageComponent } from './work-master-page.component';

describe('WorkMasterPageComponent', () => {
  let component: WorkMasterPageComponent;
  let fixture: ComponentFixture<WorkMasterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkMasterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
