import { Inject, Component, HostListener, OnInit, Host } from '@angular/core';
import {
  BusinessLogicRequirements,
  BusinessRequirementsInjectionToken,
} from '../business-logic.requirements';
import { GameStore } from './game.store';
import { environment } from 'src/environments/environment';
import { GameStateService } from 'src/app/lib/game-state.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-game',
  templateUrl: './game-controller.component.html',
  styleUrls: ['./game-controller.component.css'],
})
export class GameControllerComponent {
  constructor(
    @Inject(BusinessRequirementsInjectionToken)
    private business: BusinessLogicRequirements,
    private store: GameStore,
    private game: GameStateService,
    private router: Router
  ) {}

  count: number;
  ring: boolean;
  state: any;
  simonArray: string[] = [];
  finishedLoop: boolean = false;
  supportOrientation: boolean = true;
  showWinnerText: boolean = false;
  showErrorText: boolean = false;
  showDebug = environment.showDebug;
  previousSupportOrientation: boolean = false;

  public userInfo;
  public userId;

  public username = localStorage.getItem('username')
    ? localStorage.getItem('username')
    : null;
  public showProfileBox = false;
  public showLeaderboard = false;
  public level = 1;
  public winnerPopup = {
    text: [
      {
        value: 'You win this time!!!',
        class: 'win-text',
      },
      {
        value: 'Your can memorize ' + this.level + ' items.',
        class: 'win-text',
      },
    ],
    btn: [
      {
        text: 'Continue',
        class: 'continue-btn',
      },
      {
        text: 'Reset',
        class: 'continue-btn',
      },
    ],
  };

  public wrongGuessPopup = {
    text: [
      {
        value: 'Your guess is wrong!!!',
        class: 'win-text',
      },
    ],
    btn: [
      {
        text: 'Try again',
        class: 'continue-btn',
      },
      {
        text: 'Reset',
        class: 'continue-btn',
      },
    ],
  };
  public howToPlayPopup = {
    text: [
      {
        value: 'How to play',
        class: 'howtoplay-header',
      },
      {
        value: '1-player Game',
        class: 'how-text',
      },
      {
        value:
          'Press the START button. Simon will give the first two signals. Repeat the signals by pressing the same color buttons.',
        class: 'how-text',
      },
      {
        value:
          'Simon will duplicate these first two signals and add one. Repeat these three signals by pressing the same color buttons, in order.',
        class: 'how-text',
      },
      {
        value:
          'If you can play guess each time, Simon will give you two options : CONTINUE or RESET . ',
        class: 'how-text',
      },
      {
        value: 'CONTINUE : You can play next level.',
        class: 'how-text',
      },
      {
        value: 'RESET : You can play from beginner level.',
        class: 'how-text',
      },
      {
        value:
          'If you fail to repeat a sequence exactly, Simon responds an error. This means you have lost, and the sequence of signals ends.',
        class: 'how-text',
      },
    ],
    btn: [
      {
        text: 'Ready to play',
        class: 'continue-btn',
      },
    ],
  };
  public leaderboardPopup = {
    text: [],
    btn: [],
  };
  public startGame = false;
  public showHowToPlay = false;
  public saveLoading = false;
  public leaderLoading = false;

  @HostListener('document:click', ['$event']) documentClick(event) {
    event.stopPropagation();
    event.preventDefault();
    console.log($(event.target).parents());

    var inside1 = $(event.target).parents('.mobile-header').length == 1;
    var inside2 = $(event.target).parents('.mobile-profile-bar').length == 1;
    // $(event.target).parents('#badge-item').length ==1;
    console.log(!inside1 && !inside2);
    // if (!inside1 && !inside2) {
    //   this.showProfileBox = false;
    // }
  }

  @HostListener('window:resize') updateOrientatioState() {
    console.log('ori');
    if (window.innerHeight > window.innerWidth) {
      this.supportOrientation = true;
      if (
        !this.previousSupportOrientation &&
        this.supportOrientation &&
        this.startGame
      ) {
        this.game.generateSimon();
      }
      this.previousSupportOrientation = this.supportOrientation;
    } else {
      if (window.innerHeight >= 600) {
        this.supportOrientation = true;
        if (
          !this.previousSupportOrientation &&
          this.supportOrientation &&
          this.startGame
        ) {
          this.game.generateSimon();
        }
        this.previousSupportOrientation = this.supportOrientation;
      } else {
        this.supportOrientation = false;
      }
    }
  }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.userId = this.userInfo['_id'];
    console.log(this.userInfo.level);
    this.game.changeState(this.userInfo['level'], false, false);
  }

  startGameClicked() {
    console.log('start game');
    this.startGame = true;
    this.game.state.subscribe((state) => {
      console.log(state);
      this.state = state;
      this.count = state.count; //for show
      this.simonArray = state.simon;
      this.level = this.simonArray.length;
      this.winnerPopup.text[1].value =
        'Your can memorize ' + this.level + ' items.';
      this.finishedLoop = state.finishedLoop;
      this.showWinnerText = state.showWinnerText;
      this.showErrorText = state.showErrorText;
    });
    this.updateOrientatioState();
  }

  playerGuess(e: string) {
    console.log(e, 'player guess');
    if (e !== 'white' && this.finishedLoop) {
      this.game.playerGuess(e);
    } else {
      this.game.restartSimon();
    }
  }

  tryAgain() {
    this.game.tryAgain();
  }

  updateGame() {
    // sent max times to api
    this.game.updateGame();
  }

  showProfile() {
    this.showProfileBox = !this.showProfileBox;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  // getCurrentLevel() {
  //   this.business.getCurrentLevel(this.userId).subscribe(
  //     (data) => {
  //       console.log(data);
  //       if (data.lenght > 0) this.game.setLevel(data.level);
  //       else this.game.setLevel(2);
  //     },
  //     (error) => {
  //       console.log(error);
  //       this.game.setLevel(2);
  //     }
  //   );
  // }

  saveGame() {
    console.log('I am saving');
    this.saveLoading = true;
    console.log(this.userInfo, this.userId);
    var body = {
      level: this.level,
    };
    if (this.level > 2 && this.userId != 'undefined') {
      this.showProfileBox = false;
      this.business.saveGame(this.userId, body).subscribe(
        (data) => {
          console.log(data);
          this.saveLoading = false;
        },
        (error) => {
          console.log(error);
          this.saveLoading = false;
        }
      );
    } else {
      console.log("You can't save this level");
    }
  }

  clickedWinnerPopup(index) {
    console.log(index);
    if (index == 0) this.game.updateGame();
    else if (index == 1) this.playerGuess('white');
    else {
      this.game.changeState(this.level + 1, false, false);
      this.startGame = false;
      this.previousSupportOrientation = false;
    }
  }

  clickedwrongGuessPopup(index) {
    if (index == 0) this.game.tryAgain();
    else this.playerGuess('white');
  }

  howToPlay() {
    this.showHowToPlay = true;
  }

  clickedhowToPlayPopup(index) {
    this.showHowToPlay = false;
  }

  leaderboard() {
    this.showProfileBox = false;
    this.getLeaderboard();
  }
  getLeaderboard() {
    this.leaderLoading = true;
    this.showLeaderboard = true;
    this.business.getLeaderboard().subscribe(
      (data) => {
        console.log('data ', data);
        this.leaderLoading = false;
        this.leaderboardPopup.text = [];
        this.leaderboardPopup.text.push({
          value1: 'No',
          value2: 'Username',
          value3: 'Level',
          class: 'howto-text',
        });
        for (var i = 0; i < data.length; i++) {
          this.leaderboardPopup.text.push({
            value1: (i + 1).toString(),
            value2: data[i].username,
            value3: data[i].level ? data[i].level : 2,
            class: 'howto-text',
          });
        }
        console.log(this.leaderboardPopup);

        this.showLeaderboard = true;
      },
      (err) => {
        console.log(err);
        this.leaderLoading = false;
      }
    );
  }
  clickedleaderboardPopup(index) {
    this.showLeaderboard = false;
  }
}
