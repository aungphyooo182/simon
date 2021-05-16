import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToastStore } from './toast.store';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent {
  @Input() feedbackTitle = '';
  @Input() feedbackBody = '';
  @Input() feedbackBtn = {
    status: false,
    text: '',
  };
  @Input() tickIcon = true;
  @Output() dimissFeedbackBtn = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  dimissFeedback($event) {
    this.dimissFeedbackBtn.emit($event);
  }
}
