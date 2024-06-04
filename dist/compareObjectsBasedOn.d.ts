export type ComparisonObjects<ObjectType> = {
    differentProps: (keyof ObjectType)[];
    differentPropsPicked: Partial<ObjectType>[];
    equal: boolean;
};
export declare function compareObjectsBasedOn<ObjectType extends {
    [key in string]: any;
} | any = {
    [key in string]: any;
}>(propKeys: (keyof ObjectType)[], objects: [ObjectType, ...any[]]): ComparisonObjects<ObjectType>;
