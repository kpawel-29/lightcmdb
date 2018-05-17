import {Component, OnInit} from '@angular/core';
import {SidebarService} from "./sidebar.service";
import {AuthenticationService} from "../../auth/authentication.service";

declare const $: any;

export class RouteInfo {
    path: string;
    title: string;
    icon: string;
    class?: string;
}

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    private menuItems: any[];
    private user = 'admin';

    constructor(private sidebarService: SidebarService,
                private authService: AuthenticationService) {
        localStorage.setItem('user', 'true');
    }

    ngOnInit() {
        const isAdmin = localStorage.getItem('user') === 'true';
        this.user = isAdmin ? 'admin' : 'pracownik';
        this.menuItems = this.sidebarService.getRoutes(this.user);
    }

    logout(): void {
        this.authService.logout();
    }
}
