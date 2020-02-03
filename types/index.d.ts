declare type plainObject = {
    [key: string]: any;
};
export declare function compareObjectProps(...params: plainObject[]): {
    props: string[];
    presentInAll: {
        [prop: string]: boolean;
    };
    perProp: {
        [prop: string]: plainObject;
    };
    presentIn: {
        [prop: string]: number[];
    };
};
export declare function compareArrays(...params: any[][]): {
    values: any[];
    presentInAll: {
        [prop: string]: boolean;
    };
    perValue: {
        [prop: string]: plainObject;
    };
    presentIn: {
        [prop: string]: number[];
    };
};
export {};
