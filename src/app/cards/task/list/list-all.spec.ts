import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAll } from './list-all';

describe('ListAll', () => {
  let component: ListAll;
  let fixture: ComponentFixture<ListAll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAll]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAll);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
