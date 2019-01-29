import {Component, OnInit} from '@angular/core';
import {CiTypeService} from "../ci-type-manager/ci-type.service";
import {CIType} from '../model/CIType';
import {Relation} from '../model/Relation';
import {RelationDto} from '../model/RelationDto';

declare const $: any;
declare const vis: any;

@Component({
    selector: 'app-relations',
    templateUrl: './relations.component.html',
    styleUrls: ['./relations.component.css']
})
export class RelationsComponent implements OnInit {

    relations: Relation[];
    selected: Relation;

    createURI = 'http://212.237.24.83:8080/dbapi/webresources/relationshiptype';
    modalTitle = 'Utwórz nową relację';

    public newRelationDto = new RelationDto();
    private sourceID = null;
    private destinationID = null;

    public citypes: CIType[] = [];

    constructor(private ciTypeService: CiTypeService) {
    }

    ngOnInit() {
        this.getRelations();
    }

    private getRelations() {
        this.ciTypeService.relationTypes().subscribe(
            next => {
                this.relations = next;
                this.selected = next.length > 0 ? next[0] : null;
                this.initializeNetwork();
            }, err => {
                alert('błąd podczas pobierania listy relacji');
            });
        this.ciTypeService.ciTypes().subscribe(next => this.citypes = next);
    }

    openModal() {
        $('#modal-relation-form').modal('show', {});
    }

    private initializeNetwork() {

        const nodes = new vis.DataSet(this.getNodes());

        // create an array with edges
        const edges = new vis.DataSet(this.getEdges());

        // create a network
        const container = document.getElementById('mynetwork');

        // provide the data in the vis format
        const data = {
            nodes: nodes,
            edges: edges
        };
        const options = {};

        // initialize your network!
        setTimeout(() => {
            const network = new vis.Network(container, data, options);
        }, 250);
    }

    private getNodes() {
        return [
            {id: 1, label: this.selected.sourceID.name},
            {id: 2, label: this.selected.destinationID.name},
        ];
    }


    private getEdges() {
        return [
            {from: 1, to: 2, label: this.selected.type},
        ];
    }

    ciTypeSourceSelected(event: any, value: any) {
        this.sourceID = value;
    }
    ciTypeDestinationSelected(event: any, value: any) {
        this.destinationID = value;
    }

    createRelation() {
        this.ciTypeService.createRelationType(this.newRelationDto, this.sourceID, this.destinationID).subscribe(
            next => {
                alert('dodano');
                this.getRelations();
            }, err => {
                alert('Błąd podczas tworzenia typu relacji');
            }
        );
    }
}
