import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface BusinessLogicRequirements {
  saveGame(id, body): Observable<any>;
  getCurrentLevel(id): Observable<any>;
}

export const BusinessRequirementsInjectionToken =
  new InjectionToken<BusinessLogicRequirements>('game Business Requirements');
