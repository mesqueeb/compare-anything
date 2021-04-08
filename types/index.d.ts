export { compareObjectsBasedOn } from './compareObjectsBasedOn';
export { compareObjectArraysBasedOn } from './compareObjectArraysBasedOn';
export declare function compareObjectProps(...params: Record<string, any>[]): {
    props: string[];
    presentInAll: {
        [prop: string]: boolean;
    };
    perProp: {
        [prop: string]: Record<string, any>;
    };
    presentIn: {
        [prop: string]: number[];
    };
};
export declare function compareArrays(...params: any[][]): {
    values: any[];
    infoPerValue: {
        [prop: string]: {
            indexPerArray: (number | undefined)[];
            presentInAll: boolean;
        };
    };
    presentInAll: any[];
};
