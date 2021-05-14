import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalComponentsModule } from '../../../global-components/global-components.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { GameControllerComponent } from './game-controller.component';
import { RouterModule } from '@angular/router';
import { LeaderBoardComponent } from './components/leader-board/leader-board.component';
import { SimonButtonComponent } from './components/simon-button/simon-button.component';
const components = [LeaderBoardComponent, SimonButtonComponent];
@NgModule({
  declarations: [GameControllerComponent, components],
  exports: [GameControllerComponent, components],
  imports: [
    CommonModule,
    RouterModule,
    GlobalComponentsModule,
    SharedComponentsModule,
  ],
})
export class GameModule {}
