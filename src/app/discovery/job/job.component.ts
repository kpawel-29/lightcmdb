import {Component, OnInit} from '@angular/core';
import {Job} from '../../model/Job';
import {Mapping} from '../../model/Mapping';
import {DiscoveryService} from '../discovery.service';

declare var $: any;

@Component({
    selector: 'app-job',
    templateUrl: './job.component.html'
})
export class JobComponent implements OnInit {

    public jobs: Job[] = [];
    public newJob = new Job();
    public selectedJobId: string;
    public selectedMappingId: string;
    public mappings: Mapping[] = [];
    public title = '';
    public modalMode = 'create';

    constructor(private discoveryService: DiscoveryService) {
    }

    ngOnInit() {
        this.initJobs();
        this.initMapping();
    }

    initJobs() {
        this.discoveryService.getJobs().subscribe(
            next => this.jobs = next,
            err => alert('błąd podczas pobierania dancyh')
        );
    }

    initMapping() {
        this.discoveryService.getMapping().subscribe(
            next => this.mappings = next,
            err => alert('błąd podczas pobierania dancyh')
        );
    }

    openModal() {
        this.title = 'Stwórz joba';
        this.modalMode = 'create';
        $('#job-modal').modal('show', {});
    }

    openEditModal(job: Job) {
        this.title = 'Edytuj joba';
        this.modalMode = 'edit';
        this.newJob = job;
        $('#job-modal').modal('show', {});
    }

    addJob() {
        this.discoveryService.addJob(this.newJob).subscribe(next => {
            alert('ok');
            this.initJobs();
        }, err => alert('err'));
    }

    editJob() {
        this.discoveryService.editJob(this.newJob).subscribe(next => {
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

    openMappingToJobModal(id: string) {
        this.selectedJobId = id;
        $('#job-mapping-modal').modal('show', {});
    }

    mappingSelected(event: any, value: any) {
        this.selectedMappingId = value;
    }


    addMappingToJob() {
        this.discoveryService.addMappingToJob(this.selectedJobId, this.selectedMappingId)
            .subscribe(
                next => {
                    this.initJobs();
                    alert('ok');
                }, err => alert('err')
            );
    }
}
