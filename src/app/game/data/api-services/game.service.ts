import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}
  private baseUrl = environment.apiurl;

  saveGame(id, body) {
    let url = this.baseUrl + '/api/simon/user/' + id;
    return this.http.post(url, body).pipe(
      map((res: Response) => {
        let result = res;
        // console.log(res);
        return result;
      })
    );
  }

  getCurrentLevel(id) {
    let url = this.baseUrl + '/api/simon/level/' + id;
    return this.http.get(url).pipe(
      map((res: Response) => {
        let result = res;
        // console.log(res);
        return result;
      })
    );
  }
}
