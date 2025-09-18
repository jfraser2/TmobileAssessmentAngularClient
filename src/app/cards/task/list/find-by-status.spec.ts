import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindByStatus } from './find-by-status';

describe('FindByStatus', () => {
  let component: FindByStatus;
  let fixture: ComponentFixture<FindByStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindByStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindByStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
