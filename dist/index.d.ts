export { compareObjectArraysBasedOn } from './compareObjectArraysBasedOn.js';
export { compareObjectsBasedOn } from './compareObjectsBasedOn.js';
export declare function compareObjectProps(...params: {
    [key in string]: any;
}[]): {
    props: string[];
    presentInAll: {
        [key in string]: boolean;
    };
    perProp: {
        [key in string]: {
            [key in string]: any;
        };
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
