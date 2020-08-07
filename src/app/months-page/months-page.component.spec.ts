import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthsPageComponent } from './months-page.component';

describe('MonthsPageComponent', () => {
  let component: MonthsPageComponent;
  let fixture: ComponentFixture<MonthsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
