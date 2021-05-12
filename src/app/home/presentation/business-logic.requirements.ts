import {InjectionToken} from '@angular/core';
import { Observable } from 'rxjs';

export interface BusinessLogicRequirements {
  register(data): Observable<any>;
  login(data): Observable<any>;
}

export const BusinessRequirementsInjectionToken = new InjectionToken<BusinessLogicRequirements>('home Business Requirements')
