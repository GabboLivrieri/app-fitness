import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPage } from './meal-page';

describe('MealPage', () => {
  let component: MealPage;
  let fixture: ComponentFixture<MealPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MealPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
