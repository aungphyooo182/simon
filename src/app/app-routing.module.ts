import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameControllerComponent } from './game/presentation/game/game-controller.component';
import { HomePageControllerComponent } from './home/presentation/home-page/home-page-controller.component';

const routes: Routes = [
  {
    path: "",
    component: HomePageControllerComponent
  },
  {
    path: 'simon-game',
    component: GameControllerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
