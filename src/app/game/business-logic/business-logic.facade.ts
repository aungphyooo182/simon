import {BusinessLogicRequirements} from '../presentation/business-logic.requirements';
import {NgModule} from '@angular/core';
import {DataRequirementsInjectionToken} from './data.requirements';
import {DataFacade} from '../data/data.facade';

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
    ) {}
}
