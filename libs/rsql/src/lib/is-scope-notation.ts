import { AnyNotation } from './any-notation';
import { isFunction } from './is-function';
import { Scope } from './scope';
import { ScopeNotation } from './scope-notation';

export function isScopeNotation<T extends Scope<unknown>>(value: AnyNotation): value is ScopeNotation<T> {
    return isFunction(value[ 0 ]);
}
