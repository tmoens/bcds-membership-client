import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TournamentMembershipCheckerComponent} from './tournament-membership-checker/tournament-membership-checker.component';
import {IndividualMembershipCheckerComponent} from './individual-membership-checker/individual-membership-checker.component';

const routes: Routes = [
  {
    path: 'tournament',
    component: TournamentMembershipCheckerComponent,
  },
  {
    path: 'individual',
    component: IndividualMembershipCheckerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
