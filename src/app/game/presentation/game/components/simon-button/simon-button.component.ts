import {Component, EventEmitter, Output} from '@angular/core';
import {SimonButtonStore} from './simon-button.store'

@Component({
    selector: 'app-simon-button',
    templateUrl: './simon-button.component.html',
    styleUrls: ['./simon-button.component.css']
})
export class SimonButtonComponent {
    constructor(private store: SimonButtonStore) {}
    @Output() guess: EventEmitter<string> = new EventEmitter<string> ();

    btnClick(event){
        this.guess.emit(event);
    }
}
