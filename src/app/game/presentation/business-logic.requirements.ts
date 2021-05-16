import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface BusinessLogicRequirements {
  saveGame(id, body): Observable<any>;
  getCurrentLevel(id): Observable<any>;
  getLeaderboard(): Observable<any>;
  getAllRank(): Observable<any>;
  getUserDetails(id): Observable<any>;
}

export const BusinessRequirementsInjectionToken =
  new InjectionToken<BusinessLogicRequirements>('game Business Requirements');
