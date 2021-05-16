import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ShareService } from 'src/app/lib/share.service';
import { HeaderStore } from './header.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private store: HeaderStore,
    private router: Router,
    private shareService: ShareService
  ) {}

  @Input() username = '';
  @Input() showProfileBox = false;
  @Input() saveLoading = false;
  @Input() leaderLoading = false;
  @Input() sound = true;
  @Input() item = [];
  @Input() index;

  @Output() outputLeaderboard = new EventEmitter<any>();
  @Output() outputSave = new EventEmitter<any>();
  @Output() outputHowToPlay = new EventEmitter<any>();
  @Output() outputProfileBox = new EventEmitter<any>();
  @Output() outputSound = new EventEmitter<any>();

  ngOnInit() {
    console.log('user item', this.item);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
    this.shareService.setUserId(null);
  }
  saveGame() {
    console.log('i emit');
    this.outputSave.emit();
  }
  leaderboard() {
    console.log('leaderboard');
    this.outputLeaderboard.emit();
  }
  howToPlay() {}

  showProfile() {
    this.outputProfileBox.emit();
  }

  soundClicked() {
    console.log('sound off clicked');
    this.outputSound.emit(!this.sound);
  }
}
