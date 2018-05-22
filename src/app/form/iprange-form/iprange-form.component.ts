import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DiscoveryService} from '../../discovery/discovery.service';
import {IpRange} from '../../model/IpRange';

@Component({
    selector: 'app-iprange-form',
    templateUrl: './iprange-form.component.html'
})
export class IprangeFormComponent implements OnInit {

    @Input() probeId: string;
    @Output() added = new EventEmitter<any>();
    public ipRangeDto = new IpRange();

    constructor(private discoveryService: DiscoveryService) {
    }

    ngOnInit() {
        this.initIpRanges();

    }

    initIpRanges() {
    }

    addIpRangeToProbe() {
        this.discoveryService.addIpRangeToProbe(this.probeId, this.ipRangeDto)
            .subscribe(next => {
                alert('ok');
                this.added.emit(true);
            }, err => alert('err'));
    }
}
