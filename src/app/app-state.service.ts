import {Injectable} from '@angular/core';
import {ScreenSizes} from './helpers/screen-sizes';
import {BehaviorSubject} from 'rxjs';

/**
 * This maintains the global state of the application.
 */

@Injectable({
  providedIn: 'root'
})

export class AppStateService {
  // for storing arbitrary state data and arbitrary state data that persists over restarts
  state: { [name: string]: any } = {};
  persistentState: { [name: string]: any } = {};
  screenSize: ScreenSizes = ScreenSizes.LARGE;
  private _activeTool$: BehaviorSubject<string> = new BehaviorSubject<string>('none');

  setState(name: string, value: any, persist: boolean = false) {
    if (name === 'ACTIVE_TOOL') {
      this._activeTool$.next(value);
    }
    if (persist) {
      this.persistentState[name] = value;
    } else {
      this.state[name] = value;
    }
  }

  public get activeTool$() {
    return this._activeTool$;
  }

  setActiveTool(tool: string) {
    this._activeTool$.next(tool);
  }

  public get activeTool() {
    return this.activeTool$.value;
  }

  deleteState(name:string) {
    if (this.persistentState[name]) { delete this.persistentState[name]; }
    if (this.state[name]) { delete this.state[name]; }
  }

  getState(name: string): any {
    if (this.persistentState[name]) { return this.persistentState[name]; }
    if (this.state[name]) { return this.state[name]; }
    return null;
  }

  initialize() {

  }
}
