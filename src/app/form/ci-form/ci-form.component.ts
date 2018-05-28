import {Component, Input, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {CiTypeService} from "../../ci-type-manager/ci-type.service";


@Component({
    selector: 'app-ci-form',
    templateUrl: './ci-form.component.html',
    styleUrls: ['./ci-form.component.css']
})
export class CiFormComponent implements OnInit {
    itemList = [];
    selectedItems = [];
    settings = {};
    addAttribute = false;

    newAttribute: Attribute;
    newCI = new CiDTO();

    attributes: Attribute[] = [];

    @Input()
    title: string;

    @Input()
    createURI: string;

    @Input()
    headerColor: string;

    constructor(private ciTypeService: CiTypeService,
                private http: Http) {
    }

    ngOnInit() {
        this.getAttributes();

        this.settings = {
            text: 'Wybierz atrybuty',
            selectAllText: 'Zaznacz wszystkie',
            unSelectAllText: 'Odznacz wszystkie',
            classes: 'myclass custom-class',
            enableSearchFilter: true
        };
    }

    private getAttributes() {
        this.http.get('http://212.237.24.83:8080/dbapi/webresources/attributes')
            .map(r => r.json())
            .subscribe((ok: Attribute[]) => this.parseAttributesToMultiselect(ok), err => console.log(err));
    }

    private parseAttributesToMultiselect(attributes: Attribute[]): void {
        this.attributes = attributes;
        attributes.forEach(attr => {
            this.itemList.push({
                id: attr.id,
                itemName: attr.name
            });
        });
    }

// {
//     "description":"desc",
//     "id":0,
//     "name":"name",
//     "viewName":"viewname"
// }
//
// {
//     "description":"desc2"
//     ,"id":1,
//     "name":"name2",
//     "viewName":"viewname2"
// }

    onItemSelect(item: any) {
        console.log(this.selectedItems);
    }

    OnItemDeSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
    }

    onSelectAll(items: any) {
        console.log(items);
    }

    onDeSelectAll(items: any) {
        console.log(items);
    }

    openCreateAttribute() {
        this.newAttribute = new Attribute();
        this.addAttribute = !this.addAttribute;
    }

    createNewAttribute() {
        this.http.post('http://212.237.24.83:8080/dbapi/webresources/attributes', this.newAttribute)
            .subscribe(ok => console.log(ok), err => console.log(err), () => {
                this.addAttribute = false;
                this.getAttributes();
            });

    }

    createCi() {
        this.selectedItems.forEach(item => {
            const attribute = this.attributes.find(a => a.id === item.id);
            this.newCI.attributesCollection.push(attribute);
        });

        this.http.post(this.createURI, this.newCI)
            .subscribe(ok => {
                alert('dodano');
                this.ciTypeService.change(true);
            }, err => alert('err'));
    }
}

export class Attribute {
    id: number;
    name: string;
    viewName: string;
    description: string;

    constructor() {
        this.id = Math.floor(Math.random() * 100000);
    }
}

export class CiDTO {
    id: number;
    name: string;
    description: string;
    viewName: string;
    attributesCollection: Attribute[];

    constructor() {
        this.id = Math.floor(Math.random() * 100000);
        this.attributesCollection = [];
    }
}
