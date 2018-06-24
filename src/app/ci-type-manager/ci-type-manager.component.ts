import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {TreeModel} from 'ng2-tree';
// import {OrderDownlineTreeviewEventParser, TreeviewComponent, TreeviewEventParser, TreeviewItem} from 'ngx-treeview';
import {CIType} from '../model/CIType';
import {CiTypeService} from "./ci-type.service";

declare var $: any;

@Component({
    selector: 'app-ci-type-manager',
    templateUrl: './ci-type-manager.component.html',
    styleUrls: ['./ci-type-manager.component.css'],
    // providers: [
    //     {provide: TreeviewEventParser, useClass: OrderDownlineTreeviewEventParser}
    // ]
})
export class CiTypeManagerComponent implements OnInit {

    public citypes: CIType[] = [];
    public types: string[] = [];

    selected = new CIType();
    createURI = 'http://212.237.24.83:8080/dbapi/webresources/citype';
    modalTitle = 'Utwórz nowy CI';
    // rootID: string;
    // items: TreeviewItem[] = [];
    // config = {
    //     hasAllCheckBox: false,
    //     hasFilter: false,
    //     hasCollapseExpand: false,
    //     decoupleChildFromParent: true,
    //     maxHeight: 500
    // };

    public tree: TreeModel;

    modalMode = 'createCI';

    // @ViewChild(TreeviewComponent) tree: TreeviewComponent;

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

    getChildren(id: string): TreeModel[] {
        const types = this.citypes.filter(ci => ci.fatherID && ci.fatherID.id === id);
        const result = [];
        types.forEach(item => {
            result.push({id: item.id, value: item.name});
        });
        return result;
    }

    handleSelected(event: any) {
        if (!event.node.node.id) {
            return;
        }
        this.selected = this.citypes.find(ci => ci.id === event.node.node.id);
    }

    getRoot(): CIType {
        return this.citypes.find(ci => !ci.fatherID);
    }

    buildTree() {
        const root = this.getRoot();

        this.tree = {
            value: root.name,
            id: root.id,
            children: this.getChildren(root.id)
        };

    }
}
