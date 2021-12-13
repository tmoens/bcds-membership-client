import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MembershipService} from '../membership/membershipService';
import {debounceTime} from 'rxjs/operators';
import {MemberAndPdgaPlayerData} from '../dtos/MemberByPdgaNumber';
import {BdcsMemberMini} from '../dtos/membership-status-report';
import {AppStateService} from '../app-state.service';
import {PdgaPlayerData} from '../dtos/pdga-player-data';

@Component({
  selector: 'app-individual-membership-checker',
  templateUrl: './individual-membership-checker.component.html',
  styleUrls: ['./individual-membership-checker.component.scss']
})

export class IndividualMembershipCheckerComponent implements OnInit {
  pdgaPlayer: PdgaPlayerData | null = null;
  bcdsPlayer: BdcsMemberMini | null = null;
  membersByName: BdcsMemberMini[] | null = [];
  isLoadingPdgaPlayer = false;
  isLoadingMembers = false;
  nameFC = new FormControl('', Validators.pattern('^[A-Za-z \-]{3,}'));
  pdgaNumberFC = new FormControl('', Validators.pattern('[0-9]+'));

  constructor(
    public appState: AppStateService,
    private service: MembershipService,
  ) {
    this.appState.setActiveTool('individual');
  }

  ngOnInit(): void {
    this.pdgaNumberFC.valueChanges
      .pipe(debounceTime(500))
      .subscribe((data) => this.onPdgaNumberChange(data));
    this.nameFC.valueChanges
      .pipe(debounceTime(500))
      .subscribe((data) => this.onNameChange(data));
  }

  onPdgaNumberChange(value: any) {
    this.isLoadingPdgaPlayer = true;
    this.pdgaPlayer = null;
    this.bcdsPlayer = null;
    if (!this.pdgaNumberFC.value) { return }
    this.service.getMembershipByPdgaNumber(this.pdgaNumberFC.value)
      .subscribe((data) => {
        this.isLoadingPdgaPlayer = false;
        const p = data as MemberAndPdgaPlayerData;
        if (p.pdgaPlayer) {
          this.pdgaPlayer = p.pdgaPlayer;
        } else {
          this.pdgaPlayer = null;
        }
        if (p.membership) {
          this.bcdsPlayer = p.membership;
        } else {
          this.bcdsPlayer = null;
        }
      });
  }

  onNameChange(value: any) {
    // wait for at least 4 characters.
    console.log('Name: ' + this.nameFC.value);
    if (this.nameFC.value.length < 4) {
      console.log('Name: ' + this.nameFC);
      return
    };
    this.membersByName = null;
    this.isLoadingMembers = true;
    this.service.getMembershipsByName(this.nameFC.value)
      .subscribe((data) => {
        this.isLoadingMembers = false;
        this.membersByName = data as BdcsMemberMini[];
      });
  }
}
