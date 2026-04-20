import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealDetail } from './meal-detail';

describe('MealDetail', () => {
  let component: MealDetail;
  let fixture: ComponentFixture<MealDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(MealDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
