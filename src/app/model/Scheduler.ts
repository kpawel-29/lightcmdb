import {Job} from './Job';

export class Scheduler {
    id: string;
    name: string;
    description: string;
    execution: string;
    interval: string;
    job: Job;
    status: string;
}
