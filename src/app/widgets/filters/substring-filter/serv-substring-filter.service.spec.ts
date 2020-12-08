import { TestBed } from '@angular/core/testing';

import { ServSubstringFilterService } from './serv-substring-filter.service';

describe('ServSubstringFilterService', () => {
  let service: ServSubstringFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServSubstringFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
