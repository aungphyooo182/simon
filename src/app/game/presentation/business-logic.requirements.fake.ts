import { Observable, of } from 'rxjs';
import { BusinessLogicRequirements } from './business-logic.requirements';

export class BusinessLogicRequirementsFake
  implements BusinessLogicRequirements
{
  saveGame(id, body): Observable<any> {
    return of(true);
  }
  getCurrentLevel(id): Observable<any> {
    return of(true);
  }
}
