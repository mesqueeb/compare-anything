import { ComparisonObjects } from './compareObjectsBasedOn';
export declare type ComparisonObjectArrays<ObjectType> = {
    perIndex: ComparisonObjects<ObjectType>[];
    equal: boolean;
};
export declare function compareObjectArraysBasedOn<ObjectType extends Record<string, any> | any = Record<string, any>>(propKeys: (keyof ObjectType)[], objectArrays: [[ObjectType, ...any[]], ...any[]]): ComparisonObjectArrays<ObjectType>;
