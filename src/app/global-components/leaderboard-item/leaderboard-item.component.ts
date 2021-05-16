import { Component, Input } from '@angular/core';
import { LeaderboardItemStore } from './leaderboard-item.store';

@Component({
  selector: 'app-leaderboard-item',
  templateUrl: './leaderboard-item.component.html',
  styleUrls: ['./leaderboard-item.component.css'],
})
export class LeaderboardItemComponent {
  constructor(private store: LeaderboardItemStore) {}

  @Input() item;
  @Input() index;
  @Input() currentRank = false;

  ngOnInit() {
    console.log('index is ', this.index);
  }
}
