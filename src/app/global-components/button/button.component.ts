import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ButtonStore} from './button.store'

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css']
})
export class ButtonComponent {
    @Input() disabled = false;
    @Input() class;
    @Input() loading=false;
    @Output() btnClick = new EventEmitter<any>();

    onButtonClick($event) {
      this.btnClick.emit($event);
    }

    constructor(private store: ButtonStore) {}
}
