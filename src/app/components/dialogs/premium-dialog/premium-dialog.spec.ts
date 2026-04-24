import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumDialog } from './premium-dialog';

describe('PremiumDialog', () => {
  let component: PremiumDialog;
  let fixture: ComponentFixture<PremiumDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(PremiumDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
