import {DataRequirements} from '../business-logic/data.requirements';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { UserService } from './api-services/user.service';

@NgModule({
    imports: [HttpClientModule]
})
export class DataFacade implements DataRequirements {
    constructor(
      private userApi : UserService
    ) {}

    register(data){
      return this.userApi.register(data);
    }

    login(data){
      return this.userApi.login(data);
    }
}
