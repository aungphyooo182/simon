import {DataRequirements} from '../business-logic/data.requirements';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    imports: [HttpClientModule]
})
export class DataFacade implements DataRequirements {
    constructor(
    ) {}
}
