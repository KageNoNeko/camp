import { AnyNotation } from './any-notation';
import { isFunction } from './is-function';
import { ScopeNotation } from './scope-notation';

export function isScopeNotation(value: AnyNotation): value is ScopeNotation {
    return isFunction(value[ 0 ]);
}
