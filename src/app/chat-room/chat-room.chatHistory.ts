import {
    Injectable
 } from '@angular/core';

 @Injectable()
 export class ChatHistory {
    chatHistory: any = [];
    getChatHistory(user, friend) {
        let count = 0;
        let index = 0;
        for (let i = 0; i < this.chatHistory.length; i++) {
            count = 0;
            if (this.chatHistory[i].chatPartners !== undefined || this.chatHistory[i].chatPartners != null) {
                for (let j = 0; j < this.chatHistory[i].chatPartners.length; j++) {
                    if (this.chatHistory[i].chatPartners[j].username === user || this.chatHistory[i].chatPartners[j].username === friend) {
                        count++;
                    }
                }
            }
            if (count === 2) {
                index = i;
                return this.chatHistory[index].chats;
            }
        }
        return null;
    }
    setChatHistory(data) {
        this.chatHistory = data;
    }
}

