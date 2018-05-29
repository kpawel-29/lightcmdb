import {Component, OnInit, ViewChild} from '@angular/core';
import {Http} from "@angular/http";
import {OrderDownlineTreeviewEventParser, TreeviewComponent, TreeviewEventParser, TreeviewItem} from 'ngx-treeview';
import {CIType} from '../model/CIType';
import {CiTypeService} from "./ci-type.service";

declare var $: any;

@Component({
    selector: 'app-ci-type-manager',
    templateUrl: './ci-type-manager.component.html',
    styleUrls: ['./ci-type-manager.component.css'],
    providers: [
        {provide: TreeviewEventParser, useClass: OrderDownlineTreeviewEventParser}
    ]
})
export class CiTypeManagerComponent implements OnInit {

    public citypes: CIType[] = [];
    public types: string[] = [];

    selected = new CIType();
    createURI = 'http://212.237.24.83:8080/dbapi/webresources/citype';
    modalTitle = 'Utwórz nowy CI';
    rootID: string;
    items: TreeviewItem[] = [];
    config = {
        hasAllCheckBox: false,
        hasFilter: false,
        hasCollapseExpand: false,
        decoupleChildFromParent: true,
        maxHeight: 500
    };

    modalMode = 'createCI';
    @ViewChild(TreeviewComponent) tree: TreeviewComponent;

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
        this.items = [];
        const root = this.getRoot();
        this.rootID = root.id;
        this.items.push(new TreeviewItem({
            text: root.name, value: root.id, children: this.getChildren(root.id), checked: this.selected.id === root.id
        }));
    }

    // changeSelected(citype: CIType) {
    //     this.selected = citype;
    // }

    openModal() {
        this.modalMode = 'createCI';
        $('#modal-ci-form').modal('show', {});
    }

    openAddAttributeModal() {
        this.modalMode = 'addAttribute';
        $('#modal-ci-form').modal('show', {});
    }

    openEditCiTypeModal() {
        this.modalMode = 'createCI';
        $('#edit-citype-modal').modal('show', {});
    }

    removeAttribute(id: string) {
        this.ciTypeService.removeAttribute(id)
            .subscribe(success => {
                    this.getCiTypes();
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
        types.forEach(item => result.push({text: item.name, value: item.id, checked: this.selected.id === item.id}));
        return result;
    }

    onSelectedChange(items: any[]) {
        if (!items.length) {
            return;
        }
        this.selected = this.citypes.find(ci => ci.id === items[items.length - 1].item.value);
        setTimeout(() => {
            this.buildTree();
        }, 200);
    }

    deleteCiType(id: string) {
        this.ciTypeService.removeCiType(id)
            .subscribe(success => {
                    this.getCiTypes();
                    alert('ok');
                },
                err => alert('błąd podczas usuwania citype'));
    }

    updateCiType() {
        this.ciTypeService.updateCiType(this.selected)
            .subscribe(success => {
                    this.getCiTypes();
                    alert('ok');
                },
                err => alert('błąd podczas aktualizacji danych citype'));
    }
}
