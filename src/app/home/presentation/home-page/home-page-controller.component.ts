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
  public showToast = false;
  public feedbackTitle = '';
  public feedbackBody = '';
  public feedbackBtn = {
    status: false,
    text: '',
  };
  public tickIcon = false;

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
        this.btnLoading = false;
        this.showToast = true;
        this.feedbackTitle = 'Register Error';
        this.feedbackBody = error.error.message;
        this.feedbackBtn = {
          status: false,
          text: '',
        };
        this.tickIcon = false;
        setTimeout(() => {
          this.showToast = false;
        }, 2000);
      }
    );
  }

  login(data) {
    this.btnLoading = true;
    this.business.login(data).subscribe(
      (data) => {
        console.log(data, 'hello');
        localStorage.setItem('userInfo', JSON.stringify(data));
        localStorage.setItem('username', data.username);
        this.btnLoading = false;
        this.router.navigateByUrl('/simon-game');
      },
      (error) => {
        console.log(error);
        this.btnLoading = false;
        this.showToast = true;
        this.feedbackTitle = 'Login Error';
        this.feedbackBody = error.error.message;
        this.feedbackBtn = {
          status: false,
          text: '',
        };
        this.tickIcon = false;
        setTimeout(() => {
          this.showToast = false;
        }, 2000);
      }
    );
  }
}
