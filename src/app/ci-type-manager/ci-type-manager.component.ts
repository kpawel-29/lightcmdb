import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {TreeviewItem} from 'ngx-treeview';
import {CIType} from '../model/CIType';
import {CiTypeService} from "./ci-type.service";

declare var $: any;

@Component({
    selector: 'app-ci-type-manager',
    templateUrl: './ci-type-manager.component.html',
    styleUrls: ['./ci-type-manager.component.css']
})
export class CiTypeManagerComponent implements OnInit {

    public citypes: CIType[] = [];
    public types: string[] = [];

    selected = new CIType();
    createURI = 'http://212.237.24.83:8080/dbapi/webresources/citype';
    modalTitle = 'Utwórz nowy CI';
    items: TreeviewItem[] = [];
    config = {
        hasAllCheckBox: false,
        hasFilter: false,
        hasCollapseExpand: false,
        decoupleChildFromParent: true,
        maxHeight: 500
    };

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
                    this.buildTree();
                },
                err => alert('błąd podczas pobierania listy typów CI'));
    }

    buildTree() {
        const root = this.getRoot();
        this.items.push(new TreeviewItem({
            text: root.name, value: root.id, children: this.getChildren(root.id), checked: false
        }));
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

    getRoot(): CIType {
        return this.citypes.find(ci => !ci.fatherID);
    }

    getChildren(id: string) {
        const types = this.citypes.filter(ci => ci.fatherID && ci.fatherID.id === id);
        const result = [];
        types.forEach(item => result.push({text: item.name, value: item.id, checked: false}));
        return result;
    }

    onSelectedChange(items: any) {
        if (!items.length) {
            this.selected = new CIType();
            return;
        }
        this.selected = this.citypes.find(ci => ci.id === items[0]);

    }
}
