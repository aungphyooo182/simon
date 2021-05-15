import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.apiurl;

  register(data) {
    let url = this.baseUrl + '/api/user/register';
    return this.http.post(url, data).pipe(
      map((res: Response) => {
        let result = res[0];
        // console.log(res);
        return result;
      })
    );
  }

  login(data) {
    let url = this.baseUrl + '/api/user/login';
    return this.http.post(url, data).pipe(
      map((res: Response) => {
        let result = res[0];
        // console.log(res);
        return result;
      })
    );
  }
}
