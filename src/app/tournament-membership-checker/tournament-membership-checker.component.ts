import {Component, OnInit} from '@angular/core';
import {MembershipService} from '../membership/membershipService';
import {FormControl, Validators} from '@angular/forms';
import {PdgaTournamentData} from '../dtos/pdga-tournament-data';
import {debounceTime} from 'rxjs/operators';
import {BcdsTournamentMembershipReport, BdcsMemberMini} from '../dtos/membership-status-report';
import {MembershipState} from '../dtos/membership-state';

@Component({
  selector: 'app-tournament-membership-checker',
  templateUrl: './tournament-membership-checker.component.html',
  styleUrls: ['./tournament-membership-checker.component.scss']
})
export class TournamentMembershipCheckerComponent implements OnInit {
  currentTournament: PdgaTournamentData | null = null;
  membershipReport: BcdsTournamentMembershipReport | null = null;
  isBcTournament: boolean = false;
  isLoadingTournament = false;
  isLoadingMembershipReport = false;
  constructor(
    private service: MembershipService
  ) { }

  ngOnInit(): void {
    this.tournamentIdFC.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => this.tournamentIdChanged(data));
  }

  tournamentIdFC = new FormControl('',Validators.pattern('[0-9]{4,}'));

  check() {
    this.isLoadingMembershipReport = true;
    this.service.checkTournament(this.tournamentIdFC.value)
    .subscribe(data => {
      this.isLoadingMembershipReport = false;
      this.membershipReport = data as BcdsTournamentMembershipReport;
    });
  }

  tournamentIdChanged(tournamentId: string) {
    this.isBcTournament = false;
    this.membershipReport = null;
    this.isLoadingTournament = true;
    this.service.getTournamentData(this.tournamentIdFC.value)
      .subscribe((data) => {
        this.isLoadingTournament = false;
        this.currentTournament = data;
        if (this.currentTournament) {
          this.isBcTournament = (this.currentTournament.state_prov === "BC")
        }
      }
    );
  }

  activeMemberFilter(m: BdcsMemberMini): boolean {
    return m.state === MembershipState.ACTIVE_MEMBER;
  }
  nonMemberFilter(m: BdcsMemberMini): boolean {
    return m.state !== MembershipState.ACTIVE_MEMBER;
  }
  previousMemberFilter(m: BdcsMemberMini): boolean {
    return m.state === MembershipState.PREVIOUS_MEMBER;
  }
  neverMemberFilter(m: BdcsMemberMini): boolean {
    return m.state === MembershipState.PLAYER_NOT_KNOWN;
  }
}
