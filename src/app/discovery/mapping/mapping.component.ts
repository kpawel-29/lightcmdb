import {Component, OnInit} from '@angular/core';
import {Mapping} from '../../model/Mapping';
import {DiscoveryService} from '../discovery.service';

declare var $: any;

@Component({
    selector: 'app-mapping',
    templateUrl: './mapping.component.html'
})
export class MappingComponent implements OnInit {

    public mappings: Mapping[] = [];

    constructor(private discoveryService: DiscoveryService) {
    }

    ngOnInit() {
        this.initMapping();
    }

    initMapping() {
        this.discoveryService.getMapping().subscribe(
            next => this.mappings = next,
            err => alert('błąd podczas pobierania dancyh')
        );
    }

    openModal() {
        $('#mapping-modal').modal('show', {});
    }

    removeMapping(id: string) {
        this.discoveryService.removeMapping(id).subscribe(next => {
            alert('ok');
            this.initMapping();
        }, err => alert('err'));
    }
}
