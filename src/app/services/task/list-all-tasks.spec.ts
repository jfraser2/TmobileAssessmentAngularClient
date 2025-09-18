import { TestBed } from '@angular/core/testing';

import { ListAllTasks } from './list-all-tasks';

describe('ListAllTasks', () => {
  let service: ListAllTasks;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListAllTasks);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
