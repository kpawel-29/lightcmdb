import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {Attribute} from "../form/ci-form/ci-form.component";
import {CI} from "../model/CI";
import {CIType} from '../model/CIType';
import {CiTypeService} from "./ci-type.service";

declare var $: any;

@Component({
    selector: 'app-ci-type-manager',
    templateUrl: './ci-type-manager.component.html',
    styleUrls: ['./ci-type-manager.component.css']
})
export class CiTypeManagerComponent implements OnInit {

    public citypes: CI[] = null;
    public types: string[] = [];

    selected = new CIType();
    createURI = 'http://212.237.24.83:8080/dbapi/webresources/citype';
    modalTitle = 'Utwórz nowy CI';

    constructor(private ciTypeService: CiTypeService,
                private http: Http) {
    }

    ngOnInit() {
        this.getCiTypes();
        this.ciTypeService.changed().subscribe(next => this.getCiTypes());
    }

    private getCiTypes() {
        this.ciTypeService.ciTypes()
            .subscribe(success => {
                    this.citypes = success;
                },
                err => alert('błąd podczas pobierania listy typów CI'));
    }

    changeSelected(citype: CIType) {
        this.selected = citype;
    }

    openModal() {
        $('#modal-ci-form').modal('show', {});
    }

    removeAttribute(id: string) {
        this.ciTypeService.removeAttribute(id)
            .subscribe(success => {
                    alert('ok');
                },
                err => alert('błąd podczas usuwania atrybutu'));
    }
}
