import {Inject, Injectable} from '@angular/core';
import {DataRequirements, DataRequirementsInjectionToken} from '../data.requirements';

@Injectable({
    providedIn: 'root'
})
export class RegisterUseCase {
    constructor(
        @Inject(DataRequirementsInjectionToken) private data: DataRequirements
    ) {}

    run(data) {
      return this.data.register(data);
    }
}
