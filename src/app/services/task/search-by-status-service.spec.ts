import { TestBed } from '@angular/core/testing';

import { SearchByStatusService } from './search-by-status-service';

describe('SearchByStatusService', () => {
  let service: SearchByStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchByStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
