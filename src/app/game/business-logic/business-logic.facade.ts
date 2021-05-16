import { BusinessLogicRequirements } from '../presentation/business-logic.requirements';
import { NgModule } from '@angular/core';
import { DataRequirementsInjectionToken } from './data.requirements';
import { DataFacade } from '../data/data.facade';
import { SaveGameUseCase } from './use-cases/save-game.use-case';
import { GetCurrentLevelUseCase } from './use-cases/get-current-level.use-case';
import { GetLeaderboardUseCase } from './use-cases/get-leaderboard.use-case';
import { GetUserDetailsUseCase } from './use-cases/get-user-details.use-case';
import { GetAllRankUseCase } from './use-cases/get-all-rank.use-case';

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
    private getCurrentLevelUseCase: GetCurrentLevelUseCase,
    private getLeaderboardUseCase: GetLeaderboardUseCase,
    private getUserDetailsUseCase: GetUserDetailsUseCase,
    private getAllRankUseCase: GetAllRankUseCase
  ) {}

  saveGame(id, body) {
    return this.saveGameUseCase.run(id, body);
  }
  getCurrentLevel(id) {
    return this.getCurrentLevelUseCase.run(id);
  }
  getLeaderboard() {
    return this.getLeaderboardUseCase.run();
  }
  getUserDetails(id) {
    return this.getUserDetailsUseCase.run(id);
  }
  getAllRank() {
    return this.getAllRankUseCase.run();
  }
}
