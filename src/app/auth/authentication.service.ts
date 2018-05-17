import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map'
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthenticationService {
    isLoggedIn = false;
    isAdmin = false;

    constructor(private router: Router) {
    }

    loginMock(type: string): any {
        this.isLoggedIn = true;
        this.isAdmin = type === 'admin';
        this.setCookie(3600);
        return true;
    }

    // redirect if cookie expired
    checkTokenCookie() {
        const cookies = document.cookie;
        if (cookies === '') {
            this.logout();
        }
    }

    refreshToken() {
        // TODO: refresh session before request send
    }

    setCookie(seconds: number) {
        localStorage.setItem('user', this.isAdmin.toString());
        const date = new Date();
        date.setSeconds(date.getSeconds() + seconds);
        document.cookie = 'session_is_active=true;expires=' + date.toUTCString();
    }

    logout() {
        localStorage.removeItem('user');
        this.isLoggedIn = false;
        this.router.navigate(['login']);
    }
}