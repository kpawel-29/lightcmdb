import {Component, OnInit} from '@angular/core';
import {Task} from '../../model/Task';
import {DiscoveryService} from '../discovery.service';
declare var $: any;

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {

    public tasks: Task[] = [];
    public newTask = new Task();

    public title = '';
    public modalMode = 'create';

    constructor(private discoveryService: DiscoveryService) {
    }

    ngOnInit() {
        this.initTasks();
    }

    initTasks() {
        this.discoveryService.getTasks().subscribe(
            next => this.tasks = next,
            err => alert('błąd podczas pobierania danych')
        );
    }

    openModal() {
        this.modalMode = 'create';
        this.title = 'Stwórz task';
        $('#task-modal').modal('show', {});
    }

    openEditModal(task: Task) {
        this.newTask = task;
        this.modalMode = 'edit';
        this.title = 'Edytuj dane taska';
        $('#task-modal').modal('show', {});
    }

    addTask() {
        this.discoveryService.addTask(this.newTask).subscribe(next => {
            alert('ok');
            this.initTasks();
        }, err => alert('err'));
    }

    editTask() {
        this.discoveryService.editTask(this.newTask).subscribe(next => {
            alert('ok');
            this.initTasks();
        }, err => alert('err'));
    }

    removeTask(id: string) {
        this.discoveryService.removeTask(id).subscribe(
            next => {
                alert('usunięto taska');
                this.initTasks();
            },
            err => alert('błąd podczas usuwania taska')
        );
    }
}