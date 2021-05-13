import {Component, Input, Output, EventEmitter} from '@angular/core';
import {GameButtonStore} from './game-button.store'

@Component({
    selector: 'app-game-button',
    templateUrl: './game-button.component.html',
    styleUrls: ['./game-button.component.css']
})
export class GameButtonComponent {
    constructor(private store: GameButtonStore) {}
  @Input() color: string;
  @Output() guess: EventEmitter<string> = new EventEmitter<string> ();
  @Input() active: boolean = false;

  ngOnInit(): void {
  }

  onClick(){
    this.guess.emit(this.color);
  }

}
