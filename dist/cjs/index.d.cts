type ComparisonObjects<ObjectType> = {
    differentProps: (keyof ObjectType)[];
    differentPropsPicked: Partial<ObjectType>[];
    equal: boolean;
};
declare function compareObjectsBasedOn<ObjectType extends Record<string, any> | any = Record<string, any>>(propKeys: (keyof ObjectType)[], objects: [ObjectType, ...any[]]): ComparisonObjects<ObjectType>;

type ComparisonObjectArrays<ObjectType> = {
    perIndex: ComparisonObjects<ObjectType>[];
    equal: boolean;
};
declare function compareObjectArraysBasedOn<ObjectType extends Record<string, any> | any = Record<string, any>>(propKeys: (keyof ObjectType)[], objectArrays: [[ObjectType, ...any[]], ...any[]]): ComparisonObjectArrays<ObjectType>;

declare function compareObjectProps(...params: Record<string, any>[]): {
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
declare function compareArrays(...params: any[][]): {
    values: any[];
    infoPerValue: {
        [key in string]: {
            indexPerArray: (number | undefined)[];
            presentInAll: boolean;
        };
    };
    presentInAll: string[];
};

export { compareArrays, compareObjectArraysBasedOn, compareObjectProps, compareObjectsBasedOn };
