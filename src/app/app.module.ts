import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { UserDetails } from './app.userDetails';
import { ChatHistory } from './chat-room/chat-room.chatHistory';
import { AppComponent } from './app.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';

const appRoutes: Routes = [
  { path: 'chatRoom', component: ChatRoomComponent }
];

@NgModule({
  declarations: [
    AppComponent, ChatRoomComponent
  ],
  imports: [
    BrowserModule, HttpModule, JsonpModule, FormsModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [UserDetails, ChatHistory],
  bootstrap: [AppComponent]
})

export class AppModule { }
