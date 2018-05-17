import {Component, OnInit, ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../authentication.service';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    constructor(private element: ElementRef,
                private router: Router,
                private route: ActivatedRoute,
                private authService: AuthenticationService) {

    }

    ngOnInit() {

    }

    loginClick() {
        const user = $('#inputEmail').val();
        const pass = $('#inputPassword').val();

        if (user === '' && pass === '') {
            alert('nie wypełniłeś pól!');
        } else {
            const result = this.authService.loginMock(user);
            if (result) {
                this.router.navigate(['ci-type-manager']);
            } else {
                alert('wystąpił problem');
            }
        }
    }
}
