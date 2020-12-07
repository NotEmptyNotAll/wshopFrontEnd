import { TestBed } from '@angular/core/testing';

import { ServPeriodFilterService } from './serv-period-filter.service';

describe('ServPeriodFilterService', () => {
  let service: ServPeriodFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServPeriodFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
