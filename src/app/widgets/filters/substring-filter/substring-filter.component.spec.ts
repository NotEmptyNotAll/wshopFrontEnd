import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstringFilterComponent } from './substring-filter.component';

describe('SubstringFilterComponent', () => {
  let component: SubstringFilterComponent;
  let fixture: ComponentFixture<SubstringFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubstringFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubstringFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
