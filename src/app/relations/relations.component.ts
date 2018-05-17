import { Component, OnInit } from '@angular/core';
import {Attribute} from "../form/ci-form/ci-form.component";
import {Http} from "@angular/http";
import {CiTypeService} from "../ci-type-manager/ci-type.service";
import {CI} from "../model/CI";

declare var $: any;

@Component({
  selector: 'app-relations',
  templateUrl: './relations.component.html',
  styleUrls: ['./relations.component.css']
})
export class RelationsComponent implements OnInit {

    private citypes: CI[] = null;
    private allcitypes: CI[] = null;

    private types: string[] = [];

    selected = '';

    CIAttributes: Attribute[] = [];
    createURI = 'http://212.237.24.83:8080/dbapi/webresources/relationship';
    modalTitle = 'Utwórz nową relację';

    constructor(private ciTypeService: CiTypeService,
                private http: Http) {
    }

    ngOnInit() {
        this.getCiTypes();
        this.ciTypeService.changed().subscribe(next => this.getCiTypes());

        this.selected = '';
    }

    private getCiTypes() {
        this.http.get(this.createURI)
            .map(r => r.json())
            .subscribe(success => {
                this.citypes = success;
                this.allcitypes = success;
                this.displayTree();

            }, err => alert('błąd podczas pobierania listy typów CI'));
    }

    private displayTree() {
        this.citypes.forEach(item => {
            if (this.types.indexOf(item.name) === -1) {
                this.types.push(item.name);
            }
        });
    }

    changeSelected(type: string) {
        this.selected = type;
        this.CIAttributes = [];
        if (this.selected !== '') {
            this.http.get('http://212.237.24.83:8080/dbapi/webresources/attributes').map(r => r.json())
                .subscribe(ok => {
                    setTimeout(() => {
                        this.CIAttributes = ok;
                    }, 150);
                });
        } else {
            this.CIAttributes = [];
        }
    }

    openModal() {
        $('#modal-relation-form').modal('show', {});
    }

}
