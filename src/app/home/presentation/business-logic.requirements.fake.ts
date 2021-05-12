import { Observable, of } from 'rxjs';
import {BusinessLogicRequirements} from './business-logic.requirements';

export class BusinessLogicRequirementsFake implements BusinessLogicRequirements {
  register(data): Observable<any>{
    return of (true);
  }
  login(data): Observable<any>{
    return of (true);
  }
}
