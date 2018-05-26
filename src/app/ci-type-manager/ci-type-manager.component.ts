import {Component, OnInit} from '@angular/core';
import {CI} from "../model/CI";
import {Http} from "@angular/http";
import {CiTypeService} from "./ci-type.service";
import {Attribute} from "../form/ci-form/ci-form.component";

declare var $: any;

@Component({
    selector: 'app-ci-type-manager',
    templateUrl: './ci-type-manager.component.html',
    styleUrls: ['./ci-type-manager.component.css']
})
export class CiTypeManagerComponent implements OnInit {

    private citypes: CI[] = null;
    private allcitypes: CI[] = null;

    private types: string[] = [];

    selected = '';
    CIAttributes: Attribute[] = [];
    createURI = 'http://212.237.24.83:8080/dbapi/webresources/citype';
    modalTitle = 'Utwórz nowy CI';

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
                    }, 10);
                });
        } else {
            this.CIAttributes = [];
        }
    }

    openModal() {
        $('#modal-ci-form').modal('show', {});
    }
}
