import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTasksByStatus } from './display-tasks-by-status';

describe('DisplayTasksByStatus', () => {
  let component: DisplayTasksByStatus;
  let fixture: ComponentFixture<DisplayTasksByStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayTasksByStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayTasksByStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
