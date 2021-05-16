import { Observable, of } from 'rxjs';
import { DataRequirements } from './data.requirements';

export class DataRequirementsFake implements DataRequirements {
  saveGame(id, body): Observable<any> {
    return of(true);
  }
  getCurrentLevel(id): Observable<any> {
    return of(true);
  }
  getLeaderboard(): Observable<any> {
    return of(true);
  }
  getAllRank(): Observable<any> {
    return of(true);
  }
  getUserDetails(id): Observable<any> {
    return of(true);
  }
}
