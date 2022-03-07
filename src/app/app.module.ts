import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TournamentMembershipCheckerComponent } from './tournament-membership-checker/tournament-membership-checker.component';
import { IndividualMembershipCheckerComponent } from './individual-membership-checker/individual-membership-checker.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {FlexModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {AppStateService} from './app-state.service';
import {MatMenuModule} from '@angular/material/menu';
import { DiscGolfSceneMembershipCheckerComponent } from './disc-golf-scene-membership-checker/disc-golf-scene-membership-checker.component';

export function appStateProviderFactory(provider: AppStateService) {
  return () => provider.initialize();
}

@NgModule({
  declarations: [
    AppComponent,
    TournamentMembershipCheckerComponent,
    IndividualMembershipCheckerComponent,
    DiscGolfSceneMembershipCheckerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatListModule,
    FlexModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSnackBarModule,
    MatTabsModule,
    MatProgressBarModule,
    MatMenuModule,
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: appStateProviderFactory, deps: [AppStateService], multi: true},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
