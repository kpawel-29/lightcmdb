import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (document.cookie !== '' || localStorage.getItem('user') !== null) {
            return true;
        }

        this.router.navigate(['login']);
        return false;
    }
}
