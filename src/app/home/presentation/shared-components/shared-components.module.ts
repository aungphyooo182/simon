import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { CardComponent } from './card/card.component';
import { GlobalComponentsModule } from 'src/app/global-components/global-components.module';

const components = [
  CardComponent
]

@NgModule({
    declarations: components,
    exports: components,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        GlobalComponentsModule
    ]
})
export class SharedComponentsModule {}
