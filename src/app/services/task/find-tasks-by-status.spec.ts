import { TestBed } from '@angular/core/testing';

import { FindTasksByStatus } from './find-tasks-by-status';

describe('FindTasksByStatus', () => {
  let service: FindTasksByStatus;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindTasksByStatus);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
