import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ImageStore} from './image.store'

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})
export class ImageComponent {
  @Input() src;
  @Input() alt="alt";
  @Input() class="default-class";

  @Output() imageIsLoaded = new EventEmitter<any> ();

  constructor(private store: ImageStore) {}
  ngOnInit() {
  }
  imageLoad(){
    this.imageIsLoaded.emit();
  }
}
