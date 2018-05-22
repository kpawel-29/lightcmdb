import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {NewMappingDto} from '../model/discovery/NewMappingDto';
import {IpRange} from '../model/IpRange';
import {Job} from '../model/Job';
import {Mapping} from '../model/Mapping';
import {Probe} from '../model/Probe';
import {Scheduler} from '../model/Scheduler';
import {Task} from '../model/Task';

@Injectable()
export class DiscoveryService {

    constructor(private http: Http) {
    }

    getMapping(): Observable<Mapping[]> {
        return this.http.get('http://212.237.24.83:8080/dbapi/webresources/mapping')
            .map(res => res.json());
    }

    // http://212.237.24.83:8080/dbapi/webresources/application.wadl
    addMapping(dto: NewMappingDto): Observable<any> {
        return this.http.post('http://212.237.24.83:8080/dbapi/webresources/mapping', dto);
    }

    removeMapping(id: string): Observable<any> {
        return this.http.delete('http://212.237.24.83:8080/dbapi/webresources/mapping/' + id);
    }

    getJobs(): Observable<Job[]> {
        return this.http.get('http://212.237.24.83:8080/dbapi/webresources/job')
            .map(res => res.json());
    }

    addJob(dto: Job): Observable<any> {
        return this.http.post('http://212.237.24.83:8080/dbapi/webresources/job', dto);
    }

    removeJob(id: string): Observable<any> {
        return this.http.delete('http://212.237.24.83:8080/dbapi/webresources/job/' + id);
    }

    getSchedulers(): Observable<Scheduler[]> {
        return this.http.get('http://212.237.24.83:8080/dbapi/webresources/scheduler')
            .map(res => res.json());
    }
    getProbeSchedulers(probeId: string): Observable<Scheduler[]> {
        return this.http.get(`http://212.237.24.83:8080/dbapi/webresources/scheduler/active?probeID=${probeId}`)
            .map(res => res.json());
    }

    addScheduler(dto: Scheduler, probeId: string): Observable<any> {
        return this.http.post(`http://212.237.24.83:8080/dbapi/webresources/scheduler?probeID=${probeId}`, dto);
    }

    editScheduler(dto: Scheduler, probeId: string): Observable<any> {
        return this.http.put(`http://212.237.24.83:8080/dbapi/webresources/scheduler/${dto.id}`, dto);
    }

    removeScheduler(id: string): Observable<any> {
        return this.http.delete('http://212.237.24.83:8080/dbapi/webresources/scheduler/' + id);
    }

    addJobToScheduler(dto: any): Observable<any> {
        return this.http.put(`http://212.237.24.83:8080/dbapi/webresources/scheduler/${dto.id}/addjob/${dto.jobid}`, null);
    }

    getTasks(): Observable<Task[]> {
        return this.http.get('http://212.237.24.83:8080/dbapi/webresources/task')
            .map(res => res.json());
    }

    addTask(dto: Task): Observable<any> {
        return this.http.post('http://212.237.24.83:8080/dbapi/webresources/task', dto);
    }

    removeTask(id: string): Observable<any> {
        return this.http.delete('http://212.237.24.83:8080/dbapi/webresources/task/' + id);
    }


    getProbes(): Observable<Probe[]> {
        return this.http.get('http://212.237.24.83:8080/dbapi/webresources/probe')
            .map(res => res.json());
    }

    addProbe(dto: Probe): Observable<any> {
        return this.http.post('http://212.237.24.83:8080/dbapi/webresources/probe', dto);
    }

    removeProbe(id: string): Observable<any> {
        return this.http.delete('http://212.237.24.83:8080/dbapi/webresources/probe/' + id);
    }

    editProbeName(probe: Probe): Observable<any> {
        return this.http.put(`http://212.237.24.83:8080/dbapi/webresources/probe/${probe.id}`, probe);
    }


    getIpRanges(): Observable<IpRange[]> {
        return this.http.get('http://212.237.24.83:8080/dbapi/webresources/iprange')
            .map(res => res.json());
    }

    addIpRangeToProbe(probeId: string, ipRangeDto: IpRange): Observable<any> {
        return this.http.put(`http://212.237.24.83:8080/dbapi/webresources/probe/${probeId}/addiprange`, ipRangeDto);
    }

    addIpRange(dto: Task): Observable<any> {
        return this.http.post('http://212.237.24.83:8080/dbapi/webresources/iprange', dto);
    }

    removeIpRange(id: string): Observable<any> {
        return this.http.delete('http://212.237.24.83:8080/dbapi/webresources/iprange/' + id);
    }
}
