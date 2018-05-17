import {Component, OnInit} from '@angular/core';
import {Job} from '../../model/Job';
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

    // multiselect
    selectedItems = [];
    itemList = [];
    settings = {};


    constructor(private discoveryService: DiscoveryService) {
    }

    ngOnInit() {
        this.initScheduler();

        // multiselect
        this.settings = {
            text: 'Wybierz joba',
            selectAllText: 'Zaznacz wszystkie',
            unSelectAllText: 'Odznacz wszystkie',
            classes: 'myclass custom-class',
            enableSearchFilter: true,
            selectionLimit: 1,
            autoUnselect: true,
            displayAllSelectedText: true,
            showCheckAll: false,
            showUncheckAll: false
        };
    }

    initScheduler() {
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
                this.parseAttributesToMultiselect(next);
            },
            err => alert('błąd podczas pobierania dancyh jobów')
        );
    }

    openModal() {
        // this.newScheduler.job = null;
        this.newScheduler.status = 'inactive';

        $('#scheduler-modal').modal('show', {});
    }

    openJobModal(id: string) {
        this.selectedSchedulerId = id;
        $('#scheduler-job-modal').modal('show', {});
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
        this.discoveryService.addScheduler(this.newScheduler).subscribe(next => {
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

    addJobToScheduler(id: string) {
        this.addJobToSchedulerDto.id = this.selectedSchedulerId;
        this.addJobToSchedulerDto.jobid = this.selectedItems[0].id;
        this.discoveryService.addJobToScheduler(this.addJobToSchedulerDto).subscribe(next => {
            alert('ok');
            this.initScheduler();
        }, err => alert('err'));
    }

// multiselect
    onItemSelect(item: any) {
        console.log(this.selectedItems);
    }

    OnItemDeSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
    }

    onSelectAll(items: any) {
        console.log(items);
    }

    onDeSelectAll(items: any) {
        console.log(items);
    }

    private parseAttributesToMultiselect(attributes): void {
        attributes.forEach(attr => {
            this.itemList.push({
                id: attr.id,
                itemName: attr.name
            });
        });
    }
}

export class AddJobToSchedulerDto {
    id: string;
    jobid: string;
}
