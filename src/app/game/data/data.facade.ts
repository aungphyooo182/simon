import { DataRequirements } from '../business-logic/data.requirements';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GameService } from './api-services/game.service';

@NgModule({
  imports: [HttpClientModule],
})
export class DataFacade implements DataRequirements {
  constructor(private gameServiceApi: GameService) {}

  saveGame(id, body) {
    return this.gameServiceApi.saveGame(id, body);
  }
  getCurrentLevel(id) {
    return this.gameServiceApi.getCurrentLevel(id);
  }
  getLeaderboard() {
    return this.gameServiceApi.getLeaderboard();
  }
  getUserDetails(id) {
    return this.gameServiceApi.getUserDetails(id);
  }
  getAllRank() {
    return this.gameServiceApi.getAllRank();
  }
}
