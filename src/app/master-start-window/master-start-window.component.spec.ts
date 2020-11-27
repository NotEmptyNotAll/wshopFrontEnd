import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterStartWindowComponent } from './master-start-window.component';

describe('MasterStartWindowComponent', () => {
  let component: MasterStartWindowComponent;
  let fixture: ComponentFixture<MasterStartWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterStartWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterStartWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
