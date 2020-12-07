import { TestBed } from '@angular/core/testing';

import { ServStateFilterService } from './serv-state-filter.service';

describe('ServStateFilterService', () => {
  let service: ServStateFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServStateFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
