import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { TextComponent } from './text/text.component';
import { ImageComponent } from './image/image.component';
import { InputComponent } from './input/input.component';
import { PopupComponent } from './popup/popup.component';
import { HeaderComponent } from './header/header.component';
import { LeaderboardItemComponent } from './leaderboard-item/leaderboard-item.component';

const components = [
  ButtonComponent,
  TextComponent,
  ImageComponent,
  InputComponent,
  PopupComponent,
  HeaderComponent,
  LeaderboardItemComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, ReactiveFormsModule],
})
export class GlobalComponentsModule {}
