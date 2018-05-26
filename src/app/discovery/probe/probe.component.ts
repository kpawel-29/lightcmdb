import {Component, OnInit} from '@angular/core';
import {IpRange} from '../../model/IpRange';
import {Probe} from '../../model/Probe';
import {DiscoveryService} from '../discovery.service';

declare var $: any;

@Component({
    selector: 'app-probe',
    templateUrl: './probe.component.html'
})
export class ProbeComponent implements OnInit {

    public probes: Probe[] = [];
    public newProbe = new Probe();
    public dtoIprange = new IpRange();

    public selectedProbeId: string;

    constructor(private discoveryService: DiscoveryService) {
    }

    ngOnInit() {
        this.initProbes();
    }

    initProbes() {
        this.discoveryService.getProbes().subscribe(
            next => this.probes = next,
            err => alert('błąd podczas pobierania dancyh')
        );
    }


    openModal() {
        $('#probe-modal').modal('show', {});
    }

    openEditModal(probe: Probe) {
        this.newProbe.id = probe.id;
        this.newProbe.name = probe.name;
        $('#edit-probe-modal').modal('show', {});
    }

    openEditIpRangeModal(ipRange: IpRange) {
        this.dtoIprange = ipRange;
        $('#edit-iprange-modal').modal('show', {});
    }

    openIpRangeModal(id: string) {
        this.selectedProbeId = id;
        $('#iprange-modal').modal('show', {});
    }

    addProbe() {
        this.discoveryService.addProbe(this.newProbe).subscribe(next => {
            alert('ok');
            this.initProbes();
        }, err => alert('err'));
    }

    removeProbe(id: string) {
        this.discoveryService.removeProbe(id).subscribe(
            next => {
                alert('usunięto probea');
                this.initProbes();
            },
            err => alert('błąd podczas usuwania probea')
        );
    }

    removeIpRange(id: string) {
        this.discoveryService.removeIpRange(id).subscribe(
            next => {
                alert('usunięto ip range');
                this.initProbes();
            },
            err => alert('błąd podczas usuwania ip range')
        );
    }

    editProbeName() {
        this.discoveryService.editProbeName(this.newProbe).subscribe(next => {
            alert('ok');
            this.initProbes();
        }, err => alert('err'));
    }

    editIpRange() {
        this.discoveryService.editIpRange(this.dtoIprange).subscribe(next => {
            alert('ok');
            this.initProbes();
        }, err => alert('err'));
    }

}