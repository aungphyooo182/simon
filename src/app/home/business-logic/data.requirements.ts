import {InjectionToken} from '@angular/core';
import { Observable } from 'rxjs';

export interface DataRequirements {
  register(data): Observable<any>;
  login(data): Observable<any>;
}

export const DataRequirementsInjectionToken = new InjectionToken<DataRequirements>('home Data Requirements')
