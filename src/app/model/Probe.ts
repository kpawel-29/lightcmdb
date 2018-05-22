import {IpRange} from './IpRange';
import {Scheduler} from './Scheduler';

export class Probe {
    id: string;
    name: string;
    iprange: IpRange[];
    scheduler: Scheduler[];
}
