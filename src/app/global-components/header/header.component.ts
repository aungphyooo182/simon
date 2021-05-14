import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderStore } from './header.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private store: HeaderStore, private router: Router) {}

  @Input() username = '';
  @Input() showProfileBox = false;

  @Output() outputLeaderboard = new EventEmitter<any>();
  @Output() outputSave = new EventEmitter<any>();
  @Output() outputHowToPlay = new EventEmitter<any>();
  @Output() outputProfileBox = new EventEmitter<any>();

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
  save() {
    localStorage.clear();
    this.router.navigate(['']);
  }
  leaderboard() {
    localStorage.clear();
    this.router.navigate(['']);
  }
  howToPlay() {}

  showProfile() {
    this.outputProfileBox.emit();
  }
}
