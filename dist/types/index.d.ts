export { compareObjectsBasedOn } from './compareObjectsBasedOn';
export { compareObjectArraysBasedOn } from './compareObjectArraysBasedOn';
export declare function compareObjectProps(...params: Record<string, any>[]): {
    props: string[];
    presentInAll: {
        [key in string]: boolean;
    };
    perProp: {
        [key in string]: Record<string, any>;
    };
    presentIn: {
        [key in string]: number[];
    };
};
export declare function compareArrays(...params: any[][]): {
    values: any[];
    infoPerValue: {
        [key in string]: {
            indexPerArray: (number | undefined)[];
            presentInAll: boolean;
        };
    };
    presentInAll: string[];
};
