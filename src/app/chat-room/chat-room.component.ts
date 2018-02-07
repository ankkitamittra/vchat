import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { UserDetails } from '../app.userDetails';
import { ChatHistory } from './chat-room.chatHistory';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})

export class ChatRoomComponent implements OnInit {
  message: string;
  data: any= [];
  userList: any= [];
  accountUser: string;
  friend: string;
  startChatMsg: string;
  openChatBox: boolean;
  converstationStatusClass: string;
  socket = io('http://localhost:4000');


  constructor(public userDetails: UserDetails, public chatHistory: ChatHistory) {
    this.message = '';
    this.openChatBox = true;
    this.friend = '';
    this.converstationStatusClass = 'alert alert-success';
    this.startChatMsg = 'Click on any online user to start chatting';
  }

  ngOnInit() {
    const  scope = this;

    scope.socket.on('connect', function (socket) {
      console.log('Connected!');
      scope.accountUser = scope.userDetails.getUser();
      scope.socket.emit('getUserList');
    });

    scope.socket.on('newMessage', function (chatData) {
      scope.data = [];
      scope.startChatMsg = '';
      scope.message = '';
      scope.openChatBox = false;
      if (scope.friend === '') {
        scope.friend = chatData.user;
      }
      if ((chatData.user !== scope.accountUser) && (scope.friend !== chatData.user) && (scope.friend !== chatData.friend)) {
        scope.newMessageNotify(chatData.user);
      }
      scope.chatHistory.setChatHistory(chatData.chats);
      scope.data = scope.chatHistory.getChatHistory(scope.accountUser, scope.friend);
    });

    scope.socket.on('userListUpdated', function (socket) {
      scope.userList = [];
      for (let i = 0 ; i < socket.length; i++) {
        if (socket[i].username !== scope.accountUser) {
          scope.userList.push({statClass: 'alert alert-success', loggedUsers: socket[i].username});
        }
      }
    });

  }

  findUser(user) {
    for (let i = 0 ; i < this.userList.length; i++) {
      if (this.userList[i].loggedUsers === user) {
        return i;
      }
    }
  }

  newMessageNotify (user) {
    const index = this.findUser(user);
    this.userList[index].statClass = 'alert alert-warning';
  }

  readMessgeNotify (user) {
    const index = this.findUser(user);
    this.userList[index].statClass = 'alert alert-success';
  }

  openChat(user) {
    this.friend = user;
    this.startChatMsg = '';
    this.data = this.chatHistory.getChatHistory(this.accountUser, this.friend);
    this.openChatBox = false;
    this.readMessgeNotify(user);
  }

  sendMessage() {
    this.socket.emit('sentMessage', {user: this.userDetails.getUser(), friend: this.friend, messages: this.message});
  }

}
