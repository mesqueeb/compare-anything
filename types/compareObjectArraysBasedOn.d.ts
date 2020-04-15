import { ComparisonObjects } from './compareObjectsBasedOn';
import { PlainObject } from './types';
export declare type ComparisonObjectArrays<ObjectType> = {
    perIndex: ComparisonObjects<ObjectType>[];
    equal: boolean;
};
export declare function compareObjectArraysBasedOn<ObjectType extends PlainObject | any = PlainObject>(propKeys: (keyof ObjectType)[], objectArrays: [[ObjectType, ...any[]], ...any[]]): ComparisonObjectArrays<ObjectType>;
