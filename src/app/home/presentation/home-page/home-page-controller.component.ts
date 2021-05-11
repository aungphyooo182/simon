import {Inject, Component} from '@angular/core';
import {BusinessLogicRequirements, BusinessRequirementsInjectionToken} from '../business-logic.requirements';
import {HomePageStore} from './home-page.store'

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page-controller.component.html',
    styleUrls: ['./home-page-controller.component.css']
})
export class HomePageControllerComponent {
    constructor(
        @Inject(BusinessRequirementsInjectionToken) private business: BusinessLogicRequirements,
        private store: HomePageStore
    ) {}
}
