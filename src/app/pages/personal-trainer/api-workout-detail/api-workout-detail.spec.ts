import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiWorkoutDetail } from './api-workout-detail';

describe('ApiWorkoutDetail', () => {
  let component: ApiWorkoutDetail;
  let fixture: ComponentFixture<ApiWorkoutDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiWorkoutDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiWorkoutDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
