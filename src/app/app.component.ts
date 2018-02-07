import { Component } from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as io from 'socket.io-client';
import { UserDetails } from './app.userDetails';
import { ChatHistory } from './chat-room/chat-room.chatHistory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: string;
  regLogMessages: string;
  username: string;
  password: string;
  goToChatRoom: boolean;
  doLogin: boolean;
  doRegister: boolean;
  chatRoomView: boolean;
  showRegistrationLoginMessages: boolean;
  serverData: any;
  regSuccess: string;
  invalidEntry: string;
  loggedUser: any;
  socket = io('http://localhost:4000');

  constructor(public userDetails: UserDetails, public router: Router, private _http: Http) {
    this.username = '';
    this.password = '';
    this.title = 'VChat';
    this.regLogMessages = this.regSuccess = 'Successfully Registered. Now you may Login!';
    this.invalidEntry = 'Invalid Entry. Try Again!';
    this.goToChatRoom = true;
    this.doLogin = true;
    this.doRegister = false;
    this.chatRoomView = false;
    this.showRegistrationLoginMessages = false;
  }

  loginToChatRoom(event) {
    if (this.username !== '' && this.password !== '') {
      this.userDetails.setUser(this.username);
      let dataUser = null;
      dataUser = {username: this.username, pwd: this.password};
      return this._http.post('/login', dataUser).subscribe(
        response  => {
          this.serverData = response.json();
          if (this.serverData.status === 'Success') {
            this.goToChatRoom = false;
            this.showRegistrationLoginMessages = false;
            this.router.navigate(['/chatRoom']);
            this.socket.emit('userLoggedIn', this.userDetails.getUser());
          } else {
            this.failedLogIn();
          }
        }
      );
    }else {
      this.failedLogIn();
    }
  }

  failedLogIn() {
    this.goToChatRoom = true;
    this.showRegistrationLoginMessages = true;
    this.regLogMessages = this.invalidEntry;
  }

  registerUser(event) {
    if (this.username !== '' && this.password !== '') {
      let dataUser = null;
      dataUser = {username: this.username, pwd: this.password, loggedIn: false};
      return this._http.post('/register', dataUser).subscribe(
        response  => {
          this.serverData = response.json();
          if (this.serverData.status === 'Success') {
            this.doLogin = true;
            this.doRegister = false;
            this.regLogMessages = this.regSuccess;
            this.showRegistrationLoginMessages = true;
          } else {
            this.regLogMessages = this.serverData.error;
            this.showRegistrationLoginMessages = true;
          }
        }
      );
    } else {
      this.regLogMessages = this.invalidEntry;
      this.showRegistrationLoginMessages = true;
    }
  }

  optRegistration(event) {
    this.doLogin = false;
    this.doRegister = true;
    this.showRegistrationLoginMessages = false;
  }

  logoutFromVChat(event) {
    this.socket.emit('UserLoggedOut', this.userDetails.getUser());
    this.goToChatRoom = true;
    this.router.navigate(['/']);
    this.userDetails.setUser('');
  }

}
