import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface DataRequirements {
  saveGame(id, body): Observable<any>;
  getCurrentLevel(id): Observable<any>;
  getLeaderboard(): Observable<any>;
}

export const DataRequirementsInjectionToken =
  new InjectionToken<DataRequirements>('game Data Requirements');
