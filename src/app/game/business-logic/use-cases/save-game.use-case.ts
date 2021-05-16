import { Inject, Injectable } from '@angular/core';
import {
  DataRequirements,
  DataRequirementsInjectionToken,
} from '../data.requirements';

@Injectable({
  providedIn: 'root',
})
export class SaveGameUseCase {
  constructor(
    @Inject(DataRequirementsInjectionToken) private data: DataRequirements
  ) {}

  run(id, body) {
    return this.data.saveGame(id, body);
  }
}
