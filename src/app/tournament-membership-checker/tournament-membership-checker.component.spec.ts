import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentMembershipCheckerComponent } from './tournament-membership-checker.component';

describe('TournamentMembershipCheckerComponent', () => {
  let component: TournamentMembershipCheckerComponent;
  let fixture: ComponentFixture<TournamentMembershipCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentMembershipCheckerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentMembershipCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
