import {Component, OnInit} from '@angular/core';
import {IpRange} from '../../model/IpRange';
import {Probe} from '../../model/Probe';
import {DiscoveryService} from '../discovery.service';

declare var $: any;

@Component({
    selector: 'app-iprange',
    templateUrl: './iprange.component.html'
})
export class IprangeComponent implements OnInit {

    public ipranges: IpRange[] = [];
    public probes: Probe[] = [];
    public newIprange = new IpRange();
    public dtoIprange = new IpRange();

    public selectedProbeId: string;

    constructor(private discoveryService: DiscoveryService) {
    }

    ngOnInit() {
        this.initIpranges();
        this.discoveryService.getProbes().subscribe(
            next => this.probes = next,
            err => alert('błąd podczas pobierania dancyh probów')
        );
    }

    initIpranges() {
        this.discoveryService.getIpRanges().subscribe(
            next => this.ipranges = next,
            err => alert('błąd podczas pobierania dancyh')
        );
    }


    openCreateModal() {
        $('#create-modal').modal('show', {});
    }

    openEditIpRangeModal(ipRange: IpRange) {
        this.dtoIprange = ipRange;
        $('#edit-iprange-modal').modal('show', {});
    }

    createIprange() {
        this.discoveryService.createIpRange(this.newIprange, this.selectedProbeId).subscribe(
            next => {
                alert('ok');
                this.initIpranges();
            },
            err => alert('błąd podczas tworzenia iprangea')
        );
    }

    removeIpRange(id: string) {
        this.discoveryService.removeIpRange(id).subscribe(
            next => {
                alert('usunięto iprangea');
                this.initIpranges();
            },
            err => alert('błąd podczas usuwania iprangea')
        );
    }

    editIpRange() {
        this.discoveryService.editIpRange(this.dtoIprange).subscribe(next => {
            alert('ok');
            this.initIpranges();
        }, err => alert('err'));
    }

    probeSelected(event: any, value: any) {
        this.selectedProbeId = value;
    }
}
