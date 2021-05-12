import {BusinessLogicRequirements} from '../presentation/business-logic.requirements';
import {NgModule} from '@angular/core';
import {DataRequirementsInjectionToken} from './data.requirements';
import {DataFacade} from '../data/data.facade';
import { LoginUseCase } from './use-cases/login.use-case';
import { RegisterUseCase } from './use-cases/register.use-case';

@NgModule({
    imports: [DataFacade],

    providers: [
        {
            provide: DataRequirementsInjectionToken,
            useClass: DataFacade
        }
    ]
})
export class BusinessLogicFacade implements BusinessLogicRequirements {
    constructor(
      private loginUseCase : LoginUseCase,
      private registerUseCase : RegisterUseCase
    ) {}

    register(data){
      return this.registerUseCase.run(data);
    }

    login(data){
      return this.loginUseCase.run(data);
    }
}
