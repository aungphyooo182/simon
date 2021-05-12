import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {CardStore} from './card.store'

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{
  public form = this.fb.group({
    username: this.fb.control("", [Validators.required]),
    password: this.fb.control("", [Validators.required,Validators.minLength(8)])
  });

  constructor(private store: CardStore,private fb: FormBuilder) {}

  @Output() outputRegister = new EventEmitter ();
  @Output() outputLogin = new EventEmitter ();

  public usernameClass = "signup-input";
  public passwordClass = "signup-input";
  public usernameError = false;
  public togglePassword = "password";
  public eyeOpenUrl = "./assets/images/eye_open.svg";
  public eyeCloseUrl = "./assets/images/eye_close.svg";
  public clickBtn = false;
  public clickedEyeOpen = false;
  public loading = false;
  public username;
  public password;

  public showLoginForm = false;

  ngOnInit(){
    this.form.valueChanges.subscribe((value) => {
      this.clickBtn = false;
      this.usernameClass = "signup-full";
      this.passwordClass = "signup-full";
      this.usernameError = false;
    });
  }

  blurInput($event) {
    console.log("get blur event");
  }

  showLogin(){
    this.showLoginForm = true;
  }

  showSignup(){
    this.showLoginForm = false;
  }

  signup(){
    this.clickBtn = true;
    console.log('clicked')
    // this.existUserName = true;
    if (this.form.valid) {
      this.username = this.form.get('username').value.trim();
      this.password = this.form.get('password').value.trim();
      var registerObject = {
        'username' : this.username,
        'password' : this.password
      }
      // this.shared.setRegisterData(registerObject);
      // this.nextOutput.emit(registerObject);
      console.log('next');
      this.outputRegister.emit(registerObject);
    }else{
      console.log(this.form.errors)
      this.usernameClass = "input-err";
      this.passwordClass = "input-err";
    }
   }

   login(){
    this.clickBtn = true;
    console.log('clicked')
    // this.existUserName = true;
    if (this.form.valid) {
      this.username = this.form.get('username').value.trim();
      this.password = this.form.get('password').value.trim();
      var loginObject = {
        'username' : this.username,
        'password' : this.password
      }
      console.log('next');
      this.outputLogin.emit(loginObject);
    }else{
      this.usernameClass = "input-err";
      this.passwordClass = "input-err";
    }
   }

}
