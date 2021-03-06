// import {Component, ElementRef, OnInit} from '@angular/core';
// import {Location} from '@angular/common';
//
// @Component({
//     selector: 'app-navbar',
//     templateUrl: './navbar.component.html',
//     styleUrls: ['./navbar.component.css']
// })
// export class NavbarComponent implements OnInit {
//     private toggleButton: any;
//     private sidebarVisible: boolean;
//
//     constructor(location: Location, private element: ElementRef,
//                 ) {
//         this.location = location;
//         this.sidebarVisible = false;
//     }
//
//     ngOnInit() {
//         const navbar: HTMLElement = this.element.nativeElement;
//         this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
//     }
//
//     sidebarOpen() {
//         const toggleButton = this.toggleButton;
//         const body = document.getElementsByTagName('body')[0];
//         setTimeout(function () {
//             toggleButton.classList.add('toggled');
//         }, 500);
//         body.classList.add('nav-open');
//
//         this.sidebarVisible = true;
//     };
//
//     sidebarClose() {
//         const body = document.getElementsByTagName('body')[0];
//         this.toggleButton.classList.remove('toggled');
//         this.sidebarVisible = false;
//         body.classList.remove('nav-open');
//     };
//
//     sidebarToggle() {
//         // const toggleButton = this.toggleButton;
//         // const body = document.getElementsByTagName('body')[0];
//         if (this.sidebarVisible === false) {
//             this.sidebarOpen();
//         } else {
//             this.sidebarClose();
//         }
//     };
// }
