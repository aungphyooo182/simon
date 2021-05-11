import {Inject, Component, HostListener,OnInit} from '@angular/core';
import {BusinessLogicRequirements, BusinessRequirementsInjectionToken} from '../business-logic.requirements';
import {GameStore} from './game.store'
import { environment } from 'src/environments/environment';
import { GameStateService } from 'src/app/lib/game-state.service';
@Component({
    selector: 'app-game',
    templateUrl: './game-controller.component.html',
    styleUrls: ['./game-controller.component.css']
})
export class GameControllerComponent {
    constructor(
        @Inject(BusinessRequirementsInjectionToken) private business: BusinessLogicRequirements,
        private store: GameStore,
        private game: GameStateService,
    ) {}

    count: number;
    ring: boolean;
    state: any;
    simonArray: string[];
    finishedLoop: boolean = false;
    supportOrientation: boolean = true;
    showWinnerText: boolean = false;
    showErrorText: boolean = false;
    showDebug = environment.showDebug;
    previousSupportOrientation : boolean = false;

    @HostListener("window:resize") updateOrientatioState() {
      console.log('ori')
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
      this.game.state.subscribe(state=>{
        console.log(state);
        this.state = state;
        this.count = state.count; //for show
        this.simonArray = state.simon;
        this.finishedLoop = state.finishedLoop;
        this.showWinnerText = state.showWinnerText;
        this.showErrorText = state.showErrorText;
      });
      this.updateOrientatioState();
    }

    playerGuess(e: string) {
      if (e !== 'white' && this.finishedLoop) {
        this.game.playerGuess(e);
      } else {
        this.game.restartSimon();
      }
    }

    tryAgain(){
      this.game.tryAgain();
    }

    updateGame() {
      this.game.updateGame();
    }
}
