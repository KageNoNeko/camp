import { AnyNotation } from './any-notation';
import { isString } from './is-string';
import { LongNotation } from './long-notation';

export function isLongNotation(value: AnyNotation): value is LongNotation {
    return isString(value[ 0 ]) && value.length === 3;
}
