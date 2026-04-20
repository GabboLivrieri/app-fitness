import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMeal } from './create-meal';

describe('CreateMeal', () => {
  let component: CreateMeal;
  let fixture: ComponentFixture<CreateMeal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMeal],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateMeal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
