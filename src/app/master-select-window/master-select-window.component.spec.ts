import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSelectWindowComponent } from './master-select-window.component';

describe('MasterSelectWindowComponent', () => {
  let component: MasterSelectWindowComponent;
  let fixture: ComponentFixture<MasterSelectWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSelectWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSelectWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
