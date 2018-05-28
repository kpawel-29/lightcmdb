import {Attribute} from './Attribute';
import {CI} from "./CI";

export class CIType {
    id: string;
    parentId: any;
    attributesCollection?: Attribute[];
    fatherID: CIType;
    display_name?: string;
    name: string;
    description?: string;
}
