import {CI} from "./CI";
import {CIType} from "./CIType";

export class Configuration {
    id: number;
    name: string;
    type?: string;
    components: CIType[];
}
