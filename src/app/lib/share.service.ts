import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor() {}

  public userId = '';

  setUserId(id) {
    this.userId = id;
  }

  getUserId() {
    return this.userId;
  }
}
