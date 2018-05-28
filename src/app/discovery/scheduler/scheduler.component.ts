import {Component, OnInit} from '@angular/core';
import {Job} from '../../model/Job';
import {Probe} from '../../model/Probe';
import {Scheduler} from '../../model/Scheduler';
import {DiscoveryService} from '../discovery.service';

declare var $: any;

@Component({
    selector: 'app-scheduler',
    templateUrl: './scheduler.component.html'
})
export class SchedulerComponent implements OnInit {

    public schedulers: Scheduler[] = [];
    public newScheduler = new Scheduler();
    public executionDate = '';
    public executionTime = '';
    public jobs: Job[];
    public selectedSchedulerId = '';
    public addJobToSchedulerDto = new AddJobToSchedulerDto();

    public probes: Probe[] = [];
    public selectedProbeId: string;

    public allSchedulers = false;

    public title = '';
    public modalMode = 'create';

    constructor(private discoveryService: DiscoveryService) {
    }

    ngOnInit() {
        this.initAllScheduler();
        this.initProbes();
    }

    initProbes() {
        this.discoveryService.getProbes().subscribe(
            next => this.probes = next,
            err => alert('błąd podczas pobierania dancyh')
        );
    }

    probeSelected($event: any, value: any) {
        if (value === 'Wybierz') {
            return;
        }
        this.schedulers = [];
        this.selectedProbeId = value;
        this.initScheduler();
    }

    initScheduler() {
        this.allSchedulers = false;
        this.discoveryService.getProbeSchedulers(this.selectedProbeId).subscribe(
            next => {
                this.initJobs();
                this.schedulers = next;
            },
            err => alert('błąd podczas pobierania dancyh')
        );
    }

    initAllScheduler() {
        this.allSchedulers = true;
        this.discoveryService.getSchedulers().subscribe(
            next => {
                this.initJobs();
                this.schedulers = next;
            },
            err => alert('błąd podczas pobierania dancyh')
        );
    }

    initJobs() {
        this.discoveryService.getJobs().subscribe(
            next => {
                this.jobs = next;
            },
            err => alert('błąd podczas pobierania dancyh jobów')
        );
    }

    openModal() {
        // this.newScheduler.job = null;
        this.newScheduler.status = 'active';
        this.title = 'Stwórz scheduler';
        this.modalMode = 'create';
        $('#scheduler-modal').modal('show', {});
    }

    openJobModal(id: string) {
        this.selectedSchedulerId = id;
        this.addJobToSchedulerDto.id = id;
        this.title = 'Przypisz joba do schedulera';
        $('#scheduler-job-modal').modal('show', {});
    }

    openEditSchedulerModal(scheduler: Scheduler) {
        this.selectedSchedulerId = scheduler.id;
        this.title = 'Edytuj parametry schedulera';
        this.modalMode = 'edit';
        this.newScheduler = scheduler;
        $('#scheduler-modal').modal('show', {});
    }

    addScheduler() {
        if (this.executionDate === '' || this.executionTime === '') {
            alert('nie wybrano daty lub czasu wywołania (execution)');
            return;
        }
        const date = this.executionDate.split('-'); //["2018", "04", "30"]
        const time = this.executionTime.split(':'); //["12", "04"]

        const execution = new Date(Date.UTC(+date[0], +date[1] - 1, +date[2], +time[0], +time[1]));
        this.newScheduler.execution = execution.toISOString();
        this.discoveryService.addScheduler(this.newScheduler, this.selectedProbeId).subscribe(next => {
            alert('ok');
            this.initScheduler();
        }, err => alert('err'));
    }

    editScheduler() {
        if (this.executionDate === '' || this.executionTime === '') {
            alert('nie wybrano daty lub czasu wywołania (execution)');
            return;
        }
        const date = this.executionDate.split('-'); //["2018", "04", "30"]
        const time = this.executionTime.split(':'); //["12", "04"]

        const execution = new Date(Date.UTC(+date[0], +date[1] - 1, +date[2], +time[0], +time[1]));
        this.newScheduler.execution = execution.toISOString();
        this.discoveryService.editScheduler(this.newScheduler, this.selectedProbeId).subscribe(next => {
            alert('ok');
            this.initScheduler();
        }, err => alert('err'));
    }

    removeScheduler(id: string) {
        this.discoveryService.removeScheduler(id).subscribe(next => {
            alert('ok');
            this.initScheduler();
        }, err => alert('err'));
    }

    jobSelected(event: any, value: any) {
        this.addJobToSchedulerDto.jobid = value;
    }

    addJobToScheduler(id: string) {
        this.discoveryService.addJobToScheduler(this.addJobToSchedulerDto).subscribe(next => {
            alert('ok');
            this.initScheduler();
        }, err => alert('err'));
    }
}

export class AddJobToSchedulerDto {
    id: string;
    jobid: string;
}
