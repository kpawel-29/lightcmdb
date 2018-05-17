import {Component, OnInit} from '@angular/core';
import {CIType} from "../model/CIType";
import {CI_TYPES} from "../mock/citypes";
import {Connection} from "../model/Connection";
import {CONNECTIONS} from "../mock/connections";

declare var $: any;
declare var vis: any;

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    private configurations: CIType[] = [];
    private connections: Connection[] = [];
    selectedCI: CIType = null;
    searchQuery: string;
    searchResult: CIType[] = [];

    inputDto = 'web';
    searchType = 'name'; // dostepne: nazwa, opis, typ

    constructor() {
        // this.configurations = CI_TYPES;
        // this.connections = CONNECTIONS;
    }

    ngOnInit() {
        // this.search();
    }

    search() {
        this.filterResults(this.inputDto, this.searchType);
    }

    private filterResults(text: string, type: string) {
        this.searchResult = this.configurations.filter(item => {
            if (type === 'name') {
                return item.name.indexOf(text);
            }

            if (type === 'description') {
                return item.description.indexOf(text);
            }

            if (type === 'type') {
                return item.type.indexOf(text);
            }
            return false;
        });
    }

    private initializeNetwork() {

        var nodes = new vis.DataSet(this.getNodes(this.selectedCI.id));

        // create an array with edges
        var edges = new vis.DataSet(this.getEdges(this.selectedCI.id));

        // create a network
        var container = document.getElementById('mynetwork');

        // provide the data in the vis format
        var data = {
            nodes: nodes,
            edges: edges
        };
        var options = {};

        // initialize your network!
        var network = new vis.Network(container, data, options);
    }

    private getNodes(id) {
        const result = [];
        const edges = this.getEdges(id);
        edges.forEach(edge => {
            result.push({
                id: edge.from,
                label: this.configurations.find(item => item.id === edge.from).display_name
            });
        });

        return result;
    }

    private getEdges(id) {
        const result = [];
        this.connections.forEach(connection => {
            if (connection.from === id || connection.to === id) {
                result.push(connection);
            }
        });

        return result;
    }

    selectCI(result: CIType) {
        this.selectedCI = result;
        this.initializeNetwork();
    }
}
