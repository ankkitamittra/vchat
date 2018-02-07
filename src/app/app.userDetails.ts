import {
    Injectable
 } from '@angular/core';

 @Injectable()
 export class UserDetails {
    user: string;
    getUser() {
        return this.user;
    }
    setUser(user) {
        this.user = user;
    }
}

