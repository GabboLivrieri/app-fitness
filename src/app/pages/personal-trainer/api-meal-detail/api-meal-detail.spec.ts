import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiMealDetail } from './api-meal-detail';

describe('ApiMealDetail', () => {
  let component: ApiMealDetail;
  let fixture: ComponentFixture<ApiMealDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiMealDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiMealDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
