import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopupStore } from './popup.store';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  constructor(private store: PopupStore) {}

  @Input() popup;
  @Input() isTop = false;
  @Output() btnPopupClicked = new EventEmitter<any>();

  ngOnInit() {
    console.log(this.popup);
  }

  btnClick(event) {
    for (var i = 0; i < this.popup.btn.length; i++) {
      console.log(event.target.innerText, this.popup.btn[i].text);
      if (event.target.innerText == this.popup.btn[i].text)
        this.btnPopupClicked.emit(i);
      else console.log('nah');
    }
    console.log(event.target.innerText);
  }

  close() {
    this.btnPopupClicked.emit(-1);
  }
}
