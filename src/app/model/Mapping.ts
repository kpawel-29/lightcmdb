import {Attribute} from './Attribute';
import {Task} from './Task';

export class Mapping {
    id: string;
    ciTypeID: string;
    task: Task;
    attribute: Attribute;
}
