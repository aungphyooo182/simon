import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameFeatureModule } from './game/game.module';
import { HomeFeatureModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeFeatureModule,
    GameFeatureModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
