import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {Attribute} from '../model/Attribute';
import {CIType} from '../model/CIType';

@Injectable()
export class CiTypeService {

    private value = new Subject();

    change(change: boolean) {
        this.value.next(change);
    }

    changed(): Observable<any> {
        return this.value.asObservable();
    }

    public constructor(private http: Http) {
    }

    attributes(): Observable<Attribute[]> {
        return this.http.get('http://212.237.24.83:8080/dbapi/webresources/attributes').map(res => res.json());
    }

    ciTypes(): Observable<CIType[]> {
        return this.http.get('http://212.237.24.83:8080/dbapi/webresources/citype').map(res => res.json());
    }

}
