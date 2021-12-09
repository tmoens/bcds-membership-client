import {MembershipDto} from './membership';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {PdgaTournamentData} from '../dtos/pdga-tournament-data';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  constructor(
    private http: HttpClient,
    private message: MatSnackBar
  ) {  }


  getMembershipByPdgaNumber(pdgaNumber: string) {
    return this.http.get(environment.serverPrefix + '/get-membership-by-pdga-number',
      {
        observe: 'body',
        responseType: 'json',
        params: {
          pdgaNumber: pdgaNumber,
        }
      })
      .pipe(
        catchError(this.handleError('Fetching membership by pdga number', []))
      )
  }

  getMembershipsByName(name: string) {
    return this.http.get(environment.serverPrefix + '/get-memberships-by-name',
      {
        observe: 'body',
        responseType: 'json',
        params: {
          name: name,
        }
      })
      .pipe(
        catchError(this.handleError('Fetching memberships by name', []))
      )
  }

  checkTournament(tournamentId: string) {
    return this.http.get(environment.serverPrefix + '/check-tournament',
      {
        observe: 'body',
        responseType: 'json',
        params: {
          tournamentId: tournamentId,
        }
      })
      .pipe(
        catchError(this.handleError('Fetching memberships', []))
      )
  }

  getTournamentData (tournamentId: string): Observable<PdgaTournamentData | null> {
    return this.http.get(environment.serverPrefix + '/get-tournament-data',
      {
        observe: 'body',
        responseType: 'json',
        params: {
          tournamentId: tournamentId,
        }
      })
      .pipe(
        catchError(this.handleError('Getting tournament data', null))
      )
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T | null> => {
        this.message.open(
          'Error: ' + operation + '. ' + error.error.message || error.status,
          '',
          {duration: 5000});

      // Let the app keep running by returning what we were told to.
      return of(result as T);
    };
  }

}
