import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Scan, ScanHistory} from '../model/Scan';

@Injectable()
export class ScanService {

    constructor(private http: Http) {
    }

    getScanHistory(): Observable<ScanHistory[]> {
        return this.http.get('http://212.237.24.83:8080/dbapi/webresources/scanhistory')
            .map(res => res.json());
    }
}
