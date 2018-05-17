import {Attribute} from './Attribute';
import {CI} from "./CI";

export class CIType {
    id: number;
    parentId: any;
    attributesCollection?: Attribute[];
    display_name?: string;
    name: string;
    type?: string;
    description?: string;
    default?: string;
    visiblity?: boolean;
    editable?: boolean;
    components?: CIType[];
    items?: CI[];
}
