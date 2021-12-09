import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualMembershipCheckerComponent } from './individual-membership-checker.component';

describe('IndividualMembershipCheckerComponent', () => {
  let component: IndividualMembershipCheckerComponent;
  let fixture: ComponentFixture<IndividualMembershipCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualMembershipCheckerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualMembershipCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
