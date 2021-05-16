import { Inject, Component, HostListener, OnInit, Host } from '@angular/core';
import {
  BusinessLogicRequirements,
  BusinessRequirementsInjectionToken,
} from '../business-logic.requirements';
import { GameStore } from './game.store';
import { environment } from 'src/environments/environment';
import { GameStateService } from 'src/app/lib/game-state.service';
import { ShareService } from 'src/app/lib/share.service';
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
    private router: Router,
    private shareService: ShareService
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
  public sound;
  public headerItem = [
    {
      value1: '0',
      value2: 'username',
      value3: 2,
      class: 'howto-text',
    },
  ];
  public headerIndex = 0;

  public username = localStorage.getItem('username')
    ? localStorage.getItem('username')
    : null;
  public showProfileBox = false;
  public showLeaderboard = false;
  public level = 1;
  public winnerPopup = {
    text: [
      {
        value: 'Congratulations!!!',
        class: 'win-text-header',
      },
      {
        value: 'Level ' + this.level + ' completed.',
        class: 'win-text-header',
      },
    ],
    btn: [
      {
        text: 'Continue',
        class: 'popup-btn1',
      },
      {
        text: 'Reset',
        class: 'popup-btn2',
      },
    ],
  };

  public wrongGuessPopup = {
    text: [
      {
        value: 'Your guess is wrong!!!',
        class: 'win-text-header',
      },
    ],
    btn: [
      {
        text: 'Try again',
        class: 'popup-btn1',
      },
      {
        text: 'Reset',
        class: 'popup-btn2',
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
  public unsupportText = 'Please change screen to portrait mode';

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
    console.log('ori', window.innerWidth);
    if (window.innerHeight > window.innerWidth && window.innerWidth <= 1024) {
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
      if (window.innerHeight >= 600 && window.innerWidth <= 1024) {
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
        this.unsupportText =
          'This game supports only for mobile and tablet in portraid mode.';
        this.supportOrientation = false;
        this.previousSupportOrientation = this.supportOrientation;
      }
    }
  }

  ngOnInit(): void {
    this.game.state.subscribe((state) => {
      console.log('haha', state);
      this.state = state;
      this.count = state.count; //for show
      this.simonArray = state.simon;
      this.level = this.simonArray.length;
      this.sound = state.sound;
      (this.winnerPopup.text[1].value = 'Level ' + this.level + ' completed.'),
        (this.finishedLoop = state.finishedLoop);
      this.showWinnerText = state.showWinnerText;
      this.showErrorText = state.showErrorText;

      if (this.showErrorText)
        setTimeout(() => {
          this.game.playLoseAudio();
        }, 300);
      if (this.showWinnerText)
        setTimeout(() => {
          this.game.playWinAudio();
        }, 300);
    });
    this.userId = this.shareService.getUserId();
    if (this.userId) this.getUserDetail(this.userId);
    else {
      this.router.navigate(['']);
      this.shareService.setUserId(null);
    }
    this.getCurrentUserRank();
  }

  getUserDetail(id) {
    this.business.getUserDetails(id).subscribe(
      (data) => {
        console.log(data);
        this.userInfo = data;
        console.log(this.userInfo['sound'], ' in getUserDetail');
        this.game.changeState(
          this.userInfo['level'],
          false,
          false,
          this.userInfo['sound']
        );
      },
      (err) => {
        console.log('err');
      }
    );
  }

  startGameClicked() {
    console.log('start game');
    this.startGame = true;
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
    console.log(this.headerItem);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
    this.shareService.setUserId(null);
  }

  soundChange(val: boolean) {
    console.log('I am sound on ', val);
    console.log(this.userInfo, this.userId);
    var body = {
      sound: val,
    };
    this.business.saveGame(this.userId, body).subscribe(
      (data) => {
        console.log(data);
        this.sound = val;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  saveGame() {
    console.log('I am saving');
    this.saveLoading = true;
    console.log(this.userInfo, this.userId);
    var body = {
      level: this.level,
      sound: this.sound,
    };
    if (this.level > 2 && this.userId != 'undefined') {
      this.showProfileBox = false;
      this.business.saveGame(this.userId, body).subscribe(
        (data) => {
          console.log(data);
          this.saveLoading = false;
          this.getCurrentUserRank();
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
      this.game.changeState(this.level + 1, false, false, this.sound);
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
  getCurrentUserRank() {
    this.business.getAllRank().subscribe(
      (data) => {
        console.log('rank from api ', data);
        var index = 0;
        for (var i = 0; i < data.length; i++) {
          if (data[i]._id == this.userId) index = i;
        }
        this.headerItem = [];
        this.headerItem.push({
          value1: index.toString(),
          value2: data[index].username,
          value3: data[index].level ? data[index].level : 2,
          class: 'howto-text',
        });
        console.log('rank ', this.headerItem);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getLeaderboard() {
    this.leaderLoading = true;
    this.showLeaderboard = true;
    this.business.getLeaderboard().subscribe(
      (data) => {
        console.log('data ', data);
        this.leaderLoading = false;
        this.leaderboardPopup.text = [];
        for (var i = 0; i < data.length; i++) {
          this.leaderboardPopup.text.push({
            value1: (i + 1).toString(),
            value2: data[i].username,
            value3: data[i].level ? data[i].level : 2,
            class: 'howto-text',
          });
        }
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
