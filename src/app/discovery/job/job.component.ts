import {Component, OnInit} from '@angular/core';
import {Job} from '../../model/Job';
import {DiscoveryService} from '../discovery.service';
declare var $: any;

@Component({
    selector: 'app-job',
    templateUrl: './job.component.html'
})
export class JobComponent implements OnInit {

    public jobs: Job[] = [];
    public newJob = new Job();

    constructor(private discoveryService: DiscoveryService) {
    }

    ngOnInit() {
        this.initJobs();
    }

    initJobs() {
        this.discoveryService.getJobs().subscribe(
            next => this.jobs = next,
            err => alert('błąd podczas pobierania dancyh')
        );
    }

    openModal() {
        $('#job-modal').modal('show', {});
    }

    addJob() {
        this.discoveryService.addJob(this.newJob).subscribe(next => {
            alert('ok');
            this.initJobs();
        }, err => alert('err'));
    }

    removeJob(id: string) {
        this.discoveryService.removeJob(id).subscribe(
            next => {
                alert('usunięto joba');
                this.initJobs();
            },
            err => alert('błąd podczas usuwania joba')
        );
    }
}