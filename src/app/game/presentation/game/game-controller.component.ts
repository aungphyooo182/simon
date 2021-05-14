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
  public startGame = false;
  public showHowToPlay = false;

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
      if (!this.previousSupportOrientation && this.supportOrientation) {
        this.game.generateSimon();
      }
      this.previousSupportOrientation = this.supportOrientation;
    } else {
      if (window.innerHeight >= 600) {
        this.supportOrientation = true;
        if (!this.previousSupportOrientation && this.supportOrientation) {
          this.game.generateSimon();
        }
        this.previousSupportOrientation = this.supportOrientation;
      } else {
        this.supportOrientation = false;
      }
    }
  }

  ngOnInit(): void {
    this.userInfo = localStorage.getItem('userInfo');
    this.userId = JSON.parse(this.userInfo)['_id'];
    this.getCurrentLevel();
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

  getCurrentLevel() {
    this.business.getCurrentLevel(this.userId).subscribe(
      (data) => {
        console.log(data);
        this.game.setLevel(data.level);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  saveGame() {
    console.log('I am saving');

    console.log(this.userInfo, this.userId);
    var body = {
      level: this.level,
    };
    if (this.level > 2 && this.userId != 'undefined') {
      this.showProfileBox = false;
      this.business.saveGame(this.userId, body).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("You can't save this level");
    }
  }

  clickedWinnerPopup(index) {
    console.log(index);
    if (index == 0) this.game.updateGame();
    else this.playerGuess('white');
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
}
