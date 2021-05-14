import { Inject, Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  BusinessLogicRequirements,
  BusinessRequirementsInjectionToken,
} from '../business-logic.requirements';
import { HomePageStore } from './home-page.store';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page-controller.component.html',
  styleUrls: ['./home-page-controller.component.css'],
})
export class HomePageControllerComponent {
  constructor(
    @Inject(BusinessRequirementsInjectionToken)
    private business: BusinessLogicRequirements,
    private store: HomePageStore,
    private router: Router
  ) {}

  public btnLoading = false;

  register(data) {
    this.btnLoading = true;
    var regData = data;
    this.business.register(data).subscribe(
      (data) => {
        console.log(data);
        this.login(regData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  login(data) {
    this.btnLoading = true;
    this.business.login(data).subscribe(
      (data) => {
        console.log(data, 'hello');
        localStorage.setItem('username', data.username);
        this.btnLoading = false;
        this.router.navigateByUrl('/simon-game');
      },
      (error) => {
        console.log(error);

        // window.location.replace("http://localhost:4200/simon-game");
      }
    );
  }
}
