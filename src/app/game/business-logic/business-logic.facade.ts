import { BusinessLogicRequirements } from '../presentation/business-logic.requirements';
import { NgModule } from '@angular/core';
import { DataRequirementsInjectionToken } from './data.requirements';
import { DataFacade } from '../data/data.facade';
import { SaveGameUseCase } from './use-cases/save-game.use-case';
import { GetCurrentLevelUseCase } from './use-cases/get-current-level.use-case';

@NgModule({
  imports: [DataFacade],

  providers: [
    {
      provide: DataRequirementsInjectionToken,
      useClass: DataFacade,
    },
  ],
})
export class BusinessLogicFacade implements BusinessLogicRequirements {
  constructor(
    private saveGameUseCase: SaveGameUseCase,
    private getCurrentLevelUseCase: GetCurrentLevelUseCase
  ) {}

  saveGame(id, body) {
    return this.saveGameUseCase.run(id, body);
  }
  getCurrentLevel(id) {
    return this.getCurrentLevelUseCase.run(id);
  }
}
