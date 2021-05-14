import { Inject, Component, HostListener, OnInit } from '@angular/core';
import {
  BusinessLogicRequirements,
  BusinessRequirementsInjectionToken,
} from '../business-logic.requirements';
import { GameStore } from './game.store';
import { environment } from 'src/environments/environment';
import { GameStateService } from 'src/app/lib/game-state.service';
import { Router } from '@angular/router';
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
  public startGame = false;

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
    // this.game.state.subscribe(state=>{
    //   console.log(state);
    //   this.state = state;
    //   this.count = state.count; //for show
    //   this.simonArray = state.simon;
    //   this.level = this.simonArray.length;
    //   this.winnerPopup.text[1].value = "Your can memorize "+ this.level+" items.";
    //   this.finishedLoop = state.finishedLoop;
    //   this.showWinnerText = state.showWinnerText;
    //   this.showErrorText = state.showErrorText;
    // });
    // this.updateOrientatioState();
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
    this.showProfileBox = true;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
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
}
