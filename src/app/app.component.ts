import { Component } from '@angular/core';
import {AppStateService} from './app-state.service';
import {ScreenSizes} from './helpers/screen-sizes';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ScreenSizes = ScreenSizes;
  title = 'bcds-membership-client';
  constructor(
    public appState: AppStateService,
    private breakpointObserver: BreakpointObserver,
  ) {
  }

  ngOnInit(): void {
    const small = '(max-width: 719.99px)';
    const medium = '(min-width: 720px) and (max-width: 959.99px)';
    const large = '(min-width: 960px)';

    this.breakpointObserver.observe([small, medium, large])
      .subscribe(result => {
          if (result.breakpoints[small]) {
            this.appState.screenSize = ScreenSizes.SMALL
          }
          if (result.breakpoints[medium]) {
            this.appState.screenSize = ScreenSizes.MEDIUM
          }
          if (result.breakpoints[large]) {
            this.appState.screenSize = ScreenSizes.LARGE
          }
        }
      );
  }
}
