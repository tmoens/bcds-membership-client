import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MembershipService} from '../membership/membershipService';
import {MembershipDto} from '../membership/membership';

@Component({
  selector: 'app-individual-membership-checker',
  templateUrl: './individual-membership-checker.component.html',
  styleUrls: ['./individual-membership-checker.component.scss']
})

export class IndividualMembershipCheckerComponent implements OnInit {
  memberships: MembershipDto[] = [];
  constructor(
    private service: MembershipService
  ) { }

  ngOnInit(): void {
  }

  playerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    pdgaNumber: new FormControl(''),
  });

  onSubmit() {
    this.service.getMemberships(
      this.playerForm.value.firstName,
      this.playerForm.value.lastName,
      this.playerForm.value.pdgaNumber,
    ).subscribe(data => {
      this.memberships = data as MembershipDto[];
    });
  }
}
