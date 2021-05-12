import {DataRequirements} from './data.requirements';

export class DataRequirementsFake implements DataRequirements {
  register(data): Observable<any>{
    return of (true);
  }
  login(data): Observable<any>{
    return of (true);
  }
}
