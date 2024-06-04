import { ComparisonObjects } from './compareObjectsBasedOn.js';
export type ComparisonObjectArrays<ObjectType> = {
    perIndex: ComparisonObjects<ObjectType>[];
    equal: boolean;
};
export declare function compareObjectArraysBasedOn<ObjectType extends {
    [key in string]: any;
} | any = {
    [key in string]: any;
}>(propKeys: (keyof ObjectType)[], objectArrays: [[ObjectType, ...any[]], ...any[]]): ComparisonObjectArrays<ObjectType>;
