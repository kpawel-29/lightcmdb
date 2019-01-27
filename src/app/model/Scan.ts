export interface Scan {
    scanhistories: ScanHistory[];
}

export interface ScanHistory {
    dataname: string;
    datatype: string;
    id: string;
    recorddate: string;
    value: string;
}
