import { AnyNotation } from './any-notation';
import { isObject } from './is-object';
import { MapNotation } from './map-notation';

export function isMapNotation(value: AnyNotation): value is MapNotation {
    return isObject(value[ 0 ]);
}
