import {Component, OnInit} from '@angular/core';
import {CiTypeService} from '../../ci-type-manager/ci-type.service';
import {DiscoveryService} from '../../discovery/discovery.service';
import {Attribute} from '../../model/Attribute';
import {CIType} from '../../model/CIType';
import {NewMappingDto} from '../../model/discovery/NewMappingDto';
import {Task} from '../../model/Task';


@Component({
    selector: 'app-mapping-form',
    templateUrl: './mapping-form.component.html',
    styleUrls: ['./mapping-form.component.css']
})
export class MappingFormComponent implements OnInit {
    citypes: CIType[];
    attributes: Attribute[];
    tasks: Task[];
    newMapping = new NewMappingDto();
    addTask = false;
    newTask = null;


    constructor(private discoveryService: DiscoveryService,
                private ciTypeService: CiTypeService) {
    }

    ngOnInit() {
        this.getCiTypes();
        // this.getAttributes();
        this.getTasks();
    }

    private getCiTypes() {
        this.ciTypeService.ciTypes().subscribe(
            next => {
                this.citypes = next;
            },
            err => alert('błąd podczas pobierania citypes')
        );
    }

    // private getAttributes() {
    //     this.ciTypeService.attributes().subscribe(
    //         next => this.attributes = next,
    //         err => alert('błąd podczas pobierania attributes')
    //     );
    // }

    private getTasks() {
        this.discoveryService.getTasks().subscribe(
            next => this.tasks = next,
            err => alert('błąd podczas pobierania tasks')
        );
    }

    openCreateTask() {
        this.newTask = new Task();
        this.addTask = !this.addTask;
    }

    createNewTask() {
        this.discoveryService.addTask(this.newTask).subscribe(
            next => {
                this.getTasks();
            },
            err => alert('err')
        );
    }

    addMapping() {
        this.discoveryService.addMapping(this.newMapping).subscribe(
            next => alert('ok'),
            err => alert('err')
        );
    }

    attributesFilter(attributes: Attribute[]): Attribute[] {
        return attributes;
    }

    tasksFilter(tasks: Task[]): Task[] {
        return tasks;
    }

    ciTypeSelected(event: any, value: any) {
        this.newMapping.ciTypeID = value;
        const selectedCiType = this.citypes.find(item => item.id === value);
        this.attributes = selectedCiType.attributesCollection;
    }

    attributeSelected(event: any, value: any) {
        this.newMapping.attributeID = value;
    }

    taskSelected(event: any, value: any) {
        this.newMapping.taskID = value;
    }
}
