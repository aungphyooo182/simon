import {Component} from '@angular/core';
import {LeaderBoardStore} from './leader-board.store'

@Component({
    selector: 'app-leader-board',
    templateUrl: './leader-board.component.html',
    styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent {
    constructor(private store: LeaderBoardStore) {}
}
