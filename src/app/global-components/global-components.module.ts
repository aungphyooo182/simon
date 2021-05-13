import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { TextComponent } from './text/text.component';
import { ImageComponent } from './image/image.component';
import { InputComponent } from './input/input.component';
import { PopupComponent } from './popup/popup.component';

const components = [
  ButtonComponent,
  TextComponent,
  ImageComponent,
  InputComponent,
  PopupComponent
]

@NgModule({
    declarations: components,
    exports: components,
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ]
})
export class GlobalComponentsModule {}
