import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { TextComponent } from './text/text.component';
import { ImageComponent } from './image/image.component';
import { InputComponent } from './input/input.component';

const components = [
  ButtonComponent,
  TextComponent,
  ImageComponent,
  InputComponent
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
