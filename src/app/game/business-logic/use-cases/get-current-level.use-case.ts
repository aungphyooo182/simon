import { Inject, Injectable } from '@angular/core';
import {
  DataRequirements,
  DataRequirementsInjectionToken,
} from '../data.requirements';

@Injectable({
  providedIn: 'root',
})
export class GetCurrentLevelUseCase {
  constructor(
    @Inject(DataRequirementsInjectionToken) private data: DataRequirements
  ) {}

  run(id) {
    return this.data.getCurrentLevel(id);
  }
}
