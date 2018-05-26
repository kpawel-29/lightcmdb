import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Configuration} from '../model/Configuration';

@Injectable()
export class ConfigurationService {

    constructor(private http: Http) {
    }

    getConfiguration(): Observable<Configuration[]> {
        return this.http.get('http://212.237.24.83:8080/dbapi/webresources/config')
            .map(res => res.json());
    }

    createConfiguration(dto: Configuration): Observable<Configuration[]> {
        return this.http.post('http://212.237.24.83:8080/dbapi/webresources/config', dto)
            .map(res => res.json());
    }

    deleteConfiguration(id: string): Observable<Configuration[]> {
        return this.http.delete(`http://212.237.24.83:8080/dbapi/webresources/config/${id}`)
            .map(res => res.json());
    }

    editConfiguration(dto: Configuration): Observable<Configuration[]> {
        return this.http.put(`http://212.237.24.83:8080/dbapi/webresources/config/${dto.id}`, dto)
            .map(res => res.json());
    }
}
