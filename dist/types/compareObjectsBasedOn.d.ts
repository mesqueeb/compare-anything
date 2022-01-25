export declare type ComparisonObjects<ObjectType> = {
    differentProps: (keyof ObjectType)[];
    differentPropsPicked: Partial<ObjectType>[];
    equal: boolean;
};
export declare function compareObjectsBasedOn<ObjectType extends Record<string, any> | any = Record<string, any>>(propKeys: (keyof ObjectType)[], objects: [ObjectType, ...any[]]): ComparisonObjects<ObjectType>;
