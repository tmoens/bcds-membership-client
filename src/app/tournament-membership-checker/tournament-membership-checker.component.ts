import { Component, OnInit } from '@angular/core';
import {MembershipService} from '../membership/membershipService';
import {FormControl, Validators} from '@angular/forms';
import {MembershipStatusReport} from '../membershi-status-report';
import {PdgaTournamentData} from '../dtos/pdga-tournament-data';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-tournament-membership-checker',
  templateUrl: './tournament-membership-checker.component.html',
  styleUrls: ['./tournament-membership-checker.component.scss']
})
export class TournamentMembershipCheckerComponent implements OnInit {
  currentTournament: PdgaTournamentData | null = null;
  membershipStatus: MembershipStatusReport = new MembershipStatusReport();
  constructor(
    private service: MembershipService
  ) { }

  ngOnInit(): void {
    this.tournamentIdFC.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => this.tournamentIdChanged(data));
  }

  tournamentIdFC = new FormControl('',Validators.pattern('\d{4,}'));

  check() {
    this.service.checkTournament(this.tournamentIdFC.value)
    .subscribe(data => {
      this.membershipStatus = data as MembershipStatusReport;
    });
  }

  tournamentIdChanged(tournamentId: string) {
    if (Number(tournamentId) < 1000) return; // ignore really old tournaments
    this.service.getTournamentData(this.tournamentIdFC.value)
      .subscribe((data) => {
      this.currentTournament = data;
      }
    );
  }


}
