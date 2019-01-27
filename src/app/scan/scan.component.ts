import {Component, OnInit} from '@angular/core';
import {Scan, ScanHistory} from '../model/Scan';
import {ScanService} from './scan.service';

@Component({
    selector: 'app-scan',
    templateUrl: './scan.component.html',
    styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit {

    scanHistory: ScanHistory[] = [];

    constructor(private service: ScanService) {
    }

    ngOnInit() {
        this.service.getScanHistory().subscribe(
            next => this.scanHistory = next,
            err => alert('Błąd pobierania historii skanowania')
        );
    }
}
