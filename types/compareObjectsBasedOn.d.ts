import { PlainObject } from './types';
export declare type ComparisonObjects<ObjectType> = {
    differentProps: (keyof ObjectType)[];
    differentPropsPicked: Partial<ObjectType>[];
    equal: boolean;
};
export declare function compareObjectsBasedOn<ObjectType extends PlainObject | any = PlainObject>(propKeys: (keyof ObjectType)[], objects: [ObjectType, ...any[]]): ComparisonObjects<ObjectType>;
