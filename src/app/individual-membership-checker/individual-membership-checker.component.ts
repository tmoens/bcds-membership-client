import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MembershipService} from '../membership/membershipService';
import {debounceTime} from 'rxjs/operators';
import {MemberAndPdgaPlayerData} from '../dtos/MemberByPdgaNumber';
import {MembershipState} from '../dtos/membership-state';
import {BdcsMemberMini} from '../dtos/membership-status-report';

@Component({
  selector: 'app-individual-membership-checker',
  templateUrl: './individual-membership-checker.component.html',
  styleUrls: ['./individual-membership-checker.component.scss']
})

export class IndividualMembershipCheckerComponent implements OnInit {
  JSON = JSON;
  pdgaMembershipView: string | null = null;
  bcdsMembershipView: string | null = null;
  membersByName: BdcsMemberMini[] | null = null;
  isLoadingPdgaPlayer = false;
  isLoadingMembers = false;
  constructor(
    private service: MembershipService
  ) { }
  nameFC = new FormControl('', Validators.pattern('^[A-Za-z \-]{3,}'));
  pdgaNumberFC = new FormControl('', Validators.pattern('[0-9]+'));

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
    this.pdgaMembershipView = null;
    this.bcdsMembershipView = null;
    if (!this.pdgaNumberFC.value) { return }
    this.service.getMembershipByPdgaNumber(this.pdgaNumberFC.value)
      .subscribe((data) => {
        this.isLoadingPdgaPlayer = false;
        const p = data as MemberAndPdgaPlayerData;
        if (p.pdgaPlayer) {
          this.pdgaMembershipView = `${p.pdgaPlayer.first_name} ${p.pdgaPlayer.last_name}, ${p.pdgaPlayer.membership_status}`
        } else {
          this.pdgaMembershipView = 'Player not found';
        }
        if (p.membership && p.membership.name && p.membership.state) {
          this.bcdsMembershipView = `${p.membership.name}, ${p.membership.state}`;
        } else {
          this.bcdsMembershipView = 'Player not found';
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
