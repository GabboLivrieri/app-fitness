import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalTrainer } from './personal-trainer';

describe('PersonalTrainer', () => {
  let component: PersonalTrainer;
  let fixture: ComponentFixture<PersonalTrainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalTrainer],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalTrainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
