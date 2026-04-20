import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkout } from './edit-workout';

describe('EditWorkout', () => {
  let component: EditWorkout;
  let fixture: ComponentFixture<EditWorkout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditWorkout],
    }).compileComponents();

    fixture = TestBed.createComponent(EditWorkout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
