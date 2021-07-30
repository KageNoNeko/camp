import { AnyNotation } from './any-notation';
import { isString } from './is-string';
import { ShortNotation } from './short-notation';

export function isLongNotation(value: AnyNotation): value is ShortNotation {
    return isString(value[ 0 ]) && value.length === 3;
}
