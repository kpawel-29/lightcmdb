import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-discovery',
    templateUrl: './discovery.component.html',
    styleUrls: ['./discovery.component.css']
})
export class DiscoveryComponent implements OnInit {
    public selected = 'probe'; // probe | job | mapping | scheduler | task

    constructor() {
    }

    ngOnInit() {
    }

}
